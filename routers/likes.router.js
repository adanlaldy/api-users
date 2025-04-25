import express from 'express'
import {createLike, deleteLikeById} from "../controllers/likes.controller.js";

const router = express.Router()

router.post('/', createLike)
router.delete('/:id', deleteLikeById)

export default router
