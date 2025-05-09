import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

export const create = async (like) => {

    try {
        return await prisma.likes.create({
            data: {
                user_id: like.userId,
                auction_id: 1,
            },
        })

    } catch (error) {
        throw createError(500, 'Error creating like:', error.message)
    }
}

export const remove = async (id) => {

    try {
        await prisma.likes.delete({
            where: {
                id: Number(id)
            }
        })

    } catch (error) {
        if (error.code === 'P2025') {
            throw createError(404, 'User not found for deletion');
        }

        throw createError(500, 'Error deleting like', error.message)
    }
}
