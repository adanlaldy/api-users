import createError from "http-errors";

const notifications = [
    {
        message: "hello world",
        is_read: false,
        // le reste
        user_id: 2
    }
]

export const create = (notification) => {

    notification.created_at = new Date().toISOString().split('T')[0]
    notification.is_read = false
    notifications.push(notification)
}

export const getByUserId = (id) => {
    const userNotification = notifications.filter(notification => notification.user_id === Number(id))

    if (userNotification.length === 0) {
        throw createError(404, 'The user doesn\'t has notifications')
    }

    return userNotification
}

export const remove = (id) => {
    const index = notifications.findIndex(notification => notification.id === Number(id));

    if (index === -1) {
        throw createError(404, 'The notification doesn\'t exist');
    }

    return notifications.splice(index, 1)[0];
}
