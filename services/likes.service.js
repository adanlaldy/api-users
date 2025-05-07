import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

export const create = async (like) => {

    try {
        return await prisma.likes.create({
            data: {
                user_id: like.content,
                auction_id: 1,
            },
        })

    } catch (error) {
        throw createError(404, 'Error creating like:', error.message)
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
        throw createError(404, 'Error deleting like', error.message)
    }
}
