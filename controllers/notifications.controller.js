import {create, getByUserId, remove} from "../services/notifications.service.js";

/**
 * Creates a new notification.
 * Requires at least userId in the request body; content, auctionId, and messageId are optional.
 * Returns 201 with the created notification or error status.
 */
export const createNotification = async (req, res) => {
    const {content, auctionId, userId, messageId} = req.body

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const notification = await create({content, auctionId, userId, messageId})

        res.status(201).json(notification)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

/**
 * Retrieves all notifications for a specific user.
 * Requires user ID as a URL parameter.
 * Returns 200 with array of notifications, 400 if ID missing, 404 if no notifications found, or 500 on error.
 */
export const getAllNotificationsByUserId = async (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const messages = await getByUserId(id)

        res.status(200).json(messages)
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

/**
 * Deletes a notification by its ID.
 * Requires notification ID as a URL parameter.
 * Returns 200 on success, 400 if ID missing, 404 if notification not found, or 500 on error.
 */
export const deleteNotificationById = async (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        await remove(id)

        res.status(200).json({
            success: true,
            message: 'Notification has been deleted'
        })
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}
