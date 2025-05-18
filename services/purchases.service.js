import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

/**
 * Creates a new purchase record.
 * @param {Object} purchase - Purchase data.
 * @param {number} purchase.finalPrice - Final price of the purchase.
 * @param {number} purchase.auctionId - ID of the related auction.
 * @param {number} purchase.userId - ID of the user making the purchase.
 * @returns {Promise<Object>} The created purchase.
 * @throws Throws 500 error if creation fails.
 */
export const create = async (purchase) => {
    try {
        return await prisma.purchases.create({
            data: {
                final_price: purchase.finalPrice,
                auction_id: purchase.auctionId,
                user_id: purchase.userId
            },
        })
    } catch (error) {
        throw createError(500, 'Error creating purchase', error.message);
    }
}

/**
 * Retrieves all purchases.
 * @returns {Promise<Array>} List of all purchase records.
 * @throws Throws 500 error if fetching fails.
 */
export const getAll = async () => {
    try {
        return await prisma.purchases.findMany();
    } catch (error) {
        throw createError(500, 'Error fetching purchases:', error.message)
    }
}

/**
 * Retrieves all purchases made by a specific user.
 * @param {number|string} id - User ID.
 * @returns {Promise<Array>} List of purchases for the user.
 * @throws Throws 404 if no purchases found, 500 on other errors.
 */
export const getByUserId = async (id) => {
    try {
        const purchases = await prisma.purchases.findMany({
            where: {
                user_id: Number(id)
            }
        })

        if (purchases.length === 0) {
            throw createError(404, 'Purchases not found');
        }

        return purchases

    } catch (error) {
        if (error.status === 404) {
            throw error;
        }
        throw createError(500, 'Error fetching purchases by user:', error.message)
    }
}
