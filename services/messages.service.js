import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

export const create = async (message) => {

    try {
        return await prisma.messages.create({
            data: {
                message: message.content,
                conversation_id: message.conversationId
            },
        })

    } catch (error) {
        throw createError(500, 'Error creating message:', error.message)
    }
}

export const getAllByConversation = async (id) => {

    try {
        const messages = await prisma.messages.findMany({
            where: {
                conversation_id: Number(id)
            }
        })

        if (messages.length === 0) {
            throw createError(404, 'Messages not found');
        }

        return messages
    } catch (error) {
        if (error.status === 404) {
            throw error;
        }

        throw createError(500, 'Error fetching messages:', error.message)
    }
}
