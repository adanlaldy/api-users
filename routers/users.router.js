// Import required modules and middleware
import express from 'express'
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser,
    logoutUser,
    getMe
} from "../controllers/users.controller.js"
import {
    isEmailValid,
    isPasswordCasse,
    isPasswordDigitValid,
    isPasswordLong,
    isUniqueEmail
} from "../middlewares/userMiddleware.js"
import { checkAdmin, checkToken } from "../middlewares/authMiddleware.js"

const router = express.Router()

/**
 * @route POST /
 * @desc Create a new user (admin only)
 * @access Protected (Admin)
 */
router.post('/', checkToken, checkAdmin, createUser)

/**
 * @route GET /
 * @desc Get all users (admin only)
 * @access Protected (Admin)
 */
router.get('/', checkToken, checkAdmin, getAllUsers)

/**
 * @route GET /me
 * @desc Get current authenticated user's data
 * @access Protected (User)
 */
router.get('/me', checkToken, getMe)

/**
 * @route GET /:id
 * @desc Get a specific user by ID (admin only)
 * @access Protected (Admin)
 */
router.get('/:id', checkToken, checkAdmin, getUserById)

/**
 * @route PUT /update/:id
 * @desc Update a user's information by ID
 * @access Public or protected based on controller logic
 */
router.put('/update/:id', updateUserById)

/**
 * @route DELETE /logout
 * @desc Logout the currently authenticated user
 * @access Protected (User)
 */
router.delete('/logout', checkToken, logoutUser)

/**
 * @route DELETE /:id
 * @desc Delete a user by ID
 * @access Public or protected based on controller logic
 */
router.delete('/:id', deleteUserById)

/**
 * @route POST /register
 * @desc Register a new user with validation middleware
 * @access Public
 * @middleware Validates email, uniqueness, password strength
 */
router.post(
    '/register',
    isEmailValid,
    isUniqueEmail,
    isPasswordLong,
    isPasswordCasse,
    isPasswordDigitValid,
    createUser
)

/**
 * @route POST /login
 * @desc Authenticate a user and return a token
 * @access Public
 */
router.post('/login', loginUser)

export default router
