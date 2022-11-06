import { renderToString } from 'react-dom/server';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import { createClientAndConnect } from './db';
import { generateTemplate } from "./template";
import App from "client/src/App"

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

app.get('/', (_, res) => {
  const jsx = (<App />);
  res.send(generateTemplate(renderToString(jsx)));
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
})
