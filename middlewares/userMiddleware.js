import {getByEmail} from "../services/users.service.js";

export function isEmailValid(req, res, next) {
    const { email } = req.body
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if (email && regex.test(email)) {
        next()
    } else {
        res.status(400).json({ message: 'Invalid email' })
    }
}

export function isPasswordDigitValid(req, res, next) {
    const { password } = req.body
    const regex = /(?=.*\d)/

    if (password && regex.test(password)) {
        next()
    } else {
        res.status(400).json({ message: "Password must contain a digit" })
    }
}


export function isPasswordCasse(req, res, next) {
    const { password } = req.body
    const regex = /(?=.*[a-z])(?=.*[A-Z])/

    if (password && regex.test(password)) {
        next()
    } else {
        res.status(400).json({
            message: "Password must contain at least one uppercase and one lowercase letter"
        })
    }
}


export function isPasswordLong(req, res, next) {
    const { password } = req.body

    if (password && password.length >= 8) {
        next()
    } else {
        res.status(400).json({
            message: "Password must be at least 8 characters long"
        })
    }
}

export async function isUniqueEmail(req, res, next) {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }

    try {
        const user = await getByEmail(email)
        if (!user) {
            next()
        } else {
            res.status(400).json({ message: "Email already used" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error verifying email uniqueness", error: error.message })
    }
}
