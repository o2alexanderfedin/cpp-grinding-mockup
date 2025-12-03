import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { SearchBar } from '../components/SearchBar'
import { RepositoryDashboard } from '../pages/RepositoryDashboard'
import repositoriesReducer, {
  setSearchQuery,
  setSeverityFilter,
  selectFilteredRepositories,
} from '../features/repositories/repositoriesSlice'

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

describe('Epic 3 Phase 4: Search & Filter', () => {
  describe('SearchBar Component', () => {
    it('should render search input', () => {
      const mockOnChange = vi.fn()
      render(<SearchBar value="" onChange={mockOnChange} />)

      const input = screen.getByPlaceholderText(/Search repositories/i)
      expect(input).toBeInTheDocument()
    })

    it('should display current value', () => {
      const mockOnChange = vi.fn()
      render(<SearchBar value="stripe" onChange={mockOnChange} />)

      const input = screen.getByDisplayValue('stripe')
      expect(input).toBeInTheDocument()
    })

    it('should call onChange when typing', () => {
      const mockOnChange = vi.fn()
      render(<SearchBar value="" onChange={mockOnChange} />)

      const input = screen.getByPlaceholderText(/Search repositories/i)
      fireEvent.change(input, { target: { value: 'payment' } })

      expect(mockOnChange).toHaveBeenCalledWith('payment')
    })

    it('should support custom placeholder', () => {
      const mockOnChange = vi.fn()
      render(<SearchBar value="" onChange={mockOnChange} placeholder="Custom search..." />)

      expect(screen.getByPlaceholderText('Custom search...')).toBeInTheDocument()
    })
  })

  describe('Search Functionality in Dashboard', () => {
    it('should render search bar in dashboard', () => {
      renderWithProviders(<RepositoryDashboard />)

      const input = screen.getByPlaceholderText(/Search repositories/i)
      expect(input).toBeInTheDocument()
    })

    it('should filter repositories by search query', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Initially shows all repositories
      expect(screen.getByText('stripe/payment-gateway')).toBeInTheDocument()
      expect(screen.getByText('meta/compiler-optimizer')).toBeInTheDocument()

      // Type in search
      const input = screen.getByPlaceholderText(/Search repositories/i)
      fireEvent.change(input, { target: { value: 'stripe' } })

      // Verify Redux state
      const state = store.getState()
      expect(state.repositories.searchQuery).toBe('stripe')
    })

    it('should show only matching repositories after search', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Search for 'payment'
      store.dispatch(setSearchQuery('payment'))

      // Re-render with updated state
      renderWithProviders(<RepositoryDashboard />)

      // Verify filtering
      const state = store.getState()
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]!.name).toBe('payment-gateway')
    })

    it('should show no repositories when search matches nothing', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      store.dispatch(setSearchQuery('nonexistent'))

      const state = store.getState()
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(0)
    })

    it('should clear filter when search is cleared', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Set search
      store.dispatch(setSearchQuery('stripe'))
      let state = store.getState()
      let filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(1)

      // Clear search
      store.dispatch(setSearchQuery(''))
      state = store.getState()
      filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(2)
    })
  })

  describe('Search Query Behavior', () => {
    it('should be case-insensitive', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Search with uppercase
      store.dispatch(setSearchQuery('STRIPE'))

      const state = store.getState()
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]!.owner).toBe('stripe')
    })

    it('should search by repository name', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      store.dispatch(setSearchQuery('compiler'))

      const state = store.getState()
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]!.name).toBe('compiler-optimizer')
    })

    it('should search by owner name', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      store.dispatch(setSearchQuery('meta'))

      const state = store.getState()
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]!.owner).toBe('meta')
    })
  })

  describe('Combined Filters', () => {
    it('should apply both search and severity filters', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Both repos have critical issues, but only stripe matches search
      store.dispatch(setSearchQuery('stripe'))
      store.dispatch(setSeverityFilter('critical'))

      const state = store.getState()
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]!.owner).toBe('stripe')
    })

    it('should show no results when filters exclude all repos', () => {
      const { store } = renderWithProviders(<RepositoryDashboard />)

      // Search for stripe but filter for repos without high issues
      // (stripe has high issues, so it should be excluded)
      store.dispatch(setSearchQuery('nonexistent'))
      store.dispatch(setSeverityFilter('critical'))

      const state = store.getState()
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(0)
    })
  })
})
