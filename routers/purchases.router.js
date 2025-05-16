import express from 'express'
import {createPurchase, getAllPurchases, getAllPurchasesByUserId} from "../controllers/purchases.controller.js";
import {checkAdmin, checkToken} from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/', createPurchase)
router.get('/', checkToken, checkAdmin, getAllPurchases)
router.get('/user/:id', getAllPurchasesByUserId)

export default router
