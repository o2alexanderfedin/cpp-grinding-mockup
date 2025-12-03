import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import type { Issue } from '../../types/issue'

type AnalysisStatus = 'idle' | 'analyzing' | 'complete' | 'error'

interface AnalysisState {
  status: AnalysisStatus
  issues: Issue[]
  selectedIssueId: string | null
  drawerOpen: boolean
}

// Initial State
const initialState: AnalysisState = {
  status: 'idle',
  issues: [],
  selectedIssueId: null,
  drawerOpen: false,
}

// Async Thunks
export const runAnalysis = createAsyncThunk(
  'analysis/run',
  async (repositoryId: string, { getState }) => {
    // Simulate analysis delay (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000))

    // In real app, this would call the verification engine
    // For now, return mock issues from the repository
    const state = getState() as RootState
    const repo = state.repositories.repositories.find(r => r.id === repositoryId)

    if (!repo) {
      throw new Error('Repository not found')
    }

    return repo.issues
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
    openDrawer: state => {
      state.drawerOpen = true
    },
    closeDrawer: state => {
      state.drawerOpen = false
    },
    toggleDrawer: state => {
      state.drawerOpen = !state.drawerOpen
    },
  },
  extraReducers: builder => {
    builder
      .addCase(runAnalysis.pending, state => {
        state.status = 'analyzing'
        state.issues = []
        state.selectedIssueId = null
      })
      .addCase(runAnalysis.fulfilled, state => {
        state.status = 'complete'
        // Issues will be populated from a separate slice or store
        // For now, we just open the drawer
        state.drawerOpen = true
      })
      .addCase(runAnalysis.rejected, state => {
        state.status = 'error'
      })
  },
})

// Actions
export const { selectIssue, clearSelection, openDrawer, closeDrawer, toggleDrawer } =
  analysisSlice.actions

// Selectors
export const selectAnalysisStatus = (state: RootState) => state.analysis.status
export const selectAllIssues = (state: RootState) => state.analysis.issues
export const selectSelectedIssueId = (state: RootState) => state.analysis.selectedIssueId
export const selectSelectedIssue = (state: RootState) => {
  const id = state.analysis.selectedIssueId
  if (!id) return null
  return state.analysis.issues.find(issue => issue.id === id) ?? null
}
export const selectDrawerOpen = (state: RootState) => state.analysis.drawerOpen

// Reducer
export default analysisSlice.reducer
