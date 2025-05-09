import express from 'express'
import {createMessage, getMessagesByConversation} from "../controllers/messages.controller.js";

const router = express.Router()

router.post("/send", createMessage);
router.get("/conversation/:id", getMessagesByConversation);

export default router
