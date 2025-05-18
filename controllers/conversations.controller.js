import {create} from "../services/conversations.service.js";

/**
 * Creates a new conversation between two users.
 * Requires 'user1Id' and 'user2Id' in the request body.
 * Returns 201 status with the created conversation object on success,
 * 400 if request data is missing or invalid,
 * or 500 if an internal server error occurs.
 */
export const createConversation = async (req, res) => {
    const {user1Id, user2Id} = req.body

    if (!user1Id || !user2Id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const conversation = await create({user1Id, user2Id})

        res.status(201).json(conversation)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}
