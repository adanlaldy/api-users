import {create, remove} from "../services/likes.service.js";

export const createLike = (req, res) => {
    const {userId, auctionId} = req.body

    if (!userId || !auctionId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    create({userId, auctionId})

    res.status(201).json({
        success: true,
        message: 'Like has been created'
    })
}

export const deleteLikeById = (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    res.status(200).json({
        success: true,
        like: remove(id)
    })
}