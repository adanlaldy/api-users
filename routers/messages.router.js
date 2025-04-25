import express from 'express'
import {createMessage, getAllReceiverMessagesByUserId, getAllSenderMessagesByUserId} from "../controllers/messages.controller.js";

const router = express.Router()

router.post('/', createMessage)
router.get('/receiver/:id', getAllReceiverMessagesByUserId)
router.get('/sender/:id', getAllSenderMessagesByUserId)

export default router
