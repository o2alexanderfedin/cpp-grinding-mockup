import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@app/store'
import { App } from './App'
import { registerSW } from 'virtual:pwa-register'

// Register Service Worker
const updateSW = registerSW({
  onNeedRefresh() {
    // New version available - prompt user to refresh
    if (confirm('New version available. Reload to update?')) {
      updateSW?.(true)
    }
  },
  onOfflineReady() {
    // App is ready to work offline
    console.log('Hupyy is ready to work offline')
  }
})

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
