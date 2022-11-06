import { useEffect } from 'react';
import { hot } from "react-hot-loader";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { AuthProvider } from './context';
import { LeadersProvider } from "./context/Leaders";
import { Router } from './router/Router';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './services/errorBoundary/ErrorFallback';
import store from './store';
import './styles.scss';

function startServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register("/serviceWorker.ts").then(registration => {
        console.log("ServiceWorker registration successful with  scope: ", registration.scope);
      }).catch((error: string) => {
        console.log("ServiceWorker registration failed: ", error);
      });
    })
  }
}

const App = () => {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }
  //
  //   fetchServerData()
  // }, [])

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
};

export default App;

// export default withErrorBoundary(App, {
//     FallbackComponent: ErrorFallback
// });
