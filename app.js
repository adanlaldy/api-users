import express from 'express'
import cookieParser from 'cookie-parser';
import usersRouter from './routers/users.router.js'
import messagesRouter from './routers/messages.router.js'
import purchasesRouter from './routers/purchases.router.js'
import notificationsRouter from './routers/notifications.router.js'
import likesRouter from './routers/likes.router.js'
import conversationsRouter from './routers/conversations.router.js'

const app = express()
app.use(cookieParser());
app.use(express.json())

app.use('/v1/users', usersRouter)
app.use('/v1/messages', messagesRouter)
app.use('/v1/purchases', purchasesRouter)
app.use('/v1/notifications', notificationsRouter)
app.use('/v1/likes', likesRouter)
app.use('/v1/conversations', conversationsRouter)

export default app
