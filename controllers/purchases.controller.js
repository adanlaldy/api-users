import {create, getAll, getByUserId} from "../services/purchases.service.js";

export const createPurchase = (req, res) => {
    const {finalPrice, auctionId, userId} = req.body

    if (!finalPrice || !auctionId || !userId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    create({finalPrice, auctionId, userId})

    res.status(201).json({
        success: true,
        message: 'Purchase has been created'
    })
}

export const getAllPurchases = (req, res) => {
    res.status(200).json({
        success: true,
        messages: getAll()
    })
}

export const getAllPurchasesByUserId = (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    res.status(200).json({
        success: true,
        purchase: getByUserId(id)
    })
}
