import express from 'express'
import {
    createNotification,
    getAllNotificationsByUserId,
    deleteNotificationById
} from "../controllers/notifications.controller.js"

const router = express.Router()

/**
 * @route POST /
 * @desc Create a new notification
 * @access Public or protected depending on business logic
 */
router.post('/', createNotification)

/**
 * @route GET /user/:id
 * @desc Retrieve all notifications for a specific user
 * @access Public or protected depending on controller logic
 */
router.get('/user/:id', getAllNotificationsByUserId)

/**
 * @route DELETE /:id
 * @desc Delete a notification by its ID
 * @access Public or protected depending on controller logic
 */
router.delete('/:id', deleteNotificationById)

export default router
