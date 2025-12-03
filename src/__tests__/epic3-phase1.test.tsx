import { describe, it, expect } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import repositoriesReducer, {
  selectRepository,
  setSearchQuery,
  setLanguageFilter,
  setSeverityFilter,
  selectAllRepositories,
  selectSelectedRepository,
  selectFilteredRepositories,
  selectSearchQuery,
  selectLanguageFilter,
  selectSeverityFilter,
} from '../features/repositories/repositoriesSlice'
import connectionReducer from '../features/connection/connectionSlice'
import analysisReducer from '../features/analysis/analysisSlice'
import { mockRepositories } from '../data/mockRepositories'
import type { RootState } from '../app/store'

const createTestStore = () =>
  configureStore({
    reducer: {
      connection: connectionReducer,
      repositories: repositoriesReducer,
      analysis: analysisReducer,
    },
  })

describe('Epic 3 Phase 1: Mock Data and Redux Integration', () => {
  describe('Mock Repository Data', () => {
    it('should have 2 repositories', () => {
      expect(mockRepositories).toHaveLength(2)
    })

    it('should have stripe/payment-gateway repository', () => {
      const repo = mockRepositories.find(r => r.id === 'repo-1')
      expect(repo).toBeDefined()
      expect(repo?.owner).toBe('stripe')
      expect(repo?.name).toBe('payment-gateway')
      expect(repo?.language).toBe('C++')
    })

    it('should have meta/compiler-optimizer repository', () => {
      const repo = mockRepositories.find(r => r.id === 'repo-2')
      expect(repo).toBeDefined()
      expect(repo?.owner).toBe('meta')
      expect(repo?.name).toBe('compiler-optimizer')
      expect(repo?.language).toBe('C++')
    })

    it('should have correct issue counts for repo-1', () => {
      const repo = mockRepositories.find(r => r.id === 'repo-1')!
      expect(repo.issueCount).toBe(23)
      expect(repo.criticalIssues).toBe(3)
      expect(repo.highIssues).toBe(8)
      expect(repo.mediumIssues).toBe(9)
      expect(repo.lowIssues).toBe(3)
    })

    it('should have correct issue counts for repo-2', () => {
      const repo = mockRepositories.find(r => r.id === 'repo-2')!
      expect(repo.issueCount).toBe(15)
      expect(repo.criticalIssues).toBe(1)
      expect(repo.highIssues).toBe(4)
      expect(repo.mediumIssues).toBe(7)
      expect(repo.lowIssues).toBe(3)
    })

    it('should have stars and lastUpdated fields', () => {
      const repo1 = mockRepositories.find(r => r.id === 'repo-1')!
      expect(repo1.stars).toBe(12543)
      expect(repo1.lastUpdated).toBe('2025-12-01T10:30:00Z')

      const repo2 = mockRepositories.find(r => r.id === 'repo-2')!
      expect(repo2.stars).toBe(8921)
      expect(repo2.lastUpdated).toBe('2025-11-28T15:45:00Z')
    })
  })

  describe('Redux Initial State', () => {
    it('should initialize with mock repositories', () => {
      const store = createTestStore()

      const state = store.getState() as RootState
      const repos = selectAllRepositories(state)
      expect(repos).toHaveLength(2)
      expect(repos[0]!.id).toBe('repo-1')
      expect(repos[1]!.id).toBe('repo-2')
    })

    it('should initialize with no selected repository', () => {
      const store = createTestStore()

      const state = store.getState() as RootState
      const selected = selectSelectedRepository(state)
      expect(selected).toBeNull()
    })

    it('should initialize with empty search query', () => {
      const store = createTestStore()

      const state = store.getState() as RootState
      const query = selectSearchQuery(state)
      expect(query).toBe('')
    })

    it('should initialize with null filters', () => {
      const store = createTestStore()

      const state = store.getState() as RootState
      const langFilter = selectLanguageFilter(state)
      const sevFilter = selectSeverityFilter(state)
      expect(langFilter).toBeNull()
      expect(sevFilter).toBeNull()
    })
  })

  describe('Redux Actions', () => {
    it('should select a repository', () => {
      const store = createTestStore()

      store.dispatch(selectRepository('repo-1'))
      const state = store.getState() as RootState
      const selected = selectSelectedRepository(state)
      expect(selected?.id).toBe('repo-1')
      expect(selected?.name).toBe('payment-gateway')
    })

    it('should update search query', () => {
      const store = createTestStore()

      store.dispatch(setSearchQuery('stripe'))
      const state = store.getState() as RootState
      const query = selectSearchQuery(state)
      expect(query).toBe('stripe')
    })

    it('should update language filter', () => {
      const store = createTestStore()

      store.dispatch(setLanguageFilter('C++'))
      const state = store.getState() as RootState
      const filter = selectLanguageFilter(state)
      expect(filter).toBe('C++')
    })

    it('should update severity filter', () => {
      const store = createTestStore()

      store.dispatch(setSeverityFilter('critical'))
      const state = store.getState() as RootState
      const filter = selectSeverityFilter(state)
      expect(filter).toBe('critical')
    })
  })

  describe('Filtered Repositories Selector', () => {
    it('should return all repositories with no filters', () => {
      const store = createTestStore()

      const state = store.getState() as RootState
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(2)
    })

    it('should filter by search query (name)', () => {
      const store = createTestStore()

      store.dispatch(setSearchQuery('payment'))
      const state = store.getState() as RootState
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]!.name).toBe('payment-gateway')
    })

    it('should filter by search query (owner)', () => {
      const store = createTestStore()

      store.dispatch(setSearchQuery('meta'))
      const state = store.getState() as RootState
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]!.owner).toBe('meta')
    })

    it('should filter by language', () => {
      const store = createTestStore()

      store.dispatch(setLanguageFilter('C++'))
      const state = store.getState() as RootState
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(2)
    })

    it('should filter by critical severity', () => {
      const store = createTestStore()

      store.dispatch(setSeverityFilter('critical'))
      const state = store.getState() as RootState
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(2) // Both have critical issues
    })

    it('should combine search and severity filters', () => {
      const store = createTestStore()

      store.dispatch(setSearchQuery('stripe'))
      store.dispatch(setSeverityFilter('critical'))
      const state = store.getState() as RootState
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]!.owner).toBe('stripe')
    })

    it('should return empty array when no matches', () => {
      const store = createTestStore()

      store.dispatch(setSearchQuery('nonexistent'))
      const state = store.getState() as RootState
      const filtered = selectFilteredRepositories(state)
      expect(filtered).toHaveLength(0)
    })
  })
})
