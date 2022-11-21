import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { sequelize } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
