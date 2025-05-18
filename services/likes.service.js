import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

/**
 * Creates a new like associated with a user and an auction.
 * @param {Object} like - Like data.
 * @param {number} like.userId - The ID of the user liking the auction.
 * @param {number} like.auctionId - The ID of the auction being liked.
 * @returns {Promise<Object>} The created like record.
 * @throws Throws 500 error if creation fails.
 */
export const create = async (like) => {
    try {
        return await prisma.likes.create({
            data: {
                user_id: like.userId,
                auction_id: like.auctionId,
            },
        })
    } catch (error) {
        throw createError(500, 'Error creating like:', error.message)
    }
}

/**
 * Deletes a like by its ID.
 * @param {number|string} id - The ID of the like to delete.
 * @returns {Promise<void>} Resolves if deletion is successful.
 * @throws Throws 404 if the like is not found.
 * @throws Throws 500 for other errors during deletion.
 */
export const remove = async (id) => {
    try {
        await prisma.likes.delete({
            where: {
                id: Number(id)
            }
        })
    } catch (error) {
        if (error.code === 'P2025') {
            throw createError(404, 'Like not found for deletion');
        }
        throw createError(500, 'Error deleting like', error.message)
    }
}
