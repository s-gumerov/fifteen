import { Router } from 'express'
import { createThread, getThreadsByTopic, getThread } from '../models/thread'
import { Thread } from '../../db'

const router = Router()

router.post(createThread.route, async (req, res) => {
  const newThread = await Thread.create({
    author_id: req.body.authorId,
    login: req.body.login,
    avatar_url: req.body.avatarUrl,
    topic_id: req.body.topicId,
    text: req.body.text,
  })
  await newThread.save()
  await newThread.reload()
  const result: createThread.Response = {
    id: (newThread as Record<any, any>).id,
  }
  res.send(result)
})

router.post(getThread.route, async (req, res) => {
  const { id, topicId } = req.body
  const thread = await Thread.findOne({
    where: {
      id: id,
      topic_id: topicId,
    },
  })
  let result = {}
  if (thread) {
    result = {
      id: thread.dataValues.id,
      authorId: thread.dataValues.author_id,
      login: thread.dataValues.login,
      avatarUrl: thread.dataValues.avatar_url,
      text: thread.dataValues.text,
      createdAt: thread.dataValues.createdAt,
    }
  }
  res.send(result)
})

router.post(getThreadsByTopic.route, async (req, res) => {
  const { topic, quantity, start } = req.body
  console.log(req.body)
  const threads = await Thread.findAll({
    where: {
      topic_id: topic,
    },
    order: [['createdAt', 'ASC']],
  })
  const aThread = threads.slice(start, quantity)
  const result = aThread.map(thread => {
    return {
      id: thread.dataValues.id,
      authorId: thread.dataValues.author_id,
      login: thread.dataValues.login,
      avatarUrl: thread.dataValues.avatar_url,
      text: thread.dataValues.text,
      createdAt: thread.dataValues.createdAt,
    }
  })
  res.send(result)
})

export default router
