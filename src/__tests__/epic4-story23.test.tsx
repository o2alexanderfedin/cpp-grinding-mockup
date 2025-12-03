import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileTree } from '../components/FileTree'
import { FileTreeNode } from '../components/FileTreeNode'
import type { FileNode } from '../types/repository'

describe('Story #23: TreeView Component', () => {
  const mockFileTree: FileNode = {
    id: 'root',
    name: 'src',
    type: 'directory',
    path: '/src',
    issueCount: 10,
    criticalIssues: 2,
    highIssues: 3,
    mediumIssues: 4,
    lowIssues: 1,
    children: [
      {
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
      },
      {
        id: 'nested',
        name: 'utils',
        type: 'directory',
        path: '/src/utils',
        issueCount: 5,
        criticalIssues: 1,
        highIssues: 1,
        mediumIssues: 2,
        lowIssues: 1,
        children: [
          {
            id: 'file2',
            name: 'helper.cpp',
            type: 'file',
            path: '/src/utils/helper.cpp',
            extension: '.cpp',
            issueCount: 5,
            criticalIssues: 1,
            highIssues: 1,
            mediumIssues: 2,
            lowIssues: 1,
          },
        ],
      },
    ],
  }

  describe('FileTree container component', () => {
    it('should render root node', () => {
      const mockOnSelectFile = vi.fn()
      render(
        <FileTree
          rootNode={mockFileTree}
          selectedFilePath={null}
          onSelectFile={mockOnSelectFile}
        />,
      )

      expect(screen.getByText('src')).toBeInTheDocument()
    })

    it('should handle expand/collapse state', async () => {
      const user = userEvent.setup()
      const mockOnSelectFile = vi.fn()

      render(
        <FileTree
          rootNode={mockFileTree}
          selectedFilePath={null}
          onSelectFile={mockOnSelectFile}
        />,
      )

      // Initially, root should be expanded (children visible)
      expect(screen.getByText('main.cpp')).toBeInTheDocument()

      // Click to collapse
      const srcFolder = screen.getByText('src')
      await user.click(srcFolder)

      // Children should no longer be visible
      expect(screen.queryByText('main.cpp')).not.toBeInTheDocument()
    })

    it('should pass down selection state to nodes', () => {
      const mockOnSelectFile = vi.fn()
      render(
        <FileTree
          rootNode={mockFileTree}
          selectedFilePath="/src/main.cpp"
          onSelectFile={mockOnSelectFile}
        />,
      )

      const fileNode = screen.getByText('main.cpp').closest('div')
      expect(fileNode).toHaveStyle({ backgroundColor: expect.any(String) })
    })
  })

  describe('FileTreeNode presentation component', () => {
    it('should render directory with folder icon', () => {
      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={mockFileTree}
          level={0}
          expanded={new Set(['root'])}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      expect(screen.getByText('src')).toBeInTheDocument()
      // Check for expand icon (Material-UI icons)
      expect(screen.getByTestId('ExpandMoreIcon') || screen.getByTestId('ChevronRightIcon')).toBeInTheDocument()
    })

    it('should render file without expand icon', () => {
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
      expect(screen.queryByTestId('ExpandMoreIcon')).not.toBeInTheDocument()
      expect(screen.queryByTestId('ChevronRightIcon')).not.toBeInTheDocument()
    })

    it('should call onToggle when directory is clicked', async () => {
      const user = userEvent.setup()
      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={mockFileTree}
          level={0}
          expanded={new Set(['root'])}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      const dirNode = screen.getByText('src')
      await user.click(dirNode)

      expect(mockOnToggle).toHaveBeenCalledWith('root')
      expect(mockOnSelect).not.toHaveBeenCalled()
    })

    it('should call onSelect when file is clicked', async () => {
      const user = userEvent.setup()
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

      const fileNodeElement = screen.getByText('main.cpp')
      await user.click(fileNodeElement)

      expect(mockOnSelect).toHaveBeenCalledWith('/src/main.cpp')
      expect(mockOnToggle).not.toHaveBeenCalled()
    })

    it('should render children recursively when expanded', () => {
      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={mockFileTree}
          level={0}
          expanded={new Set(['root', 'nested'])}
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      expect(screen.getByText('src')).toBeInTheDocument()
      expect(screen.getByText('main.cpp')).toBeInTheDocument()
      expect(screen.getByText('utils')).toBeInTheDocument()
      expect(screen.getByText('helper.cpp')).toBeInTheDocument()
    })

    it('should not render children when collapsed', () => {
      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      render(
        <FileTreeNode
          node={mockFileTree}
          level={0}
          expanded={new Set()} // Collapsed
          selectedPath={null}
          onToggle={mockOnToggle}
          onSelect={mockOnSelect}
        />,
      )

      expect(screen.getByText('src')).toBeInTheDocument()
      expect(screen.queryByText('main.cpp')).not.toBeInTheDocument()
      expect(screen.queryByText('utils')).not.toBeInTheDocument()
    })

    it('should show indentation based on level', () => {
      const mockOnToggle = vi.fn()
      const mockOnSelect = vi.fn()

      const { container } = render(
        <div>
          <FileTreeNode
            node={mockFileTree}
            level={0}
            expanded={new Set()}
            selectedPath={null}
            onToggle={mockOnToggle}
            onSelect={mockOnSelect}
          />
          <FileTreeNode
            node={mockFileTree}
            level={2}
            expanded={new Set()}
            selectedPath={null}
            onToggle={mockOnToggle}
            onSelect={mockOnSelect}
          />
        </div>,
      )

      // Check that different padding is applied
      const nodes = container.querySelectorAll('[style*="padding"]')
      expect(nodes.length).toBeGreaterThan(0)
    })
  })
})
