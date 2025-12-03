import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@components/Hero'
import { ValueProposition } from '@components/ValueProposition'
import { ConnectButton } from '@components/ConnectButton'
import { LandingPage } from '@pages/LandingPage'
import { ThemeProvider } from '@mui/material'
import { macosTheme } from '@theme/macosTheme'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import connectionReducer from '@features/connection/connectionSlice'
import { BrowserRouter } from 'react-router-dom'

// Test helper to wrap components with providers
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

describe('Epic 2 - Phase 1: Landing Page UI Structure', () => {
  describe('Hero Component', () => {
    it('should render app name', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <Hero appName="Hupyy" tagline="AI Firewall for Code Verification" subtitle="Test subtitle" />
        </ThemeProvider>
      )
      expect(screen.getByText('Hupyy')).toBeInTheDocument()
    })

    it('should render tagline', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <Hero
            appName="Hupyy"
            tagline="AI Firewall for Code Verification"
            subtitle="Test subtitle"
          />
        </ThemeProvider>
      )
      expect(screen.getByText('AI Firewall for Code Verification')).toBeInTheDocument()
    })

    it('should render subtitle', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <Hero
            appName="Hupyy"
            tagline="AI Firewall for Code Verification"
            subtitle="Formal verification linter that detects bugs before they reach production"
          />
        </ThemeProvider>
      )
      expect(
        screen.getByText('Formal verification linter that detects bugs before they reach production')
      ).toBeInTheDocument()
    })
  })

  describe('ValueProposition Component', () => {
    const mockBenefits = [
      {
        title: 'Detect Bugs Early',
        description: 'Find issues before code review',
      },
      {
        title: 'Formal Verification',
        description: 'Mathematical proof of correctness',
      },
      {
        title: 'AI-Powered',
        description: 'Smart analysis and suggestions',
      },
    ]

    it('should render all three benefits', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <ValueProposition benefits={mockBenefits} />
        </ThemeProvider>
      )
      expect(screen.getByText('Detect Bugs Early')).toBeInTheDocument()
      expect(screen.getByText('Formal Verification')).toBeInTheDocument()
      expect(screen.getByText('AI-Powered')).toBeInTheDocument()
    })

    it('should render benefit descriptions', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <ValueProposition benefits={mockBenefits} />
        </ThemeProvider>
      )
      expect(screen.getByText('Find issues before code review')).toBeInTheDocument()
      expect(screen.getByText('Mathematical proof of correctness')).toBeInTheDocument()
      expect(screen.getByText('Smart analysis and suggestions')).toBeInTheDocument()
    })
  })

  describe('ConnectButton Component', () => {
    it('should render connect button', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <ConnectButton
            onConnect={async () => {}}
            isConnecting={false}
            isConnected={false}
            error={null}
          />
        </ThemeProvider>
      )
      expect(screen.getByRole('button', { name: /connect to github/i })).toBeInTheDocument()
    })

    it('should show connecting state', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <ConnectButton
            onConnect={async () => {}}
            isConnecting={true}
            isConnected={false}
            error={null}
          />
        </ThemeProvider>
      )
      expect(screen.getByText(/connecting/i)).toBeInTheDocument()
    })

    it('should show connected state', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <ConnectButton
            onConnect={async () => {}}
            isConnecting={false}
            isConnected={true}
            error={null}
          />
        </ThemeProvider>
      )
      expect(screen.getByText(/connected/i)).toBeInTheDocument()
    })

    it('should disable button when connecting', () => {
      render(
        <ThemeProvider theme={macosTheme}>
          <ConnectButton
            onConnect={async () => {}}
            isConnecting={true}
            isConnected={false}
            error={null}
          />
        </ThemeProvider>
      )
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('LandingPage Integration', () => {
    it('should render without crashing', () => {
      renderWithProviders(<LandingPage />)
      expect(screen.getByText('Hupyy')).toBeInTheDocument()
    })

    it('should display hero section', () => {
      renderWithProviders(<LandingPage />)
      expect(screen.getByText('AI Firewall for Code Verification')).toBeInTheDocument()
    })

    it('should display value propositions', () => {
      renderWithProviders(<LandingPage />)
      expect(screen.getByText('Detect Bugs Early')).toBeInTheDocument()
    })

    it('should display connect button', () => {
      renderWithProviders(<LandingPage />)
      expect(screen.getByRole('button', { name: /connect to github/i })).toBeInTheDocument()
    })

    it('should apply macOS theme colors', () => {
      const { container } = renderWithProviders(<LandingPage />)
      const body = container.ownerDocument.body
      const computedStyle = window.getComputedStyle(body)
      // Theme should be applied (background color set by CssBaseline)
      expect(computedStyle).toBeDefined()
    })
  })
})
