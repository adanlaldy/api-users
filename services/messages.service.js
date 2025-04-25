const messages = []

export const create = (message) => {
    messages.push(message)
}

export const getAll = () => {
    return messages
}
