import express from 'express'
import {createConversation} from "../controllers/conversations.controller.js";

const router = express.Router()

router.post('/', createConversation)

export default router
