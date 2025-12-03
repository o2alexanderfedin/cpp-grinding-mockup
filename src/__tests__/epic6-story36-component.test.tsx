/**
 * Epic 6 - Story #36: Related Issues Suggestions - Component Tests
 *
 * Tests for the RelatedIssues component that displays similar issues
 * and allows navigation between them.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RelatedIssues } from '../components/RelatedIssues'
import { createMockIssue } from './testHelpers'

describe('Epic 6 - Story #36: RelatedIssues Component', () => {
  it('should render related issues when available', () => {
    const currentIssue = createMockIssue({
      id: '1',
      file: '/src/PaymentProcessor.cpp',
      line: 100,
      category: 'memory-safety',
      severity: 'critical',
    })

    const allIssues = [
      currentIssue,
      createMockIssue({
        id: '2',
        file: '/src/PaymentProcessor.cpp',
        line: 105,
        title: 'Buffer overflow in validation',
        category: 'memory-safety',
        severity: 'high',
      }),
      createMockIssue({
        id: '3',
        file: '/src/PaymentProcessor.cpp',
        line: 200,
        title: 'Race condition in transaction',
        category: 'concurrency',
        severity: 'critical',
      }),
    ]

    const onSelectIssue = vi.fn()

    render(<RelatedIssues currentIssue={currentIssue} allIssues={allIssues} onSelectIssue={onSelectIssue} />)

    expect(screen.getByText(/Related Issues/i)).toBeInTheDocument()
    expect(screen.getByText('Buffer overflow in validation')).toBeInTheDocument()
    expect(screen.getByText('Race condition in transaction')).toBeInTheDocument()
  })

  it('should show issue count in header', () => {
    const currentIssue = createMockIssue({ id: '1', file: '/src/test.cpp' })
    const allIssues = [
      currentIssue,
      createMockIssue({ id: '2', file: '/src/test.cpp' }),
      createMockIssue({ id: '3', file: '/src/test.cpp' }),
    ]

    const onSelectIssue = vi.fn()

    render(<RelatedIssues currentIssue={currentIssue} allIssues={allIssues} onSelectIssue={onSelectIssue} />)

    expect(screen.getByText(/Related Issues \(2\)/i)).toBeInTheDocument()
  })

  it('should display severity chip for each issue', () => {
    const currentIssue = createMockIssue({ id: '1', file: '/src/test.cpp' })
    const allIssues = [
      currentIssue,
      createMockIssue({ id: '2', file: '/src/test.cpp', severity: 'critical' }),
      createMockIssue({ id: '3', file: '/src/test.cpp', severity: 'high' }),
    ]

    const onSelectIssue = vi.fn()

    render(<RelatedIssues currentIssue={currentIssue} allIssues={allIssues} onSelectIssue={onSelectIssue} />)

    expect(screen.getByText('critical')).toBeInTheDocument()
    expect(screen.getByText('high')).toBeInTheDocument()
  })

  it('should display file location and category', () => {
    const currentIssue = createMockIssue({ id: '1', file: '/src/test.cpp', line: 100 })
    const allIssues = [
      currentIssue,
      createMockIssue({
        id: '2',
        file: '/src/PaymentProcessor.cpp',
        line: 42,
        category: 'concurrency',
      }),
    ]

    const onSelectIssue = vi.fn()

    render(<RelatedIssues currentIssue={currentIssue} allIssues={allIssues} onSelectIssue={onSelectIssue} />)

    expect(screen.getByText(/PaymentProcessor\.cpp:42/i)).toBeInTheDocument()
    expect(screen.getByText(/concurrency/i)).toBeInTheDocument()
  })

  it('should call onSelectIssue when issue is clicked', async () => {
    const user = userEvent.setup()
    const currentIssue = createMockIssue({ id: '1', file: '/src/test.cpp' })
    const allIssues = [
      currentIssue,
      createMockIssue({ id: '2', file: '/src/test.cpp', title: 'Related Issue 1' }),
    ]

    const onSelectIssue = vi.fn()

    render(<RelatedIssues currentIssue={currentIssue} allIssues={allIssues} onSelectIssue={onSelectIssue} />)

    const issueItem = screen.getByText('Related Issue 1').closest('li')
    expect(issueItem).toBeTruthy()
    await user.click(issueItem!)

    expect(onSelectIssue).toHaveBeenCalledWith('2')
  })

  it('should limit to 5 related issues', () => {
    const currentIssue = createMockIssue({ id: '1', file: '/src/test.cpp' })
    const allIssues = [
      currentIssue,
      ...Array.from({ length: 10 }, (_, i) =>
        createMockIssue({
          id: `${i + 2}`,
          file: '/src/test.cpp',
          title: `Issue ${i + 2}`,
        })
      ),
    ]

    const onSelectIssue = vi.fn()

    render(<RelatedIssues currentIssue={currentIssue} allIssues={allIssues} onSelectIssue={onSelectIssue} />)

    // Should show "Related Issues (5)"
    expect(screen.getByText(/Related Issues \(5\)/i)).toBeInTheDocument()

    // Should have exactly 5 list items
    const list = screen.getByRole('list')
    const items = list.querySelectorAll('li')
    expect(items).toHaveLength(5)
  })

  it('should not render when no related issues found', () => {
    const currentIssue = createMockIssue({
      id: '1',
      file: '/src/file1.cpp',
      category: 'memory-safety',
      severity: 'critical',
    })

    const allIssues = [
      currentIssue,
      createMockIssue({
        id: '2',
        file: '/src/file2.cpp',
        category: 'type-safety',
        severity: 'low',
      }),
    ]

    const onSelectIssue = vi.fn()

    const { container } = render(
      <RelatedIssues currentIssue={currentIssue} allIssues={allIssues} onSelectIssue={onSelectIssue} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should sort issues by relevance', () => {
    const currentIssue = createMockIssue({
      id: '1',
      file: '/src/PaymentProcessor.cpp',
      line: 100,
      category: 'memory-safety',
      severity: 'critical',
    })

    const allIssues = [
      currentIssue,
      createMockIssue({
        id: 'low-relevance',
        file: '/src/other.cpp',
        category: 'type-safety',
        severity: 'low',
        title: 'Low Relevance',
      }),
      createMockIssue({
        id: 'high-relevance',
        file: '/src/PaymentProcessor.cpp',
        line: 105,
        category: 'memory-safety',
        severity: 'critical',
        title: 'High Relevance',
      }),
      createMockIssue({
        id: 'medium-relevance',
        file: '/src/PaymentProcessor.cpp',
        line: 200,
        category: 'concurrency',
        severity: 'high',
        title: 'Medium Relevance',
      }),
    ]

    const onSelectIssue = vi.fn()

    render(<RelatedIssues currentIssue={currentIssue} allIssues={allIssues} onSelectIssue={onSelectIssue} />)

    const list = screen.getByRole('list')
    const items = Array.from(list.querySelectorAll('li'))

    // First item should be the most relevant
    expect(within(items[0]!).getByText('High Relevance')).toBeInTheDocument()
    // Second should be medium relevance
    expect(within(items[1]!).getByText('Medium Relevance')).toBeInTheDocument()
  })

  it('should render with proper Material-UI components', () => {
    const currentIssue = createMockIssue({ id: '1', file: '/src/test.cpp' })
    const allIssues = [
      currentIssue,
      createMockIssue({ id: '2', file: '/src/test.cpp', title: 'Related Issue' }),
    ]

    const onSelectIssue = vi.fn()

    const { container } = render(
      <RelatedIssues currentIssue={currentIssue} allIssues={allIssues} onSelectIssue={onSelectIssue} />
    )

    // Should be wrapped in Paper component
    expect(container.querySelector('.MuiPaper-root')).toBeInTheDocument()

    // Should have List component
    expect(screen.getByRole('list')).toBeInTheDocument()
  })
})
