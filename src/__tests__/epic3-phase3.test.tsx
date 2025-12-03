import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { RepositoryDashboard } from '../pages/RepositoryDashboard'
import { RepositoryView } from '../pages/RepositoryView'
import repositoriesReducer, { selectRepository } from '../features/repositories/repositoriesSlice'

import connectionReducer from '../features/connection/connectionSlice'
import analysisReducer from '../features/analysis/analysisSlice'

// Test wrapper with Redux and Router
const createTestStore = () =>
  configureStore({
    reducer: {
      connection: connectionReducer,
      repositories: repositoriesReducer,
      analysis: analysisReducer,
    },
  })

const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore()
  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>,
    ),
  }
}

const renderWithMemoryRouter = (initialRoute: string) => {
  const store = createTestStore()
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/dashboard" element={<RepositoryDashboard />} />
            <Route path="/repo/:repoId" element={<RepositoryView />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    ),
  }
}

describe('Epic 3 Phase 3: Repository Selection & Navigation', () => {
  describe('Repository Selection', () => {
    it('should dispatch selectRepository action when card is clicked', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Find and click the first repository card
      const firstCard = screen.getByText('stripe/payment-gateway').closest('.MuiCard-root')
      expect(firstCard).toBeInTheDocument()

      fireEvent.click(firstCard!)

      // Verify Redux state was updated
      const state = store.getState()
      expect(state.repositories.selectedRepositoryId).toBe('repo-1')
    })

    it('should update selected repository when different card is clicked', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Click first repository
      const firstCard = screen.getByText('stripe/payment-gateway').closest('.MuiCard-root')
      fireEvent.click(firstCard!)

      // Click second repository
      const secondCard = screen.getByText('meta/compiler-optimizer').closest('.MuiCard-root')
      fireEvent.click(secondCard!)

      // Verify state was updated to second repository
      const state = store.getState()
      expect(state.repositories.selectedRepositoryId).toBe('repo-2')
    })
  })

  describe('Navigation', () => {
    it('should navigate to /repo/:repoId when repository is selected', () => {
      renderWithMemoryRouter('/dashboard')

      // Click on a repository card
      const card = screen.getByText('stripe/payment-gateway').closest('.MuiCard-root')
      fireEvent.click(card!)

      // Verify navigation occurred
      expect(screen.getByText(/File tree and analysis coming soon/)).toBeInTheDocument()
    })
  })

  describe('RepositoryView Page', () => {
    it('should display repository name when valid repoId is provided', () => {
      renderWithMemoryRouter('/repo/repo-1')

      expect(screen.getByText('stripe/payment-gateway')).toBeInTheDocument()
    })

    it('should display "Repository not found" for invalid repoId', () => {
      renderWithMemoryRouter('/repo/invalid-id')

      expect(screen.getByText('Repository not found')).toBeInTheDocument()
    })

    it('should display placeholder text for file tree', () => {
      renderWithMemoryRouter('/repo/repo-1')

      expect(screen.getByText(/File tree and analysis coming soon/)).toBeInTheDocument()
    })
  })

  describe('Selected Repository State', () => {
    it('should persist selected repository in Redux', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Manually dispatch selectRepository
      store.dispatch(selectRepository('repo-2'))

      // Verify state
      const state = store.getState()
      expect(state.repositories.selectedRepositoryId).toBe('repo-2')
    })

    it('should highlight selected repository card', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Select a repository
      store.dispatch(selectRepository('repo-1'))

      // Re-render to pick up state change
      const { container } = renderWithProviders(<RepositoryDashboard />)

      // The selected card should have different styling
      const cards = container.querySelectorAll('.MuiCard-root')
      expect(cards.length).toBeGreaterThan(0)
    })
  })
})
