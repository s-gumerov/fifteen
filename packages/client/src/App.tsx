import React from 'react'
import { LeadersProvider } from './context/Leaders'
import { Router } from './router/Router'
import { withErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './services/errorBoundary/ErrorFallback'
import './styles.scss'

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/serviceWorker.ts')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with  scope: ',
            registration.scope
          )
        })
        .catch((error: string) => {
          console.log('ServiceWorker registration failed: ', error)
        })
    })
  }
}

const App = () => (
  <LeadersProvider>
    <Router />
  </LeadersProvider>
)

export default withErrorBoundary(App, {
  FallbackComponent: ErrorFallback,
})
