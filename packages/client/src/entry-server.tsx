import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server';
import {Provider} from 'react-redux';
import store from './store/index';
import App from './App';
import path from 'path';
import fs from 'fs';
import {Request, Response} from 'express';


export const render = (req: Request, res: Response) => {

    const reactHTML = renderToString(
        <StaticRouter location={req.url}>
            <Provider store={store}>
                <App/>
            </Provider>
        </StaticRouter>
    );

    const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), {
        encoding: 'utf8',
    });


    const response = html.replace(
        '<div id="root"></div>',
        `<script>
                       window.__PRELOADED_STATE__=${JSON.stringify(store?.getState()).replace(/</g, '\\u003c')}
                    </script>
                    <div id="root">${reactHTML}</div>
`);

    return response;
}
