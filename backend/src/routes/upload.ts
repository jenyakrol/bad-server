import { Router } from 'express'
import auth, { roleGuardMiddleware } from '../middlewares/auth'
import { Role } from '../models/user'
import { uploadFile } from '../controllers/upload'
import fileMiddleware from '../middlewares/file'

const uploadRouter = Router()
uploadRouter.post('/', auth, roleGuardMiddleware(Role.Admin), fileMiddleware.single('file'), uploadFile)

export default uploadRouter
