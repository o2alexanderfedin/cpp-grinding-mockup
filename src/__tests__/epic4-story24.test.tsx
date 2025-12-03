import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileTreeNode } from '../components/FileTreeNode'
import type { FileNode } from '../types/repository'

describe('Story #24: Issue Count Badges', () => {
  describe('Badge display', () => {
    it('should show badge with issue count for files with issues', () => {
      const fileNode: FileNode = {
        id: 'file1',
        name: 'main.cpp',
        type: 'file',
        path: '/src/main.cpp',
        extension: '.cpp',
        issueCount: 5,
        criticalIssues: 1,
        highIssues: 2,
        mediumIssues: 2,
        lowIssues: 0,
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={fileNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      expect(screen.getByText('main.cpp')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should show badge with issue count for directories with issues', () => {
      const dirNode: FileNode = {
        id: 'dir1',
        name: 'src',
        type: 'directory',
        path: '/src',
        issueCount: 10,
        criticalIssues: 2,
        highIssues: 3,
        mediumIssues: 4,
        lowIssues: 1,
        children: [],
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={dirNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      expect(screen.getByText('src')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('should not show badge when issueCount is 0', () => {
      const fileNode: FileNode = {
        id: 'file1',
        name: 'test.cpp',
        type: 'file',
        path: '/src/test.cpp',
        extension: '.cpp',
        issueCount: 0,
        criticalIssues: 0,
        highIssues: 0,
        mediumIssues: 0,
        lowIssues: 0,
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={fileNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      expect(screen.getByText('test.cpp')).toBeInTheDocument()
      // Should not find any badge with '0'
      expect(screen.queryByText('0')).not.toBeInTheDocument()
    })
  })

  describe('Severity color coding', () => {
    it('should show error color for critical issues', () => {
      const fileNode: FileNode = {
        id: 'file1',
        name: 'main.cpp',
        type: 'file',
        path: '/src/main.cpp',
        extension: '.cpp',
        issueCount: 5,
        criticalIssues: 2,
        highIssues: 1,
        mediumIssues: 2,
        lowIssues: 0,
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={fileNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      // Find the chip/badge element
      const badge = screen.getByText('5').closest('.MuiChip-root')
      expect(badge).toBeInTheDocument()
      // Critical issues should use 'error' color (red)
      expect(badge).toHaveClass('MuiChip-colorError')
    })

    it('should show warning color for high issues (no critical)', () => {
      const fileNode: FileNode = {
        id: 'file1',
        name: 'main.cpp',
        type: 'file',
        path: '/src/main.cpp',
        extension: '.cpp',
        issueCount: 5,
        criticalIssues: 0,
        highIssues: 2,
        mediumIssues: 3,
        lowIssues: 0,
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={fileNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      const badge = screen.getByText('5').closest('.MuiChip-root')
      expect(badge).toBeInTheDocument()
      // High issues should use 'warning' color (orange)
      expect(badge).toHaveClass('MuiChip-colorWarning')
    })

    it('should show info color for medium issues (no critical/high)', () => {
      const fileNode: FileNode = {
        id: 'file1',
        name: 'main.cpp',
        type: 'file',
        path: '/src/main.cpp',
        extension: '.cpp',
        issueCount: 5,
        criticalIssues: 0,
        highIssues: 0,
        mediumIssues: 5,
        lowIssues: 0,
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={fileNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      const badge = screen.getByText('5').closest('.MuiChip-root')
      expect(badge).toBeInTheDocument()
      // Medium issues should use 'info' color (blue)
      expect(badge).toHaveClass('MuiChip-colorInfo')
    })

    it('should show default color for low issues only', () => {
      const fileNode: FileNode = {
        id: 'file1',
        name: 'main.cpp',
        type: 'file',
        path: '/src/main.cpp',
        extension: '.cpp',
        issueCount: 3,
        criticalIssues: 0,
        highIssues: 0,
        mediumIssues: 0,
        lowIssues: 3,
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={fileNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      const badge = screen.getByText('3').closest('.MuiChip-root')
      expect(badge).toBeInTheDocument()
      // Low issues should use 'default' color
      expect(badge).toHaveClass('MuiChip-colorDefault')
    })
  })

  describe('Tooltip with severity breakdown', () => {
    it('should show tooltip with severity breakdown on hover', async () => {
      const user = userEvent.setup()
      const fileNode: FileNode = {
        id: 'file1',
        name: 'main.cpp',
        type: 'file',
        path: '/src/main.cpp',
        extension: '.cpp',
        issueCount: 10,
        criticalIssues: 2,
        highIssues: 3,
        mediumIssues: 4,
        lowIssues: 1,
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={fileNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      const badge = screen.getByText('10')
      await user.hover(badge)

      // Tooltip should show severity breakdown
      // Note: Material-UI Tooltip may need a delay
      await screen.findByText(/Critical:/i, {}, { timeout: 2000 })
      expect(screen.getByText(/Critical: 2/i)).toBeInTheDocument()
      expect(screen.getByText(/High: 3/i)).toBeInTheDocument()
      expect(screen.getByText(/Medium: 4/i)).toBeInTheDocument()
      expect(screen.getByText(/Low: 1/i)).toBeInTheDocument()
    })

    it('should not show zero-count severities in tooltip', async () => {
      const user = userEvent.setup()
      const fileNode: FileNode = {
        id: 'file1',
        name: 'main.cpp',
        type: 'file',
        path: '/src/main.cpp',
        extension: '.cpp',
        issueCount: 5,
        criticalIssues: 0,
        highIssues: 2,
        mediumIssues: 3,
        lowIssues: 0,
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={fileNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      const badge = screen.getByText('5')
      await user.hover(badge)

      await screen.findByText(/High:/i, {}, { timeout: 2000 })
      expect(screen.getByText(/High: 2/i)).toBeInTheDocument()
      expect(screen.getByText(/Medium: 3/i)).toBeInTheDocument()
      expect(screen.queryByText(/Critical:/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Low:/i)).not.toBeInTheDocument()
    })
  })

  describe('Badge aggregation for directories', () => {
    it('should aggregate child issue counts in directory badges', () => {
      const dirNode: FileNode = {
        id: 'dir1',
        name: 'src',
        type: 'directory',
        path: '/src',
        issueCount: 15,
        criticalIssues: 3,
        highIssues: 5,
        mediumIssues: 5,
        lowIssues: 2,
        children: [
          {
            id: 'file1',
            name: 'main.cpp',
            type: 'file',
            path: '/src/main.cpp',
            extension: '.cpp',
            issueCount: 8,
            criticalIssues: 2,
            highIssues: 3,
            mediumIssues: 2,
            lowIssues: 1,
          },
          {
            id: 'file2',
            name: 'utils.cpp',
            type: 'file',
            path: '/src/utils.cpp',
            extension: '.cpp',
            issueCount: 7,
            criticalIssues: 1,
            highIssues: 2,
            mediumIssues: 3,
            lowIssues: 1,
          },
        ],
      }

      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={dirNode}
          level={0}
          expanded={new Set()}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      expect(screen.getByText('src')).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
    })
  })
})
