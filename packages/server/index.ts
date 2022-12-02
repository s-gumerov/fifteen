import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import type { Request, Response } from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'
import { router } from './routes/api'
dotenv.config()
import { sequelize } from './db'

enum PATH {
  CLIENT = '../client/dist/client/',
}

let template = fs.readFileSync(
  path.resolve(__dirname, PATH.CLIENT + 'index.html'),
  'utf-8'
)

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch(err => console.error('Connection error: ', err))

async function createServer() {
  const port = Number(process.env.SERVER_PORT) || 3001
  const app = express()
  app.use(bodyParser.json())
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  })
  app.use(cors())

  // app.use(bodyParser.json())
  app.use(router)

  app.use(vite.middlewares)
  app.use(express.static(path.resolve(__dirname, PATH.CLIENT)))
  // app.use(bodyParser.json())
  // app.use(bodyParser.urlencoded({ extended: false }))
  app.use('*', async (req: Request, res: Response) => {
    const { originalUrl } = req

    const reactHtml = await render(originalUrl)

    template = await vite.transformIndexHtml(originalUrl, template)

    const appHtml = `<div id="root">${reactHtml}</div>`

    const html = template.replace(`<div id="root"></div>`, appHtml)

    res.status(200).send(html)
  })

  app.listen(port)
}

createServer()
