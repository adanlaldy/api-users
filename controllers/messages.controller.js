import {create, getAllSenderByUserId, getAllReceiverByUserId} from "../services/messages.service.js";

export const createMessage = (req, res) => {
    const {message, userSenderId, userReceiverId} = req.body

    if (!message || !userSenderId || !userReceiverId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    create({message, userSenderId, userReceiverId})

    res.status(201).json({
        success: true,
        message: 'Message has been created'
    })
}

export const getAllReceiverMessagesByUserId = (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    res.status(200).json({
        success: true,
        messages: getAllReceiverByUserId(id)
    })
}

export const getAllSenderMessagesByUserId = (req, res) => {
    const {id} = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request'
        })
    }

    res.status(200).json({
        success: true,
        messages: getAllSenderByUserId(id)
    })
}
