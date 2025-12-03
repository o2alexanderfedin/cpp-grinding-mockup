import { createSlice, createAsyncThunk, createSelector, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import type { Issue, IssueSeverity, IssueStatus } from '../../types/issue'
import { issueMap } from '../../data/mockIssues'

type AnalysisStatus = 'idle' | 'analyzing' | 'complete' | 'error'
type SortBy = 'severity' | 'line' | 'category'

export interface AnalysisState {
  status: AnalysisStatus
  progress: number // 0-100
  currentStage: string
  issues: Issue[]
  selectedIssueId: string | null
  selectedFilePath: string | null
  severityFilter: IssueSeverity | 'all'
  sortBy: SortBy
  searchQuery: string
  drawerOpen: boolean
  issueStatusMap: Record<string, IssueStatus>
}

// Initial State
const initialState: AnalysisState = {
  status: 'idle',
  progress: 0,
  currentStage: '',
  issues: [],
  selectedIssueId: null,
  selectedFilePath: null,
  severityFilter: 'all',
  sortBy: 'severity',
  searchQuery: '',
  drawerOpen: false,
  issueStatusMap: {},
}

// Async Thunks
export const runAnalysis = createAsyncThunk(
  'analysis/run',
  async (repositoryId: string, { getState, dispatch }) => {
    // Simulate analysis with progress stages
    const stages = [
      { progress: 20, stage: 'Parsing source files...', delay: 500 },
      { progress: 40, stage: 'Building AST...', delay: 700 },
      { progress: 60, stage: 'Generating SMT constraints...', delay: 800 },
      { progress: 80, stage: 'Running Z3 solver...', delay: 1000 },
      { progress: 100, stage: 'Analysis complete', delay: 500 },
    ]

    for (const { progress, stage, delay } of stages) {
      await new Promise(resolve => setTimeout(resolve, delay))
      dispatch(updateProgress({ progress, stage }))
    }

    // Get issues from repository
    const state = getState() as RootState
    const repo = state.repositories.repositories.find(r => r.id === repositoryId)

    if (!repo) {
      throw new Error('Repository not found')
    }

    // Convert issue IDs to full Issue objects
    const issues = repo.issues.map(id => issueMap.get(id)).filter((issue): issue is Issue => issue !== undefined)

    return issues
  }
)

// Slice
const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    selectIssue: (state, action: PayloadAction<string>) => {
      state.selectedIssueId = action.payload
    },
    clearSelection: state => {
      state.selectedIssueId = null
    },
    selectFile: (state, action: PayloadAction<string>) => {
      state.selectedFilePath = action.payload
      state.selectedIssueId = null // Clear issue selection when file changes
    },
    updateProgress: (state, action: PayloadAction<{ progress: number; stage: string }>) => {
      state.progress = action.payload.progress
      state.currentStage = action.payload.stage
    },
    setSeverityFilter: (state, action: PayloadAction<IssueSeverity | 'all'>) => {
      state.severityFilter = action.payload
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    openDrawer: state => {
      state.drawerOpen = true
    },
    closeDrawer: state => {
      state.drawerOpen = false
    },
    toggleDrawer: state => {
      state.drawerOpen = !state.drawerOpen
    },
    updateIssueStatus: (
      state,
      action: PayloadAction<{
        issueId: string
        status: IssueStatus
        acknowledgedBy?: string
      }>
    ) => {
      const { issueId, status } = action.payload
      state.issueStatusMap[issueId] = status
    },
  },
  extraReducers: builder => {
    builder
      .addCase(runAnalysis.pending, state => {
        state.status = 'analyzing'
        state.progress = 0
        state.currentStage = 'Starting analysis...'
        state.issues = []
        state.selectedIssueId = null
      })
      .addCase(runAnalysis.fulfilled, (state, action) => {
        state.status = 'complete'
        state.progress = 100
        state.currentStage = 'Analysis complete'
        state.issues = action.payload
        state.drawerOpen = true
      })
      .addCase(runAnalysis.rejected, state => {
        state.status = 'error'
        state.progress = 0
        state.currentStage = 'Analysis failed'
      })
  },
})

// Actions
export const {
  selectIssue,
  clearSelection,
  selectFile,
  updateProgress,
  setSeverityFilter,
  setSortBy,
  setSearchQuery,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  updateIssueStatus,
} = analysisSlice.actions

// Selectors
export const selectAnalysisStatus = (state: RootState) => state.analysis.status
export const selectAnalysisProgress = (state: RootState) => state.analysis.progress
export const selectAnalysisStage = (state: RootState) => state.analysis.currentStage
export const selectAllIssues = (state: RootState) => state.analysis.issues
export const selectSelectedIssueId = (state: RootState) => state.analysis.selectedIssueId
export const selectSelectedFilePath = (state: RootState) => state.analysis.selectedFilePath
export const selectSeverityFilter = (state: RootState) => state.analysis.severityFilter
export const selectSortBy = (state: RootState) => state.analysis.sortBy
export const selectSearchQuery = (state: RootState) => state.analysis.searchQuery
export const selectDrawerOpen = (state: RootState) => state.analysis.drawerOpen

export const selectSelectedIssue = (state: RootState) => {
  const id = state.analysis.selectedIssueId
  if (!id) return null
  return state.analysis.issues.find(issue => issue.id === id) ?? null
}

// Filter issues by selected file
export const selectIssuesForFile = createSelector(
  [selectAllIssues, selectSelectedFilePath],
  (issues, filePath) => {
    if (!filePath) return []
    return issues.filter(issue => issue.file === filePath)
  }
)

// Filter and sort issues
export const selectFilteredIssues = createSelector(
  [selectIssuesForFile, selectSeverityFilter, selectSortBy, selectSearchQuery],
  (issues, severityFilter, sortBy, searchQuery) => {
    let filtered = issues

    // Filter by severity
    if (severityFilter !== 'all') {
      filtered = filtered.filter(i => i.severity === severityFilter)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        i =>
          i.title.toLowerCase().includes(query) ||
          i.category.toLowerCase().includes(query) ||
          i.description.toLowerCase().includes(query)
      )
    }

    // Sort
    const severityOrder: Record<IssueSeverity, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3,
    }

    return [...filtered].sort((a, b) => {
      if (sortBy === 'severity') {
        return severityOrder[a.severity] - severityOrder[b.severity]
      } else if (sortBy === 'line') {
        return a.line - b.line
      } else {
        // sort by category
        return a.category.localeCompare(b.category)
      }
    })
  }
)

// Select issue status from status map
export const selectIssueStatus = (issueId: string) => (state: RootState) => {
  return state.analysis.issueStatusMap[issueId]
}

// Reducer
export default analysisSlice.reducer
