/**
 * PWA Service Worker Types
 *
 * Type definitions for Progressive Web App service worker functionality
 */

/**
 * Service Worker Update Event
 * Represents different types of service worker lifecycle events
 */
export interface ServiceWorkerUpdateEvent {
  /** Event type: 'update' when new version available, 'offline-ready' when app can work offline */
  type: 'update' | 'offline-ready'

  /** Optional service worker registration object */
  registration?: ServiceWorkerRegistration
}

/**
 * PWA Configuration
 * Configuration options for PWA registration and update handling
 */
export interface PWAConfig {
  /** Callback invoked when a new service worker version is available */
  onNeedRefresh?: () => void

  /** Callback invoked when the app is ready to work offline */
  onOfflineReady?: () => void
}

/**
 * Service Worker Registration Function
 * Type for the registration function returned by virtual:pwa-register
 */
export type RegisterSWFunction = (config?: PWAConfig) => ((reloadPage?: boolean) => Promise<void>) | undefined
