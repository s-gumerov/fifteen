import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import fs from 'fs'
import bodyParser from 'body-parser'
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'
import {
  CLIENT_ROUTES,
  HTTP_STATUS_CODE,
  PRAKTIKUM_API_URL,
  PRIVATE_ROUTES,
  PUPLIC_ROUTES
} from "./const";
import { getUserInfo, getUrlAndRedirect } from "./utils";
// import { router } from './routes/api'

const { createProxyMiddleware } = require('http-proxy-middleware');
dotenv.config()
// import { sequelize } from './db'

enum PATH { CLIENT = '../client/dist/client/' };

interface RequestCustom extends Request { calculatedStatus: HTTP_STATUS_CODE.OK | HTTP_STATUS_CODE.UNAUTHORIZED }

let template = fs.readFileSync(
  path.resolve(__dirname, PATH.CLIENT + 'index.html'),
  'utf-8'
)

// sequelize
//   .authenticate()
//   .then(() => console.log('Connected.'))
//   .catch(err => console.error('Connection error: ', err))

const serverStore = {
  user:'ivanov ivan',
  leaderboard:'leaderboard'
}
async function createServer() {
  const port = Number(process.env.SERVER_PORT) || 3001
  const app = express()
  const vite = await createViteServer({
    server: {
      middlewareMode: true
    },
    appType: 'custom',
  })
  app.use(vite.middlewares);
  app.use(cors());

  const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { originalUrl } = req;
    const getUser = await getUserInfo(req.headers.cookie);
    const user = typeof getUser !== 'string' ? getUser : null;
    const isPrivateRoute = PRIVATE_ROUTES.includes(originalUrl as CLIENT_ROUTES);
    const isPublicRoute = PUPLIC_ROUTES.includes(originalUrl as CLIENT_ROUTES);

    const urlAndRedirect = getUrlAndRedirect(user, originalUrl as CLIENT_ROUTES, isPrivateRoute, isPublicRoute);
    const status = user ? HTTP_STATUS_CODE.OK : HTTP_STATUS_CODE.UNAUTHORIZED;
    (req as RequestCustom).calculatedStatus = status;
    urlAndRedirect.isRedirect ? res.redirect(urlAndRedirect.url) : next();
  }

  const serverRenderMiddleware = async (req: Request, res: Response) => {
    const { originalUrl } = req;
    const status = (req as RequestCustom).calculatedStatus;

    const reactHtml = await render(originalUrl);
    template = await vite.transformIndexHtml(originalUrl, template)
    const appHtml =
      `<script>window.__PRELOADED_STATE__=${JSON.stringify(serverStore)
      .replace(/</g, '\\\u003c')}
      </script>
                    <div id="root">${reactHtml}</div>`
    const html = template.replace(`<div id="root"></div>`, appHtml)
    res.status(status).send(html)
  }

  // app.use(router)

  app.use('/praktikum-api', createProxyMiddleware({
    pathRewrite: { '^/praktikum-api': '/' },
    target: PRAKTIKUM_API_URL,
    changeOrigin: true,
    cookieDomainRewrite: "localhost",
    secure: false,
    debug: true,
  }));

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use('*', authMiddleware);
  // app.use(express.static(path.resolve(__dirname, PATH.CLIENT)));

  app.use(
    (await import('serve-static')).default(path.resolve(__dirname,PATH.CLIENT), {
      index: false
    })
  )

  app.use('*', serverRenderMiddleware);


  app.listen(port)
}

createServer()
