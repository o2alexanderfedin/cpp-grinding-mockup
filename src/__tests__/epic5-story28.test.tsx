import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IssueList } from '../components/IssueList'
import { IssueListItem } from '../components/IssueListItem'
import type { Issue } from '../types/issue'

const mockIssues: Issue[] = [
  {
    id: 'test-issue-1',
    severity: 'critical',
    category: 'memory-safety',
    file: '/src/test.cpp',
    line: 42,
    title: 'Buffer overflow in processData',
    description: 'Test issue 1',
    codeSnippet: 'void test() {}',
    smtLibProof: '(check-sat)',
    simplifiedProof: 'Test proof',
    explanation: 'Test explanation',
    suggestedFix: 'Test fix',
  },
  {
    id: 'test-issue-2',
    severity: 'high',
    category: 'concurrency',
    file: '/src/test.cpp',
    line: 100,
    title: 'Race condition in updateState',
    description: 'Test issue 2',
    codeSnippet: 'void test2() {}',
    smtLibProof: '(check-sat)',
    simplifiedProof: 'Test proof 2',
    explanation: 'Test explanation 2',
    suggestedFix: 'Test fix 2',
  },
  {
    id: 'test-issue-3',
    severity: 'medium',
    category: 'undefined-behavior',
    file: '/src/test.cpp',
    line: 150,
    title: 'Integer overflow in calculate',
    description: 'Test issue 3',
    codeSnippet: 'void test3() {}',
    smtLibProof: '(check-sat)',
    simplifiedProof: 'Test proof 3',
    explanation: 'Test explanation 3',
    suggestedFix: 'Test fix 3',
  },
]

describe('Epic 5 - Story #28: Issue List Component', () => {
  describe('IssueListItem', () => {
    it('should render issue with severity badge', () => {
      const onSelect = vi.fn()
      render(<IssueListItem issue={mockIssues[0]!} isSelected={false} onSelect={onSelect} />)

      expect(screen.getByText('critical')).toBeInTheDocument()
      expect(screen.getByText('Buffer overflow in processData')).toBeInTheDocument()
    })

    it('should render category and line number', () => {
      const onSelect = vi.fn()
      render(<IssueListItem issue={mockIssues[0]!} isSelected={false} onSelect={onSelect} />)

      expect(screen.getByText(/memory-safety/i)).toBeInTheDocument()
      expect(screen.getByText(/Line 42/i)).toBeInTheDocument()
    })

    it('should call onSelect when clicked', async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      render(<IssueListItem issue={mockIssues[0]!} isSelected={false} onSelect={onSelect} />)

      const listItem = screen.getByRole('button')
      await user.click(listItem)

      expect(onSelect).toHaveBeenCalledTimes(1)
    })

    it('should show selected state with border', () => {
      const onSelect = vi.fn()
      const { container } = render(
        <IssueListItem issue={mockIssues[0]!} isSelected={true} onSelect={onSelect} />
      )

      // Check that selected class is applied
      const listItem = container.querySelector('.Mui-selected')
      expect(listItem).toBeInTheDocument()
    })

    it('should display different severity colors', () => {
      const onSelect = vi.fn()

      const { rerender } = render(
        <IssueListItem issue={mockIssues[0]!} isSelected={false} onSelect={onSelect} />
      )
      expect(screen.getByText('critical')).toBeInTheDocument()

      rerender(<IssueListItem issue={mockIssues[1]!} isSelected={false} onSelect={onSelect} />)
      expect(screen.getByText('high')).toBeInTheDocument()

      rerender(<IssueListItem issue={mockIssues[2]!} isSelected={false} onSelect={onSelect} />)
      expect(screen.getByText('medium')).toBeInTheDocument()
    })
  })

  describe('IssueList', () => {
    it('should render all issues', () => {
      const onSelectIssue = vi.fn()
      render(<IssueList issues={mockIssues} selectedIssueId={null} onSelectIssue={onSelectIssue} />)

      expect(screen.getByText('Buffer overflow in processData')).toBeInTheDocument()
      expect(screen.getByText('Race condition in updateState')).toBeInTheDocument()
      expect(screen.getByText('Integer overflow in calculate')).toBeInTheDocument()
    })

    it('should show empty state when no issues', () => {
      const onSelectIssue = vi.fn()
      render(<IssueList issues={[]} selectedIssueId={null} onSelectIssue={onSelectIssue} />)

      expect(screen.getByText(/Select a file to view issues/i)).toBeInTheDocument()
    })

    it('should call onSelectIssue with correct ID when issue clicked', async () => {
      const user = userEvent.setup()
      const onSelectIssue = vi.fn()
      render(<IssueList issues={mockIssues} selectedIssueId={null} onSelectIssue={onSelectIssue} />)

      const firstIssue = screen.getByText('Buffer overflow in processData')
      await user.click(firstIssue)

      expect(onSelectIssue).toHaveBeenCalledWith('test-issue-1')
    })

    it('should highlight selected issue', () => {
      const onSelectIssue = vi.fn()
      const { container } = render(
        <IssueList issues={mockIssues} selectedIssueId="test-issue-2" onSelectIssue={onSelectIssue} />
      )

      const selectedItems = container.querySelectorAll('.Mui-selected')
      expect(selectedItems).toHaveLength(1)
    })

    it('should render issues sorted by severity', () => {
      const onSelectIssue = vi.fn()
      render(<IssueList issues={mockIssues} selectedIssueId={null} onSelectIssue={onSelectIssue} />)

      const issues = screen.getAllByRole('button')

      // First should be critical (index 0)
      expect(issues[0]).toHaveTextContent('critical')
      // Second should be high (index 1)
      expect(issues[1]).toHaveTextContent('high')
      // Third should be medium (index 2)
      expect(issues[2]).toHaveTextContent('medium')
    })
  })
})
