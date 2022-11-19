import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import React from 'react';

ReactDOM.hydrateRoot(
    document.getElementById('root')  as HTMLElement,
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
