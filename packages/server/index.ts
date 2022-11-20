import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()
import path from "path";
import { createServer as createViteServer } from 'vite';
import fs from 'fs';

// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs';
import express from 'express';

async function createServer() {

  const port = Number(process.env.SERVER_PORT) || 3001;
  const app = express()

  app.use(cors())

  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use('*', async (req:any, res:any) => {

    const url = req.originalUrl

      let template = fs.readFileSync(
        path.resolve(__dirname, '../client/index.html'),
        'utf-8'
      )
    const appHtml = await render(url);

      template = await vite.transformIndexHtml(url, template)

      const html = template.replace(`<div id="root"></div>`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  })

  app.listen(port);
}
createServer()
