import React from 'react';
import App from 'client/src/App';
import { hydrate } from "react-dom";

// @ts-ignore
hydrate(document.getElementById('root'), <App />)