import {create, getAll, getById, update, remove, getByEmail} from "../services/users.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET;

/**
 * Creates a new user with the provided data.
 * Validates required fields before calling service.
 * Generates a JWT token valid for 4 hours on success.
 * Returns 201 with user and token, or error status/message.
 */
export const createUser = async (req, res) => {
    const {firstName, lastName, birthDate, email, password, role} = req.body

    if (!firstName || !lastName || !birthDate || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const user = await create({firstName, lastName, birthDate, email, password, role})

        const token = jwt.sign({id: user.id, role: role}, SECRET_KEY, {expiresIn: "4h"});

        res.status(201).json({user, token})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

/**
 * Retrieves all users.
 * Returns 200 with users array or 500 on error.
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await getAll()

        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

/**
 * Retrieves the currently authenticated user data.
 * Requires user ID from req.user.
 * Returns 200 with user data, 400 if no ID, or error status.
 */
export const getMe = async (req, res) => {
    try {
        const {id} = req.user

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request'
            })
        }

        const user = await getById(id)

        res.status(200).json(user)
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

/**
 * Retrieves user by given ID parameter.
 * Returns 200 with user or error status/message.
 */
export const getUserById = async (req, res) => {
    try {
        const {id} = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request'
            })
        }

        const user = await getById(id)

        res.status(200).json(user)
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

/**
 * Updates user details for the given ID.
 * Accepts partial or full user data in request body.
 * Returns updated user or appropriate error.
 */
export const updateUserById = async (req, res) => {
    try {
        const {id} = req.params
        const {firstName, lastName, birthDate, email, password, picture, balance, role} = req.body

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request'
            })
        }

        const user = await update(id, {firstName, lastName, birthDate, email, password, picture, balance, role})

        res.status(200).json(user)
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

/**
 * Deletes a user by the specified ID.
 * Returns success message or error.
 */
export const deleteUserById = async (req, res) => {
    try {
        const {id} = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request'
            })
        }

        await remove(id)

        res.status(200).json({
            success: true,
            message: 'User has been deleted'
        })
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

/**
 * Authenticates a user with email and password.
 * On success, issues JWT token valid for 4 hours and sets it in an HTTP-only cookie.
 * Returns 200 with token or error on failure.
 */
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await getByEmail(email);

        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: "4h"});

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 4 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name
            }
        });
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
};

/**
 * Logs out the current user by clearing the token cookie.
 * Returns a success message or error.
 */
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}
