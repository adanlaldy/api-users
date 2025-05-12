import {create, getByUserId, remove} from "../services/notifications.service.js";

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