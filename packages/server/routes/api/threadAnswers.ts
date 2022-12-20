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
    login: req.body.login,
    avatar_url: req.body.avatarUrl,
    thread_id: req.body.threadId,
    text: req.body.text,
  })
  await newThreadAnswer.save()
  await newThreadAnswer.reload()
  const result: createThreadAnswer.Response = {
    id: (newThreadAnswer as Record<any, any>).id,
  }
  res.send(result)
})

router.post(getThreadAnswer.route, async (req, res) => {
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
      id: threadAnswer.dataValues.id,
      authorId: threadAnswer.dataValues.author_id,
      login: threadAnswer.dataValues.login,
      avatarUrl: threadAnswer.dataValues.avatar_url,
      text: threadAnswer.dataValues.text,
      createdAt: threadAnswer.dataValues.createdAt,
    }
  }
  res.send(result)
})

router.post(getAnswersByThread.route, async (req, res) => {
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
      id: answer.dataValues.id,
      authorId: answer.dataValues.author_id,
      login: answer.dataValues.login,
      avatarUrl: answer.dataValues.avatar_url,
      text: answer.dataValues.text,
      createdAt: answer.dataValues.createdAt,
    }
  })
  res.send(result)
})

export default router
