import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"
import bcrypt from 'bcrypt';

dotenv.config()

const prisma = new PrismaClient()

export const create = async (user) => {

    try {
        user.password = await bcrypt.hash(user.password, 10);

        return await prisma.users.create({
            data: {
                first_name: user.firstName,
                last_name: user.lastName,
                birth_date: new Date(user.birthDate),
                email: user.email,
                password: user.password,
                role: user.role,
                balance: 0,
                updated_at: new Date()
            }
        })

    } catch (error) {
        throw createError(500, 'Error creating user', error.message);
    }
}

export const getAll = async () => {

    try {
        const users = await prisma.users.findMany();
        return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

    } catch (error) {
        throw createError(500, 'Error fetching users', error.message);
    }
}

export const getById = async (id) => {

    try {
        const user = await prisma.users.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;

    } catch (error) {
        if (error.status === 404) {
            throw error;
        }

        throw createError(500, 'Error fetching user', error.message);
    }
}

export const getByEmail = async (email) => {
    try {
        const user = await prisma.users.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        return user;

    } catch (error) {
        if (error.status === 404) {
            throw error;
        }

        throw createError(500, 'Error fetching user', error.message);    }
}


export const update = async (id, user) => {

    try {
        if (user.password) {
            user.password = await bcrypt.hash(user.password);
        }

        return await prisma.users.update({
            where: {
                id: Number(id),
            },
            data: {
                first_name: user.firstName,
                last_name: user.lastName,
                birth_date: user.birthDate,
                email: user.email,
                password: user.password,
                picture: user.picture,
                balance: user.balance,
                updated_at: new Date()
            },
        });

    } catch (error) {
        if (error.code === 'P2025') {
            throw createError(404, 'User not found for update');
        }

        throw createError(500, 'Error updating user', error.message);    }
}

export const remove = async (id) => {

    try {
        await prisma.users.delete({
            where: {
                id: Number(id)
            }
        })

    } catch (error) {
        if (error.code === 'P2025') {
            throw createError(404, 'User not found for deletion');
        }

        throw createError(500, 'Error deleting user', error.message);    }
}