import createError from "http-errors";

const messages = []

export const create = (message) => {

    messages.push(message)
    message.created_at = new Date().toISOString().split('T')[0];
}

export const getAllSenderByUserId = (id) => {
    const senderMessages = messages.filter(message => message.user_sender_id === Number(id))

    if (senderMessages.length === 0) {
        throw createError(404, 'The user doesn\'t has sent messages')
    }

    return senderMessages
}

export const getAllReceiverByUserId = (id) => {
    const receiverMessages = messages.filter(message => message.user_receiver_id === Number(id))

    if (receiverMessages.length === 0) {
        throw createError(404, 'The user doesn\'t has sent messages')
    }

    return receiverMessages
}