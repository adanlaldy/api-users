import {create, getAll, getById, update, remove} from "../services/users.service.js";
import jwt from "jsonwebtoken";

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

        const token = jwt.sign({id: user.id, isAdmin: user.role}, SECRET_KEY, {expiresIn: "4h"});

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

export const getUserById = async (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
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
    const {id} = req.params
    const {firstName, lastName, birthDate, email, password, picture, balance} = req.body

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
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
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
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
