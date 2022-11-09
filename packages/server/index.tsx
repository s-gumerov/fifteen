import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import { generateTemplate } from "./template";
import { renderToString } from 'react-dom/server';

import express from 'express'
import { createClientAndConnect } from './db'
import App from "client/src/App"
import { Triangles } from 'client/src/components/ui/Triangles';
const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001
import React from 'react'
createClientAndConnect()

app.get('/', (_, res) => {
  
  const jsx = <div><Triangles/> <App/></div>
  res.send(generateTemplate(renderToString(jsx)));
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
