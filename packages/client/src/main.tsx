import React from 'react';
import App from './App';
import { hydrate } from "react-dom";

// @ts-ignore
hydrate(document.getElementById('root'), <App />)

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
