import express from 'express'
import usersRouter from './routers/users.router.js'
import messagesRouter from './routers/messages.router.js'
import purchasesRouter from './routers/purchases.router.js'
import notificationsRouter from './routers/notifications.router.js'
import likesRouter from './routers/likes.router.js'
import conversationsRouter from './routers/conversations.router.js'
import swaggerUi from "swagger-ui-express";
import * as path from "node:path";
import YAML from 'yamljs'
import { fileURLToPath } from 'node:url'
import * as OpenApiValidator from 'express-openapi-validator'
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const openapiPath = path.join(__dirname, 'openapi.yaml')
const swaggerDocument = YAML.load(openapiPath)

const app = express()
app.use(express.json())

app.use(cookieParser())

app.use(OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    ignoredUndocumented: true
}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/v1/users', usersRouter)
app.use('/v1/messages', messagesRouter)
app.use('/v1/purchases', purchasesRouter)
app.use('/v1/notifications', notificationsRouter)
app.use('/v1/likes', likesRouter)
app.use('/v1/conversations', conversationsRouter)

export default app
