import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

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