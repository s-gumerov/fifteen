import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import fs from 'fs'
import bodyParser from 'body-parser'
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'
import { CLIENT_DIR, PRAKTIKUM_API_URL } from './const'
import type { RequestCustom } from './middlewares'
import { authMiddleware } from './middlewares'
import {
  getLeaderboardByThunk,
  getStoreFromServer,
  TState,
  TTheme,
} from './store'
import { CLIENT_ROUTES } from './routes/client'
// import { router } from './routes/api'

const { createProxyMiddleware } = require('http-proxy-middleware')
dotenv.config()
// import { sequelize } from './db'

let template = fs.readFileSync(
  path.resolve(__dirname, CLIENT_DIR + 'index.html'),
  'utf-8'
)

// sequelize
//   .authenticate()
//   .then(() => console.log('Connected.'))
//   .catch(err => console.error('Connection error: ', err))

async function createServer() {
  const port = Number(process.env.SERVER_PORT) || 3001
  const app = express()
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  })
  app.use(vite.middlewares)
  app.use(cors())

  const serverRenderMiddleware = async (req: Request, res: Response) => {
    const { originalUrl } = req
    const status = (req as RequestCustom).calculatedStatus
    const user = (req as RequestCustom).userData

    const leaderboard =
      originalUrl === CLIENT_ROUTES.LEADERS
        ? await getLeaderboardByThunk(req.headers.cookie)
        : undefined

    const theme: TTheme = 'dark'

    const store: TState = getStoreFromServer(user, theme, leaderboard)

    const reactHtml = await render(originalUrl)
    template = await vite.transformIndexHtml(originalUrl, template)
    const preloadedState = JSON.stringify(store).replace(/</g, '\\\u003c')
    const appHtml = `<script>window.__PRELOADED_STATE__=${preloadedState}</script>
                    <div id="root">${reactHtml}</div>`
    const html = template.replace(`<div id="root"></div>`, appHtml)
    res.status(status).send(html)
  }

  // app.use(router)

  app.use(
    '/praktikum-api',
    createProxyMiddleware({
      pathRewrite: { '^/praktikum-api': '/' },
      target: PRAKTIKUM_API_URL,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      secure: false,
      debug: true,
    })
  )

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use('*', authMiddleware)

  app.use(
    express.static(path.resolve(__dirname, CLIENT_DIR), {
      index: false,
    })
  )

  app.use('*', serverRenderMiddleware)

  app.listen(port)
}

createServer()
