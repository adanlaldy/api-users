import createError from "http-errors";

const likes = [
    {
        id:1, auction_id:2, user_id:1
    }
]

export const create = (like) => {

    likes.push(like)
}

export const remove = (id) => {
    const index = likes.findIndex(like => like.id === Number(id));

    if (index === -1) {
        throw createError(404, 'The like doesn\'t exist');
    }

    return likes.splice(index, 1)[0];
}
