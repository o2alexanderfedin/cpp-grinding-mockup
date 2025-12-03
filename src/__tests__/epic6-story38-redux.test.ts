/**
 * Epic 6 - Story #38: Issue Action Buttons - Redux Tests
 *
 * Tests for Redux state management of issue status updates.
 */

import { describe, it, expect } from 'vitest'
import analysisReducer, {
  updateIssueStatus,
  selectIssueStatus,
  type AnalysisState,
} from '../features/analysis/analysisSlice'
import type { RootState } from '../app/store'

const createInitialState = (): AnalysisState => ({
  status: 'idle' as const,
  progress: 0,
  currentStage: '',
  issues: [],
  selectedIssueId: null,
  selectedFilePath: null,
  severityFilter: 'all' as const,
  sortBy: 'severity' as const,
  searchQuery: '',
  drawerOpen: false,
  issueStatusMap: {},
})

describe('Epic 6 - Story #38: Issue Status Redux', () => {
  it('should handle updateIssueStatus action', () => {
    const initialState = createInitialState()

    const newState = analysisReducer(
      initialState,
      updateIssueStatus({
        issueId: 'issue-1',
        status: 'acknowledged',
        acknowledgedBy: 'demo-user',
      })
    )

    expect(newState.issueStatusMap['issue-1']).toBe('acknowledged')
  })

  it('should update existing issue status', () => {
    const initialState = {
      ...createInitialState(),
      issueStatusMap: {
        'issue-1': 'new' as const,
      },
    }

    const newState = analysisReducer(
      initialState,
      updateIssueStatus({
        issueId: 'issue-1',
        status: 'fixed',
      })
    )

    expect(newState.issueStatusMap['issue-1']).toBe('fixed')
  })

  it('should handle multiple issue status updates', () => {
    let state = createInitialState()

    state = analysisReducer(
      state,
      updateIssueStatus({
        issueId: 'issue-1',
        status: 'acknowledged',
      })
    )

    state = analysisReducer(
      state,
      updateIssueStatus({
        issueId: 'issue-2',
        status: 'fixed',
      })
    )

    state = analysisReducer(
      state,
      updateIssueStatus({
        issueId: 'issue-3',
        status: 'ignored',
      })
    )

    expect(state.issueStatusMap['issue-1']).toBe('acknowledged')
    expect(state.issueStatusMap['issue-2']).toBe('fixed')
    expect(state.issueStatusMap['issue-3']).toBe('ignored')
  })

  it('should have selectIssueStatus selector', () => {
    const state: Partial<RootState> = {
      analysis: {
        ...createInitialState(),
        issueStatusMap: {
          'issue-1': 'acknowledged',
        },
      },
    }

    const status = selectIssueStatus('issue-1')(state as RootState)
    expect(status).toBe('acknowledged')
  })

  it('should return undefined for non-existent issue status', () => {
    const state: Partial<RootState> = {
      analysis: createInitialState(),
    }

    const status = selectIssueStatus('non-existent')(state as RootState)
    expect(status).toBeUndefined()
  })
})
