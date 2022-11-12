import { StaticRouter } from "react-router-dom/server";
import path from 'path';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import { Request, Response } from 'express';
import App from "../../client/App";

export function render(req: Request, res: Response) {
  const reactHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} >
      <App />
    </StaticRouter>
  );
  const html = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'src', 'assets', 'index.html'), {
    encoding: 'utf8',
  });

  const response = html.replace(
          '<div id="root"></div>',
          `<div id="root">${reactHtml}</div>
          <script src="./client.bundle.js"></script>`
        );

  res.status(200).send(response);
}