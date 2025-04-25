import express from 'express'
import usersRouter from './routers/users.router.js'
import messagesRouter from './routers/messages.router.js'

const app = express()
app.use(express.json())

app.use('/v1/users', usersRouter)
app.use('/v1/messages', messagesRouter)

export default app
