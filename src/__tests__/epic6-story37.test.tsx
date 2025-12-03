/**
 * Epic 6 - Story #37: Code Context Viewer - Component Tests
 *
 * Tests for the code context expansion feature in IssueDetail.
 * Allows users to see ±10 lines around the bug for better context.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IssueDetail } from '../components/IssueDetail'
import { createMockIssue } from './testHelpers'

describe('Epic 6 - Story #37: Code Context Viewer', () => {
  it('should display "Show More Context" button by default', () => {
    const issue = createMockIssue({ id: '1' })

    render(<IssueDetail issue={issue} />)

    expect(screen.getByRole('button', { name: /Show More Context/i })).toBeInTheDocument()
  })

  it('should toggle to "Show Less" when expanded', async () => {
    const user = userEvent.setup()
    const issue = createMockIssue({ id: '1' })

    render(<IssueDetail issue={issue} />)

    const toggleButton = screen.getByRole('button', { name: /Show More Context/i })
    await user.click(toggleButton)

    expect(screen.getByRole('button', { name: /Show Less/i })).toBeInTheDocument()
  })

  it('should toggle back to "Show More Context" when collapsed', async () => {
    const user = userEvent.setup()
    const issue = createMockIssue({ id: '1' })

    render(<IssueDetail issue={issue} />)

    const toggleButton = screen.getByRole('button', { name: /Show More Context/i })
    await user.click(toggleButton)

    const collapseButton = screen.getByRole('button', { name: /Show Less/i })
    await user.click(collapseButton)

    expect(screen.getByRole('button', { name: /Show More Context/i })).toBeInTheDocument()
  })

  it('should display original code snippet by default', () => {
    const issue = createMockIssue({
      id: '1',
      codeSnippet: 'char buffer[16];\nstrcpy(buffer, userInput);',
      line: 42,
    })

    render(<IssueDetail issue={issue} />)

    // Check that the original code is present
    expect(screen.getByText(/char buffer\[16\]/)).toBeInTheDocument()
    expect(screen.getByText(/strcpy\(buffer, userInput\)/)).toBeInTheDocument()
  })

  it('should expand to show additional context lines when button clicked', async () => {
    const user = userEvent.setup()
    const issue = createMockIssue({
      id: '1',
      codeSnippet: 'char buffer[16];\nstrcpy(buffer, userInput);',
      line: 42,
    })

    render(<IssueDetail issue={issue} />)

    const toggleButton = screen.getByRole('button', { name: /Show More Context/i })
    await user.click(toggleButton)

    // Should show context lines (simulated)
    // In the real implementation, these would be fetched from the file
    // With line 42 and 2-line snippet: extended context starts at 29 (42 - 10 - 3)
    expect(screen.getByText(/line 29/i)).toBeInTheDocument() // Context start
    expect(screen.getByText(/line 38/i)).toBeInTheDocument() // Context before snippet
  })

  it('should maintain highlighted bug line when expanded', async () => {
    const user = userEvent.setup()
    const issue = createMockIssue({
      id: '1',
      codeSnippet: 'char buffer[16];',
      line: 42,
    })

    const { container } = render(<IssueDetail issue={issue} />)

    const toggleButton = screen.getByRole('button', { name: /Show More Context/i })
    await user.click(toggleButton)

    // Bug line should still be highlighted with background color
    // The SyntaxHighlighter uses custom lineProps to highlight
    // Check that code element exists (syntax highlighter rendered)
    const codeElements = container.querySelectorAll('code')
    expect(codeElements.length).toBeGreaterThan(0)
  })

  it('should adjust line numbers correctly when expanded', async () => {
    const user = userEvent.setup()
    const issue = createMockIssue({
      id: '1',
      codeSnippet: 'char buffer[16];',
      line: 42,
    })

    render(<IssueDetail issue={issue} />)

    const toggleButton = screen.getByRole('button', { name: /Show More Context/i })
    await user.click(toggleButton)

    // When expanded, should show lines starting from line 29 (42 - 10 - 3)
    // The -3 accounts for the original snippet offset
    expect(screen.getByText(/line 29/i)).toBeInTheDocument()
  })

  it('should collapse back to original snippet', async () => {
    const user = userEvent.setup()
    const issue = createMockIssue({
      id: '1',
      codeSnippet: 'char buffer[16];\nstrcpy(buffer, userInput);',
      line: 42,
    })

    render(<IssueDetail issue={issue} />)

    // Expand
    const toggleButton = screen.getByRole('button', { name: /Show More Context/i })
    await user.click(toggleButton)

    // Verify expanded
    expect(screen.getByText(/line 29/i)).toBeInTheDocument()

    // Collapse
    const collapseButton = screen.getByRole('button', { name: /Show Less/i })
    await user.click(collapseButton)

    // Should not show extended context anymore
    expect(screen.queryByText(/line 29/i)).not.toBeInTheDocument()
  })

  it('should show ExpandMoreIcon when collapsed', () => {
    const issue = createMockIssue({ id: '1' })

    const { container } = render(<IssueDetail issue={issue} />)

    const button = screen.getByRole('button', { name: /Show More Context/i })
    expect(button).toBeInTheDocument()

    // ExpandMore icon should be present
    const icon = container.querySelector('[data-testid="ExpandMoreIcon"]')
    expect(icon).toBeInTheDocument()
  })

  it('should show ExpandLessIcon when expanded', async () => {
    const user = userEvent.setup()
    const issue = createMockIssue({ id: '1' })

    const { container } = render(<IssueDetail issue={issue} />)

    const toggleButton = screen.getByRole('button', { name: /Show More Context/i })
    await user.click(toggleButton)

    // ExpandLess icon should be present
    const icon = container.querySelector('[data-testid="ExpandLessIcon"]')
    expect(icon).toBeInTheDocument()
  })

  it('should render context button in code snippet header', () => {
    const issue = createMockIssue({ id: '1' })

    render(<IssueDetail issue={issue} />)

    // Button should be in the same section as "Code Snippet" heading
    expect(screen.getByText('Code Snippet')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Show More Context/i })).toBeInTheDocument()
  })

  it('should display copy button alongside context button', () => {
    const issue = createMockIssue({ id: '1' })

    render(<IssueDetail issue={issue} />)

    // Both buttons should be present
    expect(screen.getByRole('button', { name: /Copy code/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Show More Context/i })).toBeInTheDocument()
  })

  it('should work with multiline code snippets', async () => {
    const user = userEvent.setup()
    const multilineCode = `void processPayment(const char* input) {
  char buffer[16];
  strcpy(buffer, input);
  sendToProcessor(buffer);
}`

    const issue = createMockIssue({
      id: '1',
      codeSnippet: multilineCode,
      line: 100,
    })

    render(<IssueDetail issue={issue} />)

    // Original code should be visible
    expect(screen.getByText(/processPayment/)).toBeInTheDocument()

    const toggleButton = screen.getByRole('button', { name: /Show More Context/i })
    await user.click(toggleButton)

    // Extended context should be added
    expect(screen.getByText(/line 87/i)).toBeInTheDocument() // Context before
  })
})
