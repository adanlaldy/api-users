const messages = []

export const create = (message) => {

    messages.push(message)
    message.created_at = new Date().toISOString().split('T')[0];
}

export const getAll = () => {
    return messages
}
