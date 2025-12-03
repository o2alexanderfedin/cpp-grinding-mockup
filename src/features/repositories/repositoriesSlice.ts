import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import type { Repository } from '../../types/repository'
import { mockRepositories } from '../../data/mockRepositories'
import type { IssueSeverity } from '../../types/issue'

interface RepositoriesState {
  repositories: Repository[]
  selectedRepositoryId: string | null
  selectedFilePath: string | null
  searchQuery: string
  languageFilter: string | null
  severityFilter: IssueSeverity | null
}

// Initial State with mock data
const initialState: RepositoriesState = {
  repositories: mockRepositories,
  selectedRepositoryId: null,
  selectedFilePath: null,
  searchQuery: '',
  languageFilter: null,
  severityFilter: null,
}

// Slice
const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    selectRepository: (state, action: PayloadAction<string>) => {
      state.selectedRepositoryId = action.payload
    },
    selectFile: (state, action: PayloadAction<string>) => {
      state.selectedFilePath = action.payload
    },
    loadRepositories: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setLanguageFilter: (state, action: PayloadAction<string | null>) => {
      state.languageFilter = action.payload
    },
    setSeverityFilter: (state, action: PayloadAction<IssueSeverity | null>) => {
      state.severityFilter = action.payload
    },
  },
})

// Actions
export const {
  selectRepository,
  selectFile,
  loadRepositories,
  setSearchQuery,
  setLanguageFilter,
  setSeverityFilter,
} = repositoriesSlice.actions

// Selectors
export const selectAllRepositories = (state: RootState) => state.repositories.repositories
export const selectSelectedRepositoryId = (state: RootState) =>
  state.repositories.selectedRepositoryId
export const selectSelectedRepository = (state: RootState) => {
  const id = state.repositories.selectedRepositoryId
  if (!id) return null
  return state.repositories.repositories.find(repo => repo.id === id) ?? null
}

export const selectSelectedFilePath = (state: RootState) => state.repositories.selectedFilePath
export const selectSearchQuery = (state: RootState) => state.repositories.searchQuery
export const selectLanguageFilter = (state: RootState) => state.repositories.languageFilter
export const selectSeverityFilter = (state: RootState) => state.repositories.severityFilter

// Filtered repositories selector with memoization
export const selectFilteredRepositories = createSelector(
  [selectAllRepositories, selectSearchQuery, selectLanguageFilter, selectSeverityFilter],
  (repositories, searchQuery, languageFilter, severityFilter) => {
    return repositories.filter(repo => {
      // Search query filter
      const matchesSearch =
        searchQuery === '' ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.owner.toLowerCase().includes(searchQuery.toLowerCase())

      // Language filter
      const matchesLanguage = languageFilter === null || repo.language === languageFilter

      // Severity filter
      const matchesSeverity =
        severityFilter === null ||
        (severityFilter === 'critical' && repo.criticalIssues > 0) ||
        (severityFilter === 'high' && repo.highIssues > 0) ||
        (severityFilter === 'medium' && repo.mediumIssues > 0) ||
        (severityFilter === 'low' && repo.lowIssues > 0)

      return matchesSearch && matchesLanguage && matchesSeverity
    })
  },
)

// Reducer
export default repositoriesSlice.reducer
