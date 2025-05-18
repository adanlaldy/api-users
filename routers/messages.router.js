import express from 'express'
import {
    createMessage,
    getMessagesByConversation
} from "../controllers/messages.controller.js"

const router = express.Router()

/**
 * @route POST /send
 * @desc Send (create) a new message within a conversation
 * @access Public or protected depending on controller logic
 */
router.post("/send", createMessage)

/**
 * @route GET /conversation/:id
 * @desc Retrieve all messages for a specific conversation by ID
 * @access Public or protected depending on controller logic
 */
router.get("/conversation/:id", getMessagesByConversation)

export default router
