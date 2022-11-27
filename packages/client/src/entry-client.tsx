import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

declare global {
    interface Window {
        // В d.ts нам неважно, что это за тип,
        // так как он сразу попадает в redux store на клиенте
        __PRELOADED_STATE__?: object;
    }
}

const serverStore = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__
console.log(serverStore)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
