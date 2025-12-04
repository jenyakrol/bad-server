import { Request, Express, Response, NextFunction } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import crypto from 'crypto'
import { UPLOAD_PATH_TEMP } from '../config'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        cb(
            null,
            UPLOAD_PATH_TEMP
        )
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        const fileHash = crypto.randomBytes(16).toString('hex')
        const fileExt = path.extname(file.originalname).toLowerCase();
        const newFileName = `${fileHash}${fileExt}`

        cb(null, newFileName)
    },
})

const types = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
    'image/webp'
]

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (!types.includes(file.mimetype)) {
        return cb(null, false)
    }

    return cb(null, true)
}

const limits: multer.Options["limits"] = {
    fileSize: 5 * 1024 * 1024,
    files: 5,
    fields: 0,
}

export const checkMinSize = (req: Request, _: Response, next: NextFunction) => {
  try {
    if (!req.file) {
    return next()
  }
  const minSize = 2 * 1024
  if (req.file.size < minSize) {
    throw new Error("Файл меньше 2 килобайт")
  }
  
  next()
  } catch(err) {
    next(err)
  }
  
}

export default multer({ storage, fileFilter, limits })
