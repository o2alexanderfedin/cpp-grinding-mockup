/**
 * Epic 6 - Story #33: IssueDetail Copy Buttons Component Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { IssueDetail } from '../components/IssueDetail'
import type { Issue } from '../types/issue'
import * as clipboard from '../utils/clipboard'

// Mock the clipboard module
vi.mock('../utils/clipboard', () => ({
  copyToClipboard: vi.fn(async () => true),
  formatIssueForClipboard: vi.fn((issue: Issue) => `Formatted: ${issue.title}`),
}))

describe('Story #33: IssueDetail Copy Buttons', () => {
  const mockIssue: Issue = {
    id: 'test-1',
    severity: 'critical',
    category: 'memory-safety',
    file: '/src/test.cpp',
    line: 42,
    title: 'Test buffer overflow',
    description: 'Test description',
    codeSnippet: 'char buffer[16];\nstrcpy(buffer, input);',
    smtLibProof: '(assert true)',
    simplifiedProof: 'This is a simplified proof',
    explanation: 'This is a test explanation',
    suggestedFix: 'Use strncpy instead',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Copy buttons rendering', () => {
    it('should render copy button in header', () => {
      render(<IssueDetail issue={mockIssue} />)

      const copyButtons = screen.getAllByTitle(/copy/i)
      expect(copyButtons.length).toBeGreaterThan(0)

      const issueButton = screen.getByTitle('Copy entire issue')
      expect(issueButton).toBeInTheDocument()
    })

    it('should render copy button for code snippet', () => {
      render(<IssueDetail issue={mockIssue} />)

      const codeButton = screen.getByTitle('Copy code')
      expect(codeButton).toBeInTheDocument()
    })

    it('should render copy button for proof', () => {
      render(<IssueDetail issue={mockIssue} />)

      const proofButton = screen.getByTitle('Copy proof')
      expect(proofButton).toBeInTheDocument()
    })
  })

  describe('Copy code functionality', () => {
    it('should copy code snippet when button clicked', async () => {
      render(<IssueDetail issue={mockIssue} />)

      const copyButton = screen.getByTitle('Copy code')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(clipboard.copyToClipboard).toHaveBeenCalledWith(mockIssue.codeSnippet)
      })
    })

    it('should show success snackbar after copying code', async () => {
      render(<IssueDetail issue={mockIssue} />)

      const copyButton = screen.getByTitle('Copy code')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(screen.getByText('Code copied!')).toBeInTheDocument()
      })
    })

    it('should show error snackbar when copy fails', async () => {
      vi.mocked(clipboard.copyToClipboard).mockResolvedValueOnce(false)

      render(<IssueDetail issue={mockIssue} />)

      const copyButton = screen.getByTitle('Copy code')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(screen.getByText('Failed to copy')).toBeInTheDocument()
      })
    })
  })

  describe('Copy proof functionality', () => {
    it('should copy simplified proof by default', async () => {
      render(<IssueDetail issue={mockIssue} />)

      const copyButton = screen.getByTitle('Copy proof')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(clipboard.copyToClipboard).toHaveBeenCalledWith(mockIssue.simplifiedProof)
      })
    })

    it('should copy SMT-LIB proof when toggled', async () => {
      render(<IssueDetail issue={mockIssue} />)

      // Toggle to SMT-LIB view
      const toggleButton = screen.getByText('Show SMT-LIB')
      fireEvent.click(toggleButton)

      // Copy proof
      const copyButton = screen.getByTitle('Copy proof')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(clipboard.copyToClipboard).toHaveBeenCalledWith(mockIssue.smtLibProof)
      })
    })

    it('should show success snackbar after copying proof', async () => {
      render(<IssueDetail issue={mockIssue} />)

      const copyButton = screen.getByTitle('Copy proof')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(screen.getByText('Proof copied!')).toBeInTheDocument()
      })
    })
  })

  describe('Copy entire issue functionality', () => {
    it('should copy formatted issue when button clicked', async () => {
      render(<IssueDetail issue={mockIssue} />)

      const copyButton = screen.getByTitle('Copy entire issue')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(clipboard.formatIssueForClipboard).toHaveBeenCalledWith(mockIssue)
        expect(clipboard.copyToClipboard).toHaveBeenCalled()
      })
    })

    it('should show success snackbar after copying issue', async () => {
      render(<IssueDetail issue={mockIssue} />)

      const copyButton = screen.getByTitle('Copy entire issue')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(screen.getByText('Issue copied!')).toBeInTheDocument()
      })
    })
  })

  describe('Snackbar behavior', () => {
    it('should show snackbar after copy action', async () => {
      render(<IssueDetail issue={mockIssue} />)

      const copyButton = screen.getByTitle('Copy code')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(screen.getByText('Code copied!')).toBeInTheDocument()
      })
    })
  })
})
