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
                user_id: notification.user_id,
                auction_id: 1,
                message_id: notification.message_id
            },
        })

    } catch (error) {
        throw createError(404, 'Error creating notification:', error.message)
    }
}

export const getByUserId = async (id) => {

    try {
        return await prisma.notifications.findMany({
            where: {
                user_id: Number(id)
            }
        })

    } catch (error) {
        throw createError(404, 'Error fetching notifications:', error.message)
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
        throw createError(404, 'Error deleting notification', error.message)
    }
}
