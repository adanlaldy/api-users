import {create, remove} from "../services/likes.service.js";

/**
 * Creates a like for a specific auction by a user.
 * Requires 'userId' and 'auctionId' in the request body.
 * Returns 201 with the created like object or error status.
 */
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

/**
 * Deletes a like by its ID.
 * Requires 'id' parameter in the URL.
 * Returns 200 on successful deletion,
 * 400 if ID missing, 404 if like not found,
 * or 500 on server error.
 */
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
