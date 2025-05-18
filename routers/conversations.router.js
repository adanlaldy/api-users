import express from 'express'
import { createConversation } from "../controllers/conversations.controller.js"

const router = express.Router()

/**
 * @route POST /
 * @desc Create a new conversation between two users
 * @access Public or protected depending on controller logic
 */
router.post('/', createConversation)

export default router
