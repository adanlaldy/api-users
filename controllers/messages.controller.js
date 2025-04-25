import {create, getAll} from "../services/messages.service.js";

export const createMessage = (req, res) => {
    const {message, userSenderId, userReceiverId, auctionId} = req.body

    if (!message || !userSenderId || !userReceiverId || !auctionId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    create({message, userSenderId, userReceiverId, auctionId})

    res.status(201).json({
        success: true,
        message: 'Message has been created'
    })
}

export const getAllMessages = (req, res) => {
    res.status(200).json({
        success: true,
        messages: getAll()
    })
}
