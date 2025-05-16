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
} from "../controllers/users.controller.js";
import {
    isEmailValid,
    isPasswordCasse,
    isPasswordDigitValid,
    isPasswordLong,
    isUniqueEmail
} from "../middlewares/userMiddleware.js";
import {checkAdmin, checkToken} from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/', checkToken, checkAdmin, createUser)
router.get('/', checkToken, checkAdmin, getAllUsers)
router.get('/me', checkToken, getMe);
router.get('/:id', checkToken, checkAdmin, getUserById)
router.put('/update/:id', updateUserById)
router.delete('/logout', checkToken, logoutUser);
router.delete('/:id', deleteUserById)

router.post('/register', isEmailValid, isUniqueEmail, isPasswordLong, isPasswordCasse, isPasswordDigitValid, createUser);
router.post('/login', loginUser);

export default router
