import { describe, it, expect } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import connectionReducer, {
  connectToGitHub,
  disconnect,
  selectConnectionStatus,
  selectIsConnected,
} from '@features/connection/connectionSlice'
import repositoriesReducer from '@features/repositories/repositoriesSlice'
import analysisReducer from '@features/analysis/analysisSlice'

const createTestStore = () =>
  configureStore({
    reducer: {
      connection: connectionReducer,
      repositories: repositoriesReducer,
      analysis: analysisReducer,
    },
  })

describe('Epic 2 - Phase 3: Redux State Management', () => {
  describe('connectionSlice', () => {
    it('should have initial state as disconnected', () => {
      const store = createTestStore()

      const state = store.getState()
      expect(state.connection.status).toBe('disconnected')
    })

    it('should change status to connecting when connectToGitHub is pending', () => {
      const store = createTestStore()

      store.dispatch(connectToGitHub())

      const state = store.getState()
      expect(state.connection.status).toBe('connecting')
    })

    it('should change status to connected when connectToGitHub is fulfilled', async () => {
      const store = createTestStore()

      await store.dispatch(connectToGitHub())

      const state = store.getState()
      expect(state.connection.status).toBe('connected')
    })

    it('should reset to disconnected when disconnect is called', async () => {
      const store = createTestStore()

      await store.dispatch(connectToGitHub())
      store.dispatch(disconnect())

      const state = store.getState()
      expect(state.connection.status).toBe('disconnected')
    })
  })

  describe('Selectors', () => {
    it('selectConnectionStatus should return current status', () => {
      const store = createTestStore()

      const status = selectConnectionStatus(store.getState())
      expect(status).toBe('disconnected')
    })

    it('selectIsConnected should return true when connected', async () => {
      const store = createTestStore()

      await store.dispatch(connectToGitHub())

      const isConnected = selectIsConnected(store.getState())
      expect(isConnected).toBe(true)
    })

    it('selectIsConnected should return false when disconnected', () => {
      const store = createTestStore()

      const isConnected = selectIsConnected(store.getState())
      expect(isConnected).toBe(false)
    })

    it('selectIsConnected should return false when connecting', () => {
      const store = createTestStore()

      store.dispatch(connectToGitHub())

      const isConnected = selectIsConnected(store.getState())
      expect(isConnected).toBe(false)
    })
  })

  describe('Connection Timing', () => {
    it('should complete connection in approximately 1.5 seconds', async () => {
      const store = createTestStore()

      const startTime = Date.now()
      await store.dispatch(connectToGitHub())
      const endTime = Date.now()

      const duration = endTime - startTime
      // Allow for 100ms variance
      expect(duration).toBeGreaterThanOrEqual(1400)
      expect(duration).toBeLessThan(1700)
    })
  })
})
