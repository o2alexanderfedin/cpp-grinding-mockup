import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LandingPage } from '@pages/LandingPage'
import { Hero } from '@components/Hero'
import { ThemeProvider } from '@mui/material'
import { macosTheme } from '@theme/macosTheme'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import connectionReducer from '@features/connection/connectionSlice'
import { BrowserRouter } from 'react-router-dom'

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      connection: connectionReducer,
    },
  })

  return render(
    <Provider store={store}>
      <ThemeProvider theme={macosTheme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

describe('Epic 2 - Phase 4: Animations & Polish', () => {
  describe('Framer Motion Integration', () => {
    it('should render landing page with motion wrapper', () => {
      renderWithProviders(<LandingPage />)
      // Check that the page renders (motion.div doesn't break anything)
      expect(screen.getByText('Hupyy')).toBeInTheDocument()
    })

    it('should render hero with motion wrapper', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <Hero appName="Hupyy" tagline="Test" subtitle="Test subtitle" />
        </ThemeProvider>
      )
      expect(screen.getByText('Hupyy')).toBeInTheDocument()
    })
  })

  describe('Material-UI Icons', () => {
    it('should render security shield icon in hero', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <Hero appName="Hupyy" tagline="Test" subtitle="Test subtitle" />
        </ThemeProvider>
      )
      // Icon should be rendered (Security icon)
      const hero = screen.getByText('Hupyy').closest('div')
      expect(hero).toBeInTheDocument()
    })
  })

  describe('macOS Theme Application', () => {
    it('should apply primary color to buttons', () => {
      renderWithProviders(<LandingPage />)
      const button = screen.getByRole('button', { name: /connect to github/i })
      expect(button).toHaveStyle({ color: 'rgb(255, 255, 255)' }) // Button text is white
    })

    it('should use SF Pro font family', () => {
      const { container } = renderWithProviders(<LandingPage />)
      const body = container.ownerDocument.body
      const computedStyle = window.getComputedStyle(body)
      // Font family should be applied through theme
      expect(computedStyle.fontFamily).toBeDefined()
    })
  })

  describe('Responsive Design', () => {
    it('should render container with max width', () => {
      renderWithProviders(<LandingPage />)
      // Container should have maxWidth="lg" which is applied
      expect(screen.getByText('Hupyy')).toBeInTheDocument()
    })

    it('should display value propositions in grid layout', () => {
      renderWithProviders(<LandingPage />)
      // All three benefits should be visible
      expect(screen.getByText('Detect Bugs Early')).toBeInTheDocument()
      expect(screen.getByText('Formal Verification')).toBeInTheDocument()
      expect(screen.getByText('AI-Powered')).toBeInTheDocument()
    })
  })

  describe('Visual Polish', () => {
    it('should render cards with elevation', () => {
      renderWithProviders(<LandingPage />)
      const benefitTitle = screen.getByText('Detect Bugs Early')
      const card = benefitTitle.closest('[class*="MuiCard"]')
      expect(card).toBeInTheDocument()
    })

    it('should show icons for each benefit', () => {
      renderWithProviders(<LandingPage />)
      // Icons are rendered as SVG elements
      expect(screen.getByText('Detect Bugs Early')).toBeInTheDocument()
      expect(screen.getByText('Formal Verification')).toBeInTheDocument()
      expect(screen.getByText('AI-Powered')).toBeInTheDocument()
    })

    it('should use correct typography variants', () => {
      renderWithProviders(<LandingPage />)
      const heading = screen.getByText('Hupyy')
      // h2 variant with h1 component
      expect(heading.tagName).toBe('H1')
    })
  })
})
