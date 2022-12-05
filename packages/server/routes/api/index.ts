import { Router } from 'express'
import userRouter from './users'
import topicRouter from './topics'
import threadRouter from './threads'
import threadAnswerRouter from './threadAnswers'
import themeRouter from './themes'
import { API_URL } from '../../const'

const router = Router()

router.use(API_URL, themeRouter)
router.use(API_URL, userRouter)
router.use(API_URL, topicRouter)
router.use(API_URL, threadRouter)
router.use(API_URL, threadAnswerRouter)

export { router }
