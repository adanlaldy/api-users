import {create, remove} from "../services/likes.service.js";

export const createLike = async (req, res) => {
    const {userId, auctionId} = req.body

    if (!userId || !auctionId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const like = await create({userId, auctionId})

        res.status(201).json(like)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

export const deleteLikeById = async (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        await remove(id)

        res.status(200).json({
            success: true,
            message: 'Like has been deleted'
        })
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}