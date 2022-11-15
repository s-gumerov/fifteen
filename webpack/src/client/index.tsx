import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from './store';


declare global {
    interface Window {
        __PRELOADED_STATE__: any;
    }
}
const state = window.__PRELOADED_STATE__ ;

delete window.__PRELOADED_STATE__;
console.log(state)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   </Provider>
)
