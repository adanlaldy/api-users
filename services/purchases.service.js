import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

export const create = async (purchase) => {

    try {
        return await prisma.purchases.create({
            data: {
                final_price: purchase.finalPrice,
                auction_id: 1,
                user_id: purchase.userId
            },
        })

    } catch (error) {
        throw createError(500, 'Error creating purchase', error.message);
    }
}

export const getAll = async () => {

    try {
        return await prisma.purchases.findMany();

    } catch (error) {
        throw createError(500, 'Error fetching purchases:', error.message)
    }
}

export const getByUserId = async (id) => {

    try {
        const purchases = await prisma.purchases.findMany({
            where: {
                user_id: Number(id)
            }
        })

        if (!purchases) {
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