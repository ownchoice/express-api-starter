import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import middlewares from './middlewares'
import api from './routes'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  })
})

app.get('/api/', (_req: Request, res: Response) => {
  res.json({
    versions: ['v1'],
  })
})

app.use('/api/v1', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
