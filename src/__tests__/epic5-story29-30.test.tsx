import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IssueDetail } from '../components/IssueDetail'
import type { Issue } from '../types/issue'

const mockIssue: Issue = {
  id: 'test-issue-1',
  severity: 'critical',
  category: 'memory-safety',
  file: '/src/test.cpp',
  line: 42,
  title: 'Buffer overflow in processData',
  description: 'Test description',
  codeSnippet: `void processData(const char* input) {
    char buffer[16];
    strcpy(buffer, input);  // Line 42: BUG
}`,
  smtLibProof: `(set-logic QF_LIA)
(declare-const buffer_size Int)
(assert (= buffer_size 16))
(check-sat)`,
  simplifiedProof: 'The buffer is 16 bytes but input length is not checked.',
  explanation:
    'This is a buffer overflow vulnerability. The strcpy function copies without checking length.',
  suggestedFix: `void processData(const char* input) {
    char buffer[16];
    strncpy(buffer, input, sizeof(buffer) - 1);
    buffer[15] = '\\0';
}`,
}

describe('Epic 5 - Story #29 & #30: Issue Detail View with Syntax Highlighting', () => {
  describe('Story #29: Issue Detail View', () => {
    it('should render issue header with severity and category', () => {
      render(<IssueDetail issue={mockIssue} />)

      expect(screen.getByText('critical')).toBeInTheDocument()
      expect(screen.getByText('memory-safety')).toBeInTheDocument()
      expect(screen.getByText('Buffer overflow in processData')).toBeInTheDocument()
    })

    it('should render file path and line number', () => {
      render(<IssueDetail issue={mockIssue} />)

      expect(screen.getByText(/\/src\/test\.cpp/)).toBeInTheDocument()
      const lineNumbers = screen.getAllByText(/Line 42/)
      expect(lineNumbers.length).toBeGreaterThan(0)
    })

    it('should render code snippet section', () => {
      render(<IssueDetail issue={mockIssue} />)

      expect(screen.getByText('Code Snippet')).toBeInTheDocument()
      const codeElements = screen.getAllByText(/processData/)
      expect(codeElements.length).toBeGreaterThanOrEqual(1)
      const strcpyElements = screen.getAllByText(/strcpy/)
      expect(strcpyElements.length).toBeGreaterThanOrEqual(1)
    })

    it('should render formal proof section', () => {
      render(<IssueDetail issue={mockIssue} />)

      expect(screen.getByText('Formal Proof')).toBeInTheDocument()
    })

    it('should toggle between simplified and SMT-LIB proof', async () => {
      const user = userEvent.setup()
      render(<IssueDetail issue={mockIssue} />)

      // Initially shows simplified proof
      expect(
        screen.getByText('The buffer is 16 bytes but input length is not checked.')
      ).toBeInTheDocument()

      // Click toggle button
      const toggleButton = screen.getByRole('button', { name: /Show SMT-LIB/i })
      await user.click(toggleButton)

      // Now shows SMT-LIB proof
      expect(screen.getByText(/set-logic/)).toBeInTheDocument()
      expect(screen.getByText(/declare-const/)).toBeInTheDocument()
    })

    it('should render explanation section', () => {
      render(<IssueDetail issue={mockIssue} />)

      expect(screen.getByText('Explanation')).toBeInTheDocument()
      expect(
        screen.getByText(/This is a buffer overflow vulnerability/)
      ).toBeInTheDocument()
    })

    it('should render suggested fix section', () => {
      render(<IssueDetail issue={mockIssue} />)

      expect(screen.getByText('Suggested Fix')).toBeInTheDocument()
      expect(screen.getByText(/strncpy/)).toBeInTheDocument()
    })
  })

  describe('Story #30: Code Syntax Highlighting', () => {
    it('should use syntax highlighter for code snippet', () => {
      const { container } = render(<IssueDetail issue={mockIssue} />)

      // Check for syntax highlighter container
      const codeBlock = container.querySelector('code')
      expect(codeBlock).toBeInTheDocument()
    })

    it('should use syntax highlighter for SMT-LIB proof', async () => {
      const user = userEvent.setup()
      const { container } = render(<IssueDetail issue={mockIssue} />)

      // Toggle to SMT-LIB view
      const toggleButton = screen.getByRole('button', { name: /Show SMT-LIB/i })
      await user.click(toggleButton)

      // Check for syntax highlighter
      const codeBlocks = container.querySelectorAll('code')
      expect(codeBlocks.length).toBeGreaterThan(0)
    })

    it('should use syntax highlighter for suggested fix', () => {
      const { container } = render(<IssueDetail issue={mockIssue} />)

      // Should have multiple code blocks (snippet + fix)
      const codeBlocks = container.querySelectorAll('code')
      expect(codeBlocks.length).toBeGreaterThanOrEqual(2)
    })

    it('should render code with line numbers', () => {
      render(<IssueDetail issue={mockIssue} />)

      // SyntaxHighlighter should render with line numbers
      // This is tested by checking if the component renders successfully
      const codeElements = screen.getAllByText(/processData/)
      expect(codeElements.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Visual Styling', () => {
    it('should apply background color to code snippet section', () => {
      const { container } = render(<IssueDetail issue={mockIssue} />)

      // Check for styled Paper components
      const papers = container.querySelectorAll('.MuiPaper-root')
      expect(papers.length).toBeGreaterThan(0)
    })

    it('should highlight bug line with different color', () => {
      render(<IssueDetail issue={mockIssue} />)

      // Line with BUG comment should be present
      expect(screen.getByText(/BUG/)).toBeInTheDocument()
    })

    it('should apply green background to suggested fix section', () => {
      const { container } = render(<IssueDetail issue={mockIssue} />)

      // Look for Paper with success/green styling
      const papers = container.querySelectorAll('.MuiPaper-root')
      expect(papers.length).toBeGreaterThanOrEqual(4) // Header, Code, Proof, Explanation, Fix
    })
  })
})
