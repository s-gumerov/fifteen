import { Router } from 'express'
import { changeUserTheme, getUserTheme } from '../models/theme'
import { Theme } from '../../db'
import { DEFAULT_THEME } from '../../const'

const router = Router()

router.post(getUserTheme.route, async (req, res) => {
  /**
   * если не найдем пользователя в БД то добавим запись со значением по умолчанию ${DEFAULT_THEME}
   */

  const userTheme = await Theme.findOne({
    where: {
      id: req.body.id,
    },
  })

  const newTheme = {
    id: req.body.id,
    theme_name: DEFAULT_THEME,
  }

  if (!userTheme) {
    try {
      await Theme.create(newTheme)
      return res.send(newTheme)
    } catch (error) {
      return
    }
  } else {
    return res.send({
      id: userTheme.dataValues.id,
      theme_name: userTheme.dataValues.theme_name,
    })
  }
})

router.post(changeUserTheme.route, async (req, res) => {
  const { id, theme_name } = req.body
  await Theme.update(
    {
      theme_name: theme_name,
    },
    {
      where: { id: id },
    }
  )

  return res.send({
    id: id,
    theme_name: theme_name,
  })
})

export default router
