import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

/**
 * Creates a new conversation between two users.
 * @param {Object} conversation - Conversation data.
 * @param {number} conversation.user1Id - ID of the first user in the conversation.
 * @param {number} conversation.user2Id - ID of the second user in the conversation.
 * @returns {Promise<Object>} The created conversation record.
 * @throws Throws a 500 error if creation fails.
 */
export const create = async (conversation) => {
    try {
        return await prisma.conversations.create({
            data: {
                user1_id: conversation.user1Id,
                user2_id: conversation.user2Id
            },
        })
    } catch (error) {
        throw createError(500, 'Error creating conversation:', error.message)
    }
}

export const getAllByUser = async (id) => {
    try {
        const conversations = await prisma.conversations.findMany({
            where: {
                OR: [
                    { user1_id: Number(id) },
                    { user2_id: Number(id) }
                ]
            }
        })

        if (conversations.length === 0) {
            throw createError(404, 'Conversations not found');
        }

        return conversations
    } catch (error) {
        if (error.status === 404) {
            throw error;
        }
        throw createError(500, 'Error fetching conversations:', error.message)
    }
}


