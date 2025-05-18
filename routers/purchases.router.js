import express from 'express'
import {
    createPurchase,
    getAllPurchases,
    getAllPurchasesByUserId
} from "../controllers/purchases.controller.js"
import { checkAdmin, checkToken } from "../middlewares/authMiddleware.js"

const router = express.Router()

/**
 * @route POST /
 * @desc Create a new purchase
 * @access Public or protected depending on business logic
 */
router.post('/', createPurchase)

/**
 * @route GET /
 * @desc Retrieve all purchases (admin only)
 * @access Protected (Admin)
 */
router.get('/', checkToken, checkAdmin, getAllPurchases)

/**
 * @route GET /user/:id
 * @desc Retrieve all purchases made by a specific user
 * @access Public or protected depending on controller logic
 */
router.get('/user/:id', getAllPurchasesByUserId)

export default router
