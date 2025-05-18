import jwt from 'jsonwebtoken'

/**
 * Middleware to check if the authenticated user has admin privileges.
 * Sends 401 Unauthorized if no user info or user role is not 'admin'.
 */
export const checkAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Access denied: No user information found' })
    }

    if (req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Access denied: User is not an admin' })
    }

    next()
}

/**
 * Middleware to verify the presence and validity of a JWT token.
 * Checks for token in Authorization header or cookies.
 * On success, attaches decoded user info to req.user.
 * Sends 401 Unauthorized if no token or token is invalid.
 */
export function checkToken(req, res, next) {
    let token = req.headers?.authorization
    if (!token) {
        token = req.cookies?.token
    }

    if (!token) {
        return res.status(401).json({ message: 'No connected...' })
    }

    token = token.replace('Bearer ', '')

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    next()
}

/**
 * Middleware to ensure the authenticated user ID matches the ID in the route params.
 * Useful for protecting routes where users can only access their own data.
 * Sends 401 Unauthorized if no user info or user IDs don't match.
 */
export function checkSelfId(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'Access denied: No user information found' })
    }

    if (req.user.id !== parseInt(req.params.id)) {
        return res.status(401).json({ message: 'Access denied: User is not the owner of this account' })
    }

    next()
}
