import { Router } from 'express'
import { getTheme } from '../models/theme'
import { Theme } from '../../db'

const router = Router()

router.get(getTheme.route, async (req, res) => {
  const themeName = req.body.themeName
  const theme = await Theme.findOne({
    where: {
      theme_name: themeName,
    },
  })
  const result = theme
    ? {
        mainColor: theme.dataValues.main_color,
        secondColor: theme.dataValues.second_color,
      }
    : {}
  res.send(result)
})

export default router
