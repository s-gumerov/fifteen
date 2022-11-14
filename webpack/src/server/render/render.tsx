import {StaticRouter} from "react-router-dom/server";
import path from 'path';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import {Request, Response} from 'express';
import App from "../../client/App";
import store from '../../client/store/index'
import { Provider } from 'react-redux';


export function render(req: Request, res: Response) {
    const reactHtml = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
            <Provider store={store!}>
                <App/>
            </Provider>
        </StaticRouter>
    );

    // const html = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'src', 'assets', 'index.html'), {
    //     encoding: 'utf8',
    // });

    const html = fs.readFileSync(path.resolve(__dirname, '../src/assets/index.html'), {
        encoding: 'utf8',
    });

    const response = html.replace(
        '<div id="root"></div>',
        `<script>
                       window.__PRELOADED_STATE__=${JSON.stringify(store?.getState()).replace(/</g, '\\u003c')}
                    </script>
                    <div id="root">${reactHtml}</div>
                    <script src="../dist/client.bundle.js"></script>`
    );

    res.status(200).send(response);
}