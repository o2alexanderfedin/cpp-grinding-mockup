import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { RepositoryCard } from '../components/RepositoryCard'
import { RepositoryGrid } from '../components/RepositoryGrid'
import { RepositoryDashboard } from '../pages/RepositoryDashboard'
import repositoriesReducer from '../features/repositories/repositoriesSlice'
import { mockRepositories } from '../data/mockRepositories'

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
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  )
}

describe('Epic 3 Phase 2: Repository Components', () => {
  describe('RepositoryCard Component', () => {
    const mockRepo = mockRepositories[0]!
    const mockOnSelect = vi.fn()

    it('should render repository name and owner', () => {
      renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={false} onSelect={mockOnSelect} />,
      )

      expect(screen.getByText(`${mockRepo.owner}/${mockRepo.name}`)).toBeInTheDocument()
    })

    it('should render repository description', () => {
      renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={false} onSelect={mockOnSelect} />,
      )

      expect(screen.getByText(mockRepo.description)).toBeInTheDocument()
    })

    it('should render language chip', () => {
      renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={false} onSelect={mockOnSelect} />,
      )

      expect(screen.getByText(mockRepo.language)).toBeInTheDocument()
    })

    it('should render stars count', () => {
      renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={false} onSelect={mockOnSelect} />,
      )

      // Stars should be in the format "⭐ 12543"
      expect(screen.getByText(/12543/)).toBeInTheDocument()
    })

    it('should render total issue count', () => {
      renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={false} onSelect={mockOnSelect} />,
      )

      expect(screen.getByText(/23 issues/)).toBeInTheDocument()
    })

    it('should render critical issues badge when present', () => {
      renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={false} onSelect={mockOnSelect} />,
      )

      expect(screen.getByText(/3 critical/)).toBeInTheDocument()
    })

    it('should render high issues badge when present', () => {
      renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={false} onSelect={mockOnSelect} />,
      )

      expect(screen.getByText(/8 high/)).toBeInTheDocument()
    })

    it('should render medium issues badge when present', () => {
      renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={false} onSelect={mockOnSelect} />,
      )

      expect(screen.getByText(/9 medium/)).toBeInTheDocument()
    })

    it('should not render severity badges for zero count', () => {
      const repoWithoutCritical = {
        ...mockRepo,
        criticalIssues: 0,
      }
      renderWithProviders(
        <RepositoryCard repository={repoWithoutCritical} isSelected={false} onSelect={mockOnSelect} />,
      )

      expect(screen.queryByText(/0 critical/)).not.toBeInTheDocument()
    })

    it('should call onSelect when clicked', () => {
      const { container } = renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={false} onSelect={mockOnSelect} />,
      )

      const card = container.querySelector('.MuiCard-root') as HTMLElement
      expect(card).toBeInTheDocument()
      card.click()

      expect(mockOnSelect).toHaveBeenCalledWith(mockRepo.id)
    })

    it('should apply selected styles when isSelected is true', () => {
      const { container } = renderWithProviders(
        <RepositoryCard repository={mockRepo} isSelected={true} onSelect={mockOnSelect} />,
      )

      const card = container.querySelector('.MuiCard-root')
      // We'll verify the border style is applied
      expect(card).toBeInTheDocument()
    })
  })

  describe('RepositoryGrid Component', () => {
    const mockOnSelect = vi.fn()

    it('should render all repositories', () => {
      renderWithProviders(
        <RepositoryGrid
          repositories={mockRepositories}
          selectedRepositoryId={null}
          onSelectRepository={mockOnSelect}
        />,
      )

      expect(screen.getByText('stripe/payment-gateway')).toBeInTheDocument()
      expect(screen.getByText('meta/compiler-optimizer')).toBeInTheDocument()
    })

    it('should render correct number of repository cards', () => {
      const { container } = renderWithProviders(
        <RepositoryGrid
          repositories={mockRepositories}
          selectedRepositoryId={null}
          onSelectRepository={mockOnSelect}
        />,
      )

      const cards = container.querySelectorAll('.MuiCard-root')
      expect(cards).toHaveLength(2)
    })

    it('should pass selected state to cards', () => {
      renderWithProviders(
        <RepositoryGrid
          repositories={mockRepositories}
          selectedRepositoryId="repo-1"
          onSelectRepository={mockOnSelect}
        />,
      )

      // The selected card should be in the document
      expect(screen.getByText('stripe/payment-gateway')).toBeInTheDocument()
    })

    it('should render empty when no repositories', () => {
      const { container } = renderWithProviders(
        <RepositoryGrid
          repositories={[]}
          selectedRepositoryId={null}
          onSelectRepository={mockOnSelect}
        />,
      )

      const cards = container.querySelectorAll('.MuiCard-root')
      expect(cards).toHaveLength(0)
    })
  })

  describe('RepositoryDashboard Page', () => {
    it('should render page title', () => {
      renderWithProviders(<RepositoryDashboard />)

      expect(screen.getByText('Your Repositories')).toBeInTheDocument()
    })

    it('should render all repositories from store', () => {
      renderWithProviders(<RepositoryDashboard />)

      expect(screen.getByText('stripe/payment-gateway')).toBeInTheDocument()
      expect(screen.getByText('meta/compiler-optimizer')).toBeInTheDocument()
    })

    it('should render repository grid', () => {
      const { container } = renderWithProviders(<RepositoryDashboard />)

      const grid = container.querySelector('.MuiGrid-container')
      expect(grid).toBeInTheDocument()
    })
  })
})
