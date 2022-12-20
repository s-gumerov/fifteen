import { Request, Response, Router } from 'express'
import { createTopic, getTopics, getTopic } from '../models/topic'
import { Topic } from '../../db'

const router = Router()

router.post(createTopic.route, async (req, res) => {
  const newTopic = await Topic.create({
    id: null,
    author_id: req.body?.authorId,
    login: req.body?.login,
    avatar_url: req.body?.avatarUrl,
    text: req.body?.text,
  })
  await newTopic.save()
  await newTopic.reload()
  const result: createTopic.Response = {
    id: (newTopic as Record<any, any>).id,
  }
  res.send(result)
})

router.post(getTopic.route, async (req, res) => {
  const id = req.body?.id ?? 0
  const topic = await Topic.findOne({
    where: {
      id: id,
    },
  })
  let result = {}
  if (topic) {
    result = {
      id: topic.dataValues.id,
      authorId: topic.dataValues.author_id,
      login: topic.dataValues.login,
      avatarUrl: topic.dataValues.avatar_url,
      text: topic.dataValues.text,
      createdAt: topic.dataValues.createdAt,
    }
  }
  res.send(result)
})

router.post(getTopics.route, async (req: Request, res: Response) => {
  const quantity = req.body?.quantity ?? 0
  const start = req.body?.start ?? 0
  const topics = await Topic.findAll({
    order: [['createdAt', 'DESC']],
  })
  const aTopic = topics.slice(start, quantity)
  const result = aTopic.map(topic => {
    return {
      id: topic.dataValues.id,
      authorId: topic.dataValues.author_id,
      login: topic.dataValues.login,
      avatarUrl: topic.dataValues.avatar_url,
      text: topic.dataValues.text,
      createdAt: topic.dataValues.createdAt,
    }
  })
  res.send(result)
})

export default router
