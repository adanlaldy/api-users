import {create, getAllByConversation} from "../services/messages.service.js";

export const createMessage = async (req, res) => {
    const {content, userSenderId, conversationId} = req.body

    if (!content || !userSenderId || !conversationId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    try {
        const message = await create({content, userSenderId, conversationId})

        res.status(201).json(message)
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

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
