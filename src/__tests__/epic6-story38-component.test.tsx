/**
 * Epic 6 - Story #38: Issue Action Buttons - Component Tests
 *
 * Tests for the IssueActions component that provides status change buttons.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IssueActions } from '../components/IssueActions'
import { createMockIssue } from './testHelpers'

describe('Epic 6 - Story #38: IssueActions Component', () => {
  describe('Status: new', () => {
    it('should show "Acknowledge" button for new issues', () => {
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.getByRole('button', { name: /Acknowledge/i })).toBeInTheDocument()
    })

    it('should show "Mark as Fixed" button for new issues', () => {
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.getByRole('button', { name: /Mark as Fixed/i })).toBeInTheDocument()
    })

    it('should show "Ignore" button for new issues', () => {
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.getByRole('button', { name: /Ignore/i })).toBeInTheDocument()
    })

    it('should call onStatusChange with "acknowledged" when Acknowledge clicked', async () => {
      const user = userEvent.setup()
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      const acknowledgeButton = screen.getByRole('button', { name: /Acknowledge/i })
      await user.click(acknowledgeButton)

      expect(onStatusChange).toHaveBeenCalledWith('acknowledged')
    })

    it('should call onStatusChange with "fixed" when Mark as Fixed clicked', async () => {
      const user = userEvent.setup()
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      const fixedButton = screen.getByRole('button', { name: /Mark as Fixed/i })
      await user.click(fixedButton)

      expect(onStatusChange).toHaveBeenCalledWith('fixed')
    })
  })

  describe('Status: acknowledged', () => {
    it('should not show "Acknowledge" button for acknowledged issues', () => {
      const issue = createMockIssue({ id: '1', status: 'acknowledged' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.queryByRole('button', { name: /^Acknowledge$/i })).not.toBeInTheDocument()
    })

    it('should show "Mark as Fixed" button for acknowledged issues', () => {
      const issue = createMockIssue({ id: '1', status: 'acknowledged' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.getByRole('button', { name: /Mark as Fixed/i })).toBeInTheDocument()
    })

    it('should show "Ignore" button for acknowledged issues', () => {
      const issue = createMockIssue({ id: '1', status: 'acknowledged' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.getByRole('button', { name: /Ignore/i })).toBeInTheDocument()
    })
  })

  describe('Status: fixed', () => {
    it('should show "Fixed" chip for fixed issues', () => {
      const issue = createMockIssue({ id: '1', status: 'fixed' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.getByText('Fixed')).toBeInTheDocument()
    })

    it('should not show action buttons for fixed issues', () => {
      const issue = createMockIssue({ id: '1', status: 'fixed' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.queryByRole('button', { name: /Acknowledge/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Mark as Fixed/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Ignore/i })).not.toBeInTheDocument()
    })
  })

  describe('Status: ignored', () => {
    it('should show "Ignored" chip for ignored issues', () => {
      const issue = createMockIssue({ id: '1', status: 'ignored' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.getByText('Ignored')).toBeInTheDocument()
    })

    it('should not show action buttons for ignored issues', () => {
      const issue = createMockIssue({ id: '1', status: 'ignored' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.queryByRole('button', { name: /Acknowledge/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Mark as Fixed/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Ignore/i })).not.toBeInTheDocument()
    })
  })

  describe('Ignore confirmation dialog', () => {
    it('should show confirmation dialog when Ignore clicked', async () => {
      const user = userEvent.setup()
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      const ignoreButton = screen.getByRole('button', { name: /Ignore/i })
      await user.click(ignoreButton)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText(/Ignore This Issue/i)).toBeInTheDocument()
    })

    it('should have Cancel and Ignore buttons in dialog', async () => {
      const user = userEvent.setup()
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      const ignoreButton = screen.getByRole('button', { name: /^Ignore$/i })
      await user.click(ignoreButton)

      const dialog = screen.getByRole('dialog')
      expect(within(dialog).getByRole('button', { name: /Cancel/i })).toBeInTheDocument()
      expect(within(dialog).getByRole('button', { name: /Ignore Issue/i })).toBeInTheDocument()
    })

    it('should close dialog when Cancel clicked', async () => {
      const user = userEvent.setup()
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      const ignoreButton = screen.getByRole('button', { name: /^Ignore$/i })
      await user.click(ignoreButton)

      const dialog = screen.getByRole('dialog')
      const cancelButton = within(dialog).getByRole('button', { name: /Cancel/i })
      await user.click(cancelButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should call onStatusChange with "ignored" when confirmed', async () => {
      const user = userEvent.setup()
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      const ignoreButton = screen.getByRole('button', { name: /^Ignore$/i })
      await user.click(ignoreButton)

      const dialog = screen.getByRole('dialog')
      const confirmButton = within(dialog).getByRole('button', { name: /Ignore Issue/i })
      await user.click(confirmButton)

      expect(onStatusChange).toHaveBeenCalledWith('ignored')
    })

    it('should close dialog after ignoring', async () => {
      const user = userEvent.setup()
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      const ignoreButton = screen.getByRole('button', { name: /^Ignore$/i })
      await user.click(ignoreButton)

      const dialog = screen.getByRole('dialog')
      const confirmButton = within(dialog).getByRole('button', { name: /Ignore Issue/i })
      await user.click(confirmButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Button icons', () => {
    it('should show CheckCircleOutline icon for Acknowledge button', () => {
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      const { container } = render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(container.querySelector('[data-testid="CheckCircleOutlineIcon"]')).toBeInTheDocument()
    })

    it('should show CheckCircle icon for Mark as Fixed button', () => {
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      const { container } = render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(container.querySelector('[data-testid="CheckCircleIcon"]')).toBeInTheDocument()
    })

    it('should show Block icon for Ignore button', () => {
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      const { container } = render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(container.querySelector('[data-testid="BlockIcon"]')).toBeInTheDocument()
    })
  })

  describe('UI structure', () => {
    it('should render actions in Paper component', () => {
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      const { container } = render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(container.querySelector('.MuiPaper-root')).toBeInTheDocument()
    })

    it('should have "Actions" heading', () => {
      const issue = createMockIssue({ id: '1', status: 'new' })
      const onStatusChange = vi.fn()

      render(<IssueActions issue={issue} onStatusChange={onStatusChange} />)

      expect(screen.getByText('Actions')).toBeInTheDocument()
    })
  })
})
