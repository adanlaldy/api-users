import express from 'express'
import {
    createLike,
    deleteLikeById
} from "../controllers/likes.controller.js"

const router = express.Router()

/**
 * @route POST /
 * @desc Add a new like to an auction
 * @access Public or protected depending on controller logic
 */
router.post('/', createLike)

/**
 * @route DELETE /:id
 * @desc Remove a like by its ID
 * @access Public or protected depending on controller logic
 */
router.delete('/:id', deleteLikeById)

export default router
