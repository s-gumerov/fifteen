import express from 'express';
import { render } from './render/render';
import path from "path";

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/', express.static(path.join(__dirname, '../dist')))

app.use(render);

app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
})