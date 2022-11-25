import { Router } from 'express'
import { createTopic, getTopics, getTopic } from '../models/topic'
import { Topic } from '../../db'

const router = Router()

router.post(createTopic.route, async (req, res) => {
  const newTopic = await Topic.create({
    author_id: req.body.authorId,
    text: req.body.text,
  })
  await newTopic.save()
  const result: createTopic.Response = req.body.authorId
  res.send(result)
})

router.get(getTopic.route, async (req, res) => {
  const { id } = req.body
  const topic = await Topic.findOne({
    where: {
      id: id,
    },
  })
  let result = {}
  if (topic) {
    result = {
      authorId: topic.dataValues.author_id,
      text: topic.dataValues.text,
      createdAt: topic.dataValues.createdAt,
    }
  }
  res.send(result)
})

router.get(getTopics.route, async (req, res) => {
  const { quantity, start } = req.body
  const topics = await Topic.findAll({
    order: [['createdAt', 'ASC']],
  })
  const aTopic = topics.slice(start, quantity)
  const result = aTopic.map(topic => {
    return {
      authorId: topic.dataValues.author_id,
      text: topic.dataValues.text,
      createdAt: topic.dataValues.createdAt,
    }
  })
  res.send(result)
})

export default router
