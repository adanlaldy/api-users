import {create, getAll, getById, update, remove, getByEmail} from "../services/users.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET;

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

export const getAllUsers = async (req, res) => {

    try {
        const users = await getAll()

        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

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

export const updateUserById = async (req, res) => {
    try {
        const {id} = req.params
        const {firstName, lastName, birthDate, email, password, picture, balance} = req.body

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request'
            })
        }

        const user = await update(id, {firstName, lastName, birthDate, email, password, picture, balance})

        res.status(200).json(user)
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

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

        const token = jwt.sign({id: user.id, role: user.role}, SECRET_KEY, {expiresIn: "4h"});

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 4 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
};

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
