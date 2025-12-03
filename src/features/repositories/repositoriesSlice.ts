import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import type { Repository } from '../../types/repository'

interface RepositoriesState {
  repositories: Repository[]
  selectedRepositoryId: string | null
}

// Initial State (will be populated with mock data)
const initialState: RepositoriesState = {
  repositories: [],
  selectedRepositoryId: null,
}

// Slice
const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    selectRepository: (state, action: PayloadAction<string>) => {
      state.selectedRepositoryId = action.payload
    },
    loadRepositories: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload
    },
  },
})

// Actions
export const { selectRepository, loadRepositories } = repositoriesSlice.actions

// Selectors
export const selectAllRepositories = (state: RootState) => state.repositories.repositories
export const selectSelectedRepositoryId = (state: RootState) =>
  state.repositories.selectedRepositoryId
export const selectSelectedRepository = (state: RootState) => {
  const id = state.repositories.selectedRepositoryId
  if (!id) return null
  return state.repositories.repositories.find(repo => repo.id === id) ?? null
}

// Reducer
export default repositoriesSlice.reducer
