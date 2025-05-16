import * as service from '../services/users.service.js'

export function isEmailValid(req, res, next) {
    const { email } = req.body
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (req.body.email.match(regex)) {
        next()
    }
    else {
        res.status(400).json({
            message: 'Invalid email'
        })
    }
}

export function isPasswordDigitValid(req, res, next) {
    const {password} = req.body
    const regex = /^(?=.*\d)/
    if (req.body.password.match(regex)) {
        next()
    } else {
        res.status(400).json({
            message:"Password must contain a digit"
        })
    }
}

export function isPasswordCasse(req, res, next) {
    const {password} = req.body
    const regex = /^(?=.*[a-z])(?=.*[A-Z])/
    if (req.body.password.match(regex)) {
        next()
    } else {
        res.status(400).json({
            message:"Password will contain at least one upper case letter and one lower case letter"
        })
    }
}

export function isPasswordLong(req, res, next) {
    const {password} = req.body
    if (req.body.password.length >= 8) {
        next()
    } else {
        res.status(400).json({
            message:"Password will contain at least one upper case letter and one lower case letter"
        })
    }
}

export async function isUniqueEmail(req, res, next) {
    const {email} = req.body
    const user = await service.findUserByEmail(email)
    if (!user) {
        next()
    } else {
        res.status(400).json({
            message: "people aldready exist"
        })
    }
}