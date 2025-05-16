import express from 'express'
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser
} from "../controllers/users.controller.js";
import {
    isEmailValid,
    isPasswordCasse,
    isPasswordDigitValid,
    isPasswordLong,
    isUniqueEmail
} from "../middlewares/userMiddleware.js";

const router = express.Router()

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.put('/update/:id', updateUserById)
router.delete('/:id', deleteUserById)

router.post('/register', isEmailValid, isUniqueEmail, isPasswordLong, isPasswordCasse, isPasswordDigitValid, createUser);
router.post('/login', loginUser);

export default router
