import { AuthProvider } from './context';
import { LeadersProvider } from "./context/Leaders";
import { Router } from './router/Router';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './services/errorBoundary/ErrorFallback';
// import './styles.scss';

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
    <AuthProvider>
      <LeadersProvider>
        <Router />
      </LeadersProvider>
    </AuthProvider>
  );
}

export default withErrorBoundary(App, {
    FallbackComponent: ErrorFallback
});
