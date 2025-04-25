import createError from "http-errors";

const purchases = [
    {
        id: 1, user_id: 3, auction_id: 1, final_price: 444
    },
    {
        id: 2, user_id: 3, auction_id: 2, final_price: 555
    },
    {
        id: 3, user_id: 4, auction_id: 3, final_price: 111
    }
]

export const create = (purchase) => {

    purchases.push(purchase)
    purchase.purchase_date = new Date().toISOString().split('T')[0];
}

export const getAll = () => {
    return purchases
}

export const getByUserId = (id) => {
    const userPurchases = purchases.filter(purchase => purchase.user_id === Number(id))

    if (userPurchases === undefined) {
        throw createError(404, 'The user doesn\'t has purchases')
    }

    return userPurchases
}