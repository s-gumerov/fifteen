import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { AuthProvider } from './context';
import { Router } from './router/Router';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './services/errorBoundary/ErrorFallback';
import store from './store';
import './styles.scss';


function App() {
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
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default withErrorBoundary(App, {
  FallbackComponent: ErrorFallback
});
