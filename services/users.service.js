import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import createError from "http-errors"
import bcrypt from 'bcrypt';

dotenv.config()

const prisma = new PrismaClient()

/**
 * Creates a new user in the database with hashed password.
 * @param {Object} user - User data containing firstName, lastName, birthDate, email, password, role.
 * @returns {Promise<Object>} Created user record.
 * @throws Throws 500 error if creation fails.
 */
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

/**
 * Retrieves all users, excluding passwords.
 * @returns {Promise<Array>} List of users without password fields.
 * @throws Throws 500 error if fetching fails.
 */
export const getAll = async () => {
    try {
        const users = await prisma.users.findMany();
        return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    } catch (error) {
        throw createError(500, 'Error fetching users', error.message);
    }
}

/**
 * Retrieves a user by ID, excluding the password.
 * @param {number|string} id - User ID.
 * @returns {Promise<Object>} User data without password.
 * @throws Throws 404 if user not found, 500 on other errors.
 */
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

/**
 * Retrieves a user by email.
 * @param {string} email - User email.
 * @returns {Promise<Object|null>} User data or null if not found.
 * @throws Throws 500 on error.
 */
export const getByEmail = async (email) => {
    try {
        return await prisma.users.findFirst({
            where: {
                email: email
            }
        });
    } catch (error) {
        throw createError(500, 'Error fetching user', error.message);
    }
}

/**
 * Updates a user by ID. If password is present, it is hashed before update.
 * @param {number|string} id - User ID.
 * @param {Object} user - User data to update.
 * @returns {Promise<Object>} Updated user record.
 * @throws Throws 404 if user not found, 500 on other errors.
 */
export const update = async (id, user) => {
    try {
        if (user.password) {
            const saltRounds = 10
            user.password = await bcrypt.hash(user.password, saltRounds)
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
                updated_at: new Date(),
                role: user.role,
                deleted_at: user.deletedAt
            },
        });

    } catch (error) {
        if (error.code === 'P2025') {
            throw createError(404, 'User not found for update');
        }
        throw createError(500, 'Error updating user', error.message);
    }
}

/**
 * Soft deletes a user by setting deleted_at field.
 * @param {number|string} id - User ID.
 * @returns {Promise<Object>} Updated user record with deletion timestamp.
 * @throws Throws 404 if user not found, 500 on other errors.
 */
export const remove = async (id) => {
    try {
        return await prisma.users.update({
            where: {
                id: Number(id),
            },
            data: {
                deleted_at: new Date(),
            },
        });

    } catch (error) {
        if (error.code === 'P2025') {
            throw createError(404, 'User not found for deletion');
        }
        throw createError(500, 'Error deleting user', error.message);
    }
}
