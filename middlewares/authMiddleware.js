import jwt from 'jsonwebtoken'

export const checkAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({message: 'Access denied: No user information found'})
    }

    if (!req.user.isAdmin) {
        return res.status(401).json({message: 'Access denied: User is not an admin'})
    }

    next()
};

export function checkToken(req, res, next) {

    let token = req.headers?.authorization
    if (!token) {
        token = req.cookies?.token
    }

    if (!token) {
        return res.status(401).json({message: 'No connected...'})
    }

    token = token.replace('Bearer ', '')

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }

    next()
}

export function checkSelfId(req, res, next) {
    if (!req.user) {
        return res.status(401).json({message: 'Access denied: No user information found'})
    }

    if (req.user.id !== parseInt(req.params.id)) {
        return res.status(401).json({message: 'Access denied: User is not the owner of this account'})
    }

    next()
}



