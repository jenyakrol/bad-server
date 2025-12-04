import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import rateLimit from 'express-rate-limit'
import { ensureDir } from './utils/ensureDir'
import { DB_ADDRESS, ORIGIN_ALLOW, PORT, UPLOAD_PATH, UPLOAD_PATH_TEMP } from './config'
import errorHandler from './middlewares/error-handler'
import routes from './routes'

const app = express()

app.use(cookieParser())

app.set('trust proxy', 1)

app.use(cors({ origin: ORIGIN_ALLOW || 'http://localhost:5173', credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(urlencoded({ extended: true }))
app.use(json())

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 40,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(limiter)

app.use(routes)
app.use(errors())
app.use(errorHandler)

// eslint-disable-next-line no-console

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)

        ensureDir(UPLOAD_PATH_TEMP)
        ensureDir(UPLOAD_PATH)

        await app.listen(PORT, () => console.log('oк'))
    } catch (error) {
        console.error(error)
    }
}

bootstrap()
