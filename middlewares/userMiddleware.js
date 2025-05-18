import { getByEmail } from "../services/users.service.js"

/**
 * Middleware to validate the format of an email address using regex.
 * Ensures the email field is present and well-formed.
 */
export function isEmailValid(req, res, next) {
    const { email } = req.body
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if (email && regex.test(email)) {
        next()
    } else {
        res.status(400).json({ message: 'Invalid email' })
    }
}

/**
 * Middleware to ensure the password contains at least one digit.
 */
export function isPasswordDigitValid(req, res, next) {
    const { password } = req.body
    const regex = /(?=.*\d)/

    if (password && regex.test(password)) {
        next()
    } else {
        res.status(400).json({ message: "Password must contain a digit" })
    }
}

/**
 * Middleware to ensure the password contains both lowercase and uppercase letters.
 */
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

/**
 * Middleware to ensure the password is at least 8 characters long.
 */
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

/**
 * Middleware to check whether the provided email is unique (not already registered).
 * Calls the user service to fetch existing users by email.
 */
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
