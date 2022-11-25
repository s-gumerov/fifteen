import { Router } from 'express'
import {
  createThreadAnswer,
  getAnswersByThread,
  getThreadAnswer,
} from '../models/threadAnswer'
import { ThreadAnswer } from '../../db'

const router = Router()

router.post(createThreadAnswer.route, async (req, res) => {
  const newThreadAnswer = await ThreadAnswer.create({
    author_id: req.body.authorId,
    thread_id: req.body.threadId,
    text: req.body.text,
  })
  await newThreadAnswer.save()
  const result: createThreadAnswer.Response = req.body.authorId
  res.send(result)
})

router.get(getThreadAnswer.route, async (req, res) => {
  const { id, threadId } = req.body
  const threadAnswer = await ThreadAnswer.findOne({
    where: {
      id: id,
      thread_id: threadId,
    },
  })
  let result = {}
  if (threadAnswer) {
    result = {
      authorId: threadAnswer.dataValues.author_id,
      text: threadAnswer.dataValues.text,
      createdAt: threadAnswer.dataValues.createdAt,
    }
  }
  res.send(result)
})

router.get(getAnswersByThread.route, async (req, res) => {
  const { thread, quantity, start } = req.body
  const threadAnswers = await ThreadAnswer.findAll({
    where: {
      thread_id: thread,
    },
    order: [['createdAt', 'ASC']],
  })
  const aThreadAnswer = threadAnswers.slice(start, quantity)
  const result = aThreadAnswer.map(answer => {
    return {
      authorId: answer.dataValues.author_id,
      text: answer.dataValues.text,
      createdAt: answer.dataValues.createdAt,
    }
  })
  res.send(result)
})

export default router
