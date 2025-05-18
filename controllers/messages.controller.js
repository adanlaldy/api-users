import {create, getAllByConversation} from "../services/messages.service.js";

/**
 * Creates a new message in a conversation.
 * Requires 'content' and 'conversationId' in the request body.
 * Returns 201 with the created message or an error status.
 */
export const createMessage = async (req, res) => {
    const {content, conversationId} = req.body

    if (!content || !conversationId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const message = await create({content, conversationId})

        res.status(201).json(message)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

/**
 * Retrieves all messages for a given conversation ID.
 * Requires conversation ID as a URL parameter.
 * Returns 200 with an array of messages, 400 if ID missing,
 * 404 if no messages found, or 500 on server error.
 */
export const getMessagesByConversation = async (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const messages = await getAllByConversation(id)

        res.status(200).json(messages)
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({success: false, message: error.message});
        }

        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}
