import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

/**
 * Creates a new message in a conversation.
 * @param {Object} message - Message data.
 * @param {string} message.content - The content of the message.
 * @param {number} message.conversationId - The ID of the conversation the message belongs to.
 * @returns {Promise<Object>} The created message record.
 * @throws Throws 500 error if creation fails.
 */
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

/**
 * Retrieves all messages by conversation ID.
 * @param {number|string} id - The ID of the conversation.
 * @returns {Promise<Array>} List of messages for the conversation.
 * @throws Throws 404 if no messages found, 500 on other errors.
 */
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
