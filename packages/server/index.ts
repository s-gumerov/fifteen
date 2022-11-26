import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import fs from 'fs'
import bodyParser from 'body-parser'
import axios from "axios";
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'
import type { TUser } from "./types";
import {
  CLIENT_ROUTES,
  HTTP_STATUS_CODE,
  PRAKTIKUM_API_URL,
  PRIVATE_ROUTES,
  PUPLIC_ROUTES
} from "./const";
import { getUserInfo, getUrl } from "./utils";
// import { router } from './routes/api'

const { createProxyMiddleware } = require('http-proxy-middleware');
dotenv.config()
// import { sequelize } from './db'

enum PATH { CLIENT = '../client/dist/client/' };

interface RequestCustom extends Request { user: TUser | null }

let template = fs.readFileSync(
  path.resolve(__dirname, PATH.CLIENT + 'index.html'),
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
      middlewareMode: true
    },
    appType: 'custom',
  })
  app.use(vite.middlewares);
  app.use(cors());

  const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const getUser = await getUserInfo(req.headers.cookie);
    const user = typeof getUser !== 'string' ? getUser : null;
    (req as RequestCustom).user = user;
    next();
  }

  const serverRenderMiddleware = async (req: Request, res: Response) => {
    const user = (req as RequestCustom).user;
    const { originalUrl } = req;

    const isPrivateRoute = PRIVATE_ROUTES.includes(originalUrl as CLIENT_ROUTES);
    const isPublicRoute = PUPLIC_ROUTES.includes(originalUrl as CLIENT_ROUTES);

    const url = getUrl(user, originalUrl as CLIENT_ROUTES, isPrivateRoute, isPublicRoute);
    const status = user ? HTTP_STATUS_CODE.OK : HTTP_STATUS_CODE.UNAUTHORIZED;

    const reactHtml = await render(url);
    template = await vite.transformIndexHtml(originalUrl, template)
    const appHtml = `<div id="root">${reactHtml}</div>`
    const html = template.replace(`<div id="root"></div>`, appHtml)
    res.status(status).send(html)
  }

  // app.use(router)
  app.use(express.static(path.resolve(__dirname, PATH.CLIENT)));

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
  app.use('*', authMiddleware, serverRenderMiddleware);
  app.listen(port)
}

createServer()
