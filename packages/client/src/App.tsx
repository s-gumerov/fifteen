import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './context';
import {Router} from './router/Router';
import {withErrorBoundary} from 'react-error-boundary';
import {ErrorFallback} from './services/errorBoundary/ErrorFallback';
import './styles.scss';
import {LeadersProvider} from "./context/Leaders";

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
    return (
        <BrowserRouter>
            <AuthProvider>
                <LeadersProvider>
                    <Router/>
                </LeadersProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default withErrorBoundary(App, {
    FallbackComponent: ErrorFallback
});
