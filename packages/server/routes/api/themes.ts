import {Router} from 'express'
import {changeUserTheme, createUserTheme, getUserTheme} from '../models/theme'
import {Theme} from '../../db'

const router = Router()

router.post(createUserTheme.route, async (req, res) => {
  const {user_id, theme_name} = req.body;
  console.log(user_id)
  const newTheme = await Theme.create({
    id: user_id,
    theme_name: theme_name,
  })

  await newTheme.save()

  return res.send(
    {
      data:
        {
          user_id: user_id,
          theme_name: theme_name,
        }
    })
})

router.post(changeUserTheme.route, async (req, res) => {
  const {user_id, theme_name} = req.body;
  await Theme.update(
    {
      theme_name: theme_name
    },
    {
      where: {id: user_id}
    }
  )

  return res.send(
    {
      data:
        {
          user_id: user_id,
          theme_name: theme_name,
        }
    }
  )
})

router.get(getUserTheme.route, async (req, res) => {
  const theme = await Theme.findOne({
    where: {
      id: req.body.user_id,
    },
  })
  let result = {}
  if (theme) {
    result = {
      data:
        {
          user_id: theme.dataValues.user_id,
          theme_name: theme.dataValues.theme_name,
        }
    }
  }
  res.send(result)
})

export default router
