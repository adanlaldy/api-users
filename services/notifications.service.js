import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

/**
 * Creates a new notification record.
 * @param {Object} notification - Notification data.
 * @param {string} notification.content - Content of the notification.
 * @param {number} notification.userId - ID of the user receiving the notification.
 * @param {number} [notification.auctionId] - Related auction ID (optional).
 * @param {number} [notification.messageId] - Related message ID (optional).
 * @returns {Promise<Object>} The created notification.
 * @throws Throws 500 error if creation fails.
 */
export const create = async (notification) => {
    try {
        return await prisma.notifications.create({
            data: {
                content: notification.content,
                user_id: notification.userId,
                auction_id: notification.auctionId,
                message_id: notification.messageId
            },
        })
    } catch (error) {
        throw createError(500, 'Error creating notification:', error.message)
    }
}

/**
 * Retrieves all notifications for a specific user.
 * @param {number|string} id - User ID.
 * @returns {Promise<Array>} List of notifications for the user.
 * @throws Throws 404 if no notifications found, 500 on other errors.
 */
export const getByUserId = async (id) => {
    try {
        const notifications = await prisma.notifications.findMany({
            where: {
                user_id: Number(id)
            }
        })

        if (notifications.length === 0) {
            throw createError(404, 'Notifications not found');
        }

        return notifications

    } catch (error) {
        if (error.status === 404) {
            throw error;
        }
        throw createError(500, 'Error fetching notifications by user:', error.message)
    }
}

/**
 * Deletes a notification by its ID.
 * @param {number|string} id - Notification ID.
 * @returns {Promise<void>} Resolves when deletion is successful.
 * @throws Throws 404 if notification not found, 500 on other errors.
 */
export const remove = async (id) => {
    try {
        await prisma.notifications.delete({
            where: {
                id: Number(id)
            }
        })
    } catch (error) {
        if (error.code === 'P2025') {
            throw createError(404, 'Notification not found for deletion');
        }
        throw createError(500, 'Error deleting notification', error.message)
    }
}

export const update = async (id, notification) => {
    try {

        return await prisma.notifications.update({
            where: {
                id: Number(id),
            },
            data: {
                is_read: notification.is_read,
            },
        });

    } catch (error) {
        if (error.code === 'P2025') {
            throw createError(404, 'Notification not found for update');
        }
        throw createError(500, 'Error updating notification', error.message);
    }
}