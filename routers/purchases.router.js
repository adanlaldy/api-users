import express from 'express'
import {createPurchase, getAllPurchases, getAllPurchasesByUserId} from "../controllers/purchases.controller.js";

const router = express.Router()

router.post('/', createPurchase)
router.get('/', getAllPurchases)
router.get('/user/:id', getAllPurchasesByUserId)

export default router
