import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { PageNavigation } from '../PageNavigation'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('PageNavigation', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <PageNavigation {...props} />
      </BrowserRouter>
    )
  }

  describe('Rendering', () => {
    it('renders both Back and Home buttons by default', () => {
      renderComponent()

      expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /go to home/i })).toBeInTheDocument()
    })

    it('renders only Back button when showHome is false', () => {
      renderComponent({ showHome: false })

      expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /go to home/i })).not.toBeInTheDocument()
    })

    it('renders only Home button when showBack is false', () => {
      renderComponent({ showBack: false })

      expect(screen.queryByRole('button', { name: /go back/i })).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /go to home/i })).toBeInTheDocument()
    })

    it('renders no buttons when both showBack and showHome are false', () => {
      renderComponent({ showBack: false, showHome: false })

      expect(screen.queryByRole('button', { name: /go back/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /go to home/i })).not.toBeInTheDocument()
    })
  })

  describe('Button Text', () => {
    it('displays "Back" text on Back button', () => {
      renderComponent()

      expect(screen.getByText('Back')).toBeInTheDocument()
    })

    it('displays "Home" text on Home button', () => {
      renderComponent()

      expect(screen.getByText('Home')).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('navigates back when Back button is clicked', async () => {
      const user = userEvent.setup()
      renderComponent()

      const backButton = screen.getByRole('button', { name: /go back/i })
      await user.click(backButton)

      expect(mockNavigate).toHaveBeenCalledWith(-1)
      expect(mockNavigate).toHaveBeenCalledTimes(1)
    })

    it('navigates to home when Home button is clicked', async () => {
      const user = userEvent.setup()
      renderComponent()

      const homeButton = screen.getByRole('button', { name: /go to home/i })
      await user.click(homeButton)

      expect(mockNavigate).toHaveBeenCalledWith('/')
      expect(mockNavigate).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has proper aria-label on Back button', () => {
      renderComponent()

      const backButton = screen.getByRole('button', { name: /go back/i })
      expect(backButton).toHaveAttribute('aria-label', 'Go back')
    })

    it('has proper aria-label on Home button', () => {
      renderComponent()

      const homeButton = screen.getByRole('button', { name: /go to home/i })
      expect(homeButton).toHaveAttribute('aria-label', 'Go to home')
    })
  })
})
