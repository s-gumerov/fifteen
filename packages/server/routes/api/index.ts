import { Router } from "express";
import userRouter from "./users"
import topicRouter from "./topics"
import threadRouter from "./threads"
import threadAnswerRouter from "./threadAnswers"

const router = Router();

router.use('/', userRouter)
router.use('/', topicRouter)
router.use('/', threadRouter)
router.use('/', threadAnswerRouter)

export { router }