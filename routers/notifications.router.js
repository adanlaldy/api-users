import express from 'express'
import {createNotification, getAllNotificationsByUserId, deleteNotificationById} from "../controllers/notifications.controller.js";

const router = express.Router()

router.post('/', createNotification)
router.get('/user/:id', getAllNotificationsByUserId)
router.delete('/:id', deleteNotificationById)

export default router
