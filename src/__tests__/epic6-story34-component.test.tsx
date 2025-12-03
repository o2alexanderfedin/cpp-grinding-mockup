/**
 * Epic 6 - Story #34: ExportMenu Component Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ExportMenu } from '../components/ExportMenu'
import type { Issue } from '../types/issue'
import * as exportUtils from '../utils/export'

// Mock the export module
vi.mock('../utils/export', () => ({
  exportToJSON: vi.fn(),
  exportToCSV: vi.fn(),
  generateFilename: vi.fn((repo: string, format: string) => `${repo}.${format}`),
}))

describe('Story #34: ExportMenu Component', () => {
  const mockIssues: Issue[] = [
    {
      id: 'test-1',
      severity: 'critical',
      category: 'memory-safety',
      file: '/src/test.cpp',
      line: 42,
      title: 'Test issue',
      description: 'Test description',
      codeSnippet: 'code',
      smtLibProof: 'proof',
      simplifiedProof: 'simple',
      explanation: 'explanation',
      suggestedFix: 'fix',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Button rendering', () => {
    it('should render export button', () => {
      render(<ExportMenu issues={mockIssues} repositoryName="test-repo" />)

      const button = screen.getByTitle('Export issues')
      expect(button).toBeInTheDocument()
    })

    it('should disable button when no issues', () => {
      render(<ExportMenu issues={[]} repositoryName="test-repo" />)

      const button = screen.getByTitle('Export issues')
      expect(button).toBeDisabled()
    })

    it('should enable button when issues exist', () => {
      render(<ExportMenu issues={mockIssues} repositoryName="test-repo" />)

      const button = screen.getByTitle('Export issues')
      expect(button).toBeEnabled()
    })
  })

  describe('Menu interaction', () => {
    it('should open menu when button clicked', () => {
      render(<ExportMenu issues={mockIssues} repositoryName="test-repo" />)

      const button = screen.getByTitle('Export issues')
      fireEvent.click(button)

      expect(screen.getByText('Export as JSON')).toBeInTheDocument()
      expect(screen.getByText('Export as CSV')).toBeInTheDocument()
    })

    it('should not show menu initially', () => {
      render(<ExportMenu issues={mockIssues} repositoryName="test-repo" />)

      expect(screen.queryByText('Export as JSON')).not.toBeInTheDocument()
    })
  })

  describe('Export JSON functionality', () => {
    it('should call exportToJSON when JSON menu item clicked', async () => {
      render(<ExportMenu issues={mockIssues} repositoryName="test-repo" />)

      const button = screen.getByTitle('Export issues')
      fireEvent.click(button)

      const jsonOption = screen.getByText('Export as JSON')
      fireEvent.click(jsonOption)

      await waitFor(() => {
        expect(exportUtils.generateFilename).toHaveBeenCalledWith('test-repo', 'json')
        expect(exportUtils.exportToJSON).toHaveBeenCalledWith(mockIssues, 'test-repo.json')
      })
    })

    it('should close menu after JSON export', async () => {
      render(<ExportMenu issues={mockIssues} repositoryName="test-repo" />)

      const button = screen.getByTitle('Export issues')
      fireEvent.click(button)

      const jsonOption = screen.getByText('Export as JSON')
      fireEvent.click(jsonOption)

      await waitFor(() => {
        expect(screen.queryByText('Export as JSON')).not.toBeInTheDocument()
      })
    })
  })

  describe('Export CSV functionality', () => {
    it('should call exportToCSV when CSV menu item clicked', async () => {
      render(<ExportMenu issues={mockIssues} repositoryName="test-repo" />)

      const button = screen.getByTitle('Export issues')
      fireEvent.click(button)

      const csvOption = screen.getByText('Export as CSV')
      fireEvent.click(csvOption)

      await waitFor(() => {
        expect(exportUtils.generateFilename).toHaveBeenCalledWith('test-repo', 'csv')
        expect(exportUtils.exportToCSV).toHaveBeenCalledWith(mockIssues, 'test-repo.csv')
      })
    })

    it('should close menu after CSV export', async () => {
      render(<ExportMenu issues={mockIssues} repositoryName="test-repo" />)

      const button = screen.getByTitle('Export issues')
      fireEvent.click(button)

      const csvOption = screen.getByText('Export as CSV')
      fireEvent.click(csvOption)

      await waitFor(() => {
        expect(screen.queryByText('Export as CSV')).not.toBeInTheDocument()
      })
    })
  })

  describe('Export with multiple issues', () => {
    it('should export all filtered issues', async () => {
      const multipleIssues: Issue[] = [mockIssues[0], { ...mockIssues[0], id: 'test-2' }]

      render(<ExportMenu issues={multipleIssues} repositoryName="test-repo" />)

      const button = screen.getByTitle('Export issues')
      fireEvent.click(button)

      const jsonOption = screen.getByText('Export as JSON')
      fireEvent.click(jsonOption)

      await waitFor(() => {
        expect(exportUtils.exportToJSON).toHaveBeenCalledWith(multipleIssues, 'test-repo.json')
      })
    })
  })
})
