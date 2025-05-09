import {create, getAll, getByUserId} from "../services/purchases.service.js";

export const createPurchase = async (req, res) => {
    const {finalPrice, auctionId, userId} = req.body

    if (!finalPrice || !auctionId || !userId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const purchase = await create({finalPrice, auctionId, userId})

        res.status(201).json(purchase)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

export const getAllPurchases = async (req, res) => {
    try {
        const purchases = await getAll()

        res.status(201).json(purchases)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

export const getAllPurchasesByUserId = async (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const purchases = await getByUserId(id)

        res.status(201).json(purchases)
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}
