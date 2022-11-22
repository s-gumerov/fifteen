import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import type { Request, Response } from 'express'
import fs from 'fs'
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'
import express from 'express'

dotenv.config()

enum PATH {
  CLIENT = '../client/dist/client/',
}

async function createServer() {
  const port = Number(process.env.SERVER_PORT) || 3001
  const app = express()

  app.use(cors())

  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use(express.static(path.resolve(__dirname, PATH.CLIENT)))

  app.use('*', async (req: Request, res: Response) => {
    const { originalUrl } = req

    let template = fs.readFileSync(
      path.resolve(__dirname, PATH.CLIENT + 'index.html'),
      'utf-8'
    )

    const reactHtml = await render(originalUrl)

    template = await vite.transformIndexHtml(originalUrl, template)

    const appHtml = `<div id="root">${reactHtml}</div>`

    const html = template.replace(`<div id="root"></div>`, appHtml)

    res.status(200).send(html)
  })

  app.listen(port)
}

createServer()
