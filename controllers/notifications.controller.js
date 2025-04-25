import {create, getByUserId, remove} from "../services/notifications.service.js";

export const createNotification = (req, res) => {
    const {message, auctionId, userId, messageId} = req.body

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    create({message, auctionId, userId, messageId})

    res.status(201).json({
        success: true,
        message: 'Notification has been created'
    })
}

export const getAllNotificationsByUserId = (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    res.status(200).json({
        success: true,
        notifications: getByUserId(id)
    })
}

export const deleteNotificationById = (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    res.status(200).json({
        success: true,
        notification: remove(id)
    })
}