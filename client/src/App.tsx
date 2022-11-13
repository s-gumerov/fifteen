import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { AuthProvider } from './context';
import { LeadersProvider } from "./context/Leaders";
import { Router } from './router/Router';
// import { withErrorBoundary } from 'react-error-boundary';
// import { ErrorFallback } from './services/errorBoundary/ErrorFallback';
import store from './store';
import './styles.scss';
import React from 'react';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <LeadersProvider>
            <Router />
          </LeadersProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
