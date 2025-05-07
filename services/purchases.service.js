import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"

dotenv.config()

const prisma = new PrismaClient()

export const create = async (purchase) => {

    try {
        return await prisma.purchases.create({
            data: {
                final_price: purchase.final_price,
                auction_id: 1,
                user_id: purchase.user_id
            },
        })

    } catch (error) {
        throw createError(404, 'Error creating purchase:', error.message)
    }
}

export const getAll = async () => {

    try {
        return await prisma.purchases.findMany();

    } catch (error) {
        console.error("Error fetching purchases:", error.message);
        throw error;
    }
}

export const getByUserId = async (id) => {

    try {
        return await prisma.purchases.findMany({
            where: {
                user_id: Number(id)
            }
        })

    } catch (error) {
        throw createError(404, 'Error fetching purchases:', error.message)
    }
}