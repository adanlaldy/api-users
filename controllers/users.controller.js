import {create, getAll, getById, update, remove} from "../services/users.service.js";

export const createUser = (req, res) => {
    const {firstName, lastName, birthDate, email, password, role} = req.body

    if (!firstName || !lastName || !birthDate || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    create({firstName, lastName, birthDate, email, password, role})

    res.status(201).json({
        success: true,
        message: 'User has been created'
    })
}

export const getAllUsers = (req, res) => {
    res.status(200).json({
        success: true,
        users: getAll()
    })
}

export const getUserById = (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    res.status(200).json({
        success: true,
        user: getById(id)
    })
}

export const updateUserById = (req, res) => {
    const {id} = req.params
    const {firstName, lastName, birthDate, email, password, picture, balance} = req.body

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    res.status(200).json({
        success: true,
        user: update(id, {firstName, lastName, birthDate, email, password, picture, balance})
    })
}

export const deleteUserById = (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    res.status(200).json({
        success: true,
        user: remove(id)
    })
}