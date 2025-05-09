import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

export const create = async (notification) => {

    try {
        return await prisma.notifications.create({
            data: {
                content: notification.content,
                user_id: notification.userId,
                auction_id: 1,
                message_id: notification.messageId
            },
        })

    } catch (error) {
        throw createError(500, 'Error creating notification:', error.message)
    }
}

export const getByUserId = async (id) => {

    try {
        const notifications = await prisma.notifications.findMany({
            where: {
                user_id: Number(id)
            }
        })

        if (!notifications) {
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
