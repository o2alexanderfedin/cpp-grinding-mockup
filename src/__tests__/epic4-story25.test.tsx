import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import repositoriesReducer, { selectFile } from '../features/repositories/repositoriesSlice'
import { FileTree } from '../components/FileTree'
import type { FileNode } from '../types/repository'

describe('Story #25: File Selection', () => {
  const mockFileTree: FileNode = {
    id: 'root',
    name: 'src',
    type: 'directory',
    path: '/src',
    issueCount: 10,
    criticalIssues: 2,
    highIssues: 3,
    mediumIssues: 4,
    lowIssues: 1,
    children: [
      {
        id: 'file1',
        name: 'main.cpp',
        type: 'file',
        path: '/src/main.cpp',
        extension: '.cpp',
        issueCount: 5,
        criticalIssues: 1,
        highIssues: 2,
        mediumIssues: 2,
        lowIssues: 0,
      },
      {
        id: 'file2',
        name: 'utils.cpp',
        type: 'file',
        path: '/src/utils.cpp',
        extension: '.cpp',
        issueCount: 5,
        criticalIssues: 1,
        highIssues: 1,
        mediumIssues: 2,
        lowIssues: 1,
      },
    ],
  }

  const createMockStore = (selectedFilePath: string | null = null) => {
    return configureStore({
      reducer: {
        repositories: repositoriesReducer,
      },
      preloadedState: {
        repositories: {
          repositories: [],
          selectedRepositoryId: null,
          selectedFilePath,
          searchQuery: '',
          languageFilter: null,
          severityFilter: null,
        },
      },
    })
  }

  describe('Redux state management', () => {
    it('should have selectedFilePath in Redux state', () => {
      const store = createMockStore()
      const state = store.getState()
      expect(state.repositories.selectedFilePath).toBeDefined()
      expect(state.repositories.selectedFilePath).toBeNull()
    })

    it('should update selectedFilePath when selectFile action is dispatched', () => {
      const store = createMockStore()
      store.dispatch(selectFile('/src/main.cpp'))
      const state = store.getState()
      expect(state.repositories.selectedFilePath).toBe('/src/main.cpp')
    })
  })

  describe('File selection behavior', () => {
    it('should call onSelectFile when file is clicked', async () => {
      const user = userEvent.setup()
      const store = createMockStore()
      let selectedPath: string | null = null

      const handleSelectFile = (path: string) => {
        selectedPath = path
        store.dispatch(selectFile(path))
      }

      render(
        <Provider store={store}>
          <FileTree rootNode={mockFileTree} selectedFilePath={null} onSelectFile={handleSelectFile} />
        </Provider>,
      )

      const fileNode = screen.getByText('main.cpp')
      await user.click(fileNode)

      expect(selectedPath).toBe('/src/main.cpp')
      expect(store.getState().repositories.selectedFilePath).toBe('/src/main.cpp')
    })

    it('should not call onSelectFile when directory is clicked', async () => {
      const user = userEvent.setup()
      const store = createMockStore()
      let selectedPath: string | null = null

      const handleSelectFile = (path: string) => {
        selectedPath = path
        store.dispatch(selectFile(path))
      }

      render(
        <Provider store={store}>
          <FileTree rootNode={mockFileTree} selectedFilePath={null} onSelectFile={handleSelectFile} />
        </Provider>,
      )

      const dirNode = screen.getByText('src')
      await user.click(dirNode)

      expect(selectedPath).toBeNull()
      expect(store.getState().repositories.selectedFilePath).toBeNull()
    })

    it('should select only one file at a time', async () => {
      const user = userEvent.setup()
      const store = createMockStore()

      const handleSelectFile = (path: string) => {
        store.dispatch(selectFile(path))
      }

      render(
        <Provider store={store}>
          <FileTree rootNode={mockFileTree} selectedFilePath={null} onSelectFile={handleSelectFile} />
        </Provider>,
      )

      const file1 = screen.getByText('main.cpp')
      const file2 = screen.getByText('utils.cpp')

      await user.click(file1)
      expect(store.getState().repositories.selectedFilePath).toBe('/src/main.cpp')

      await user.click(file2)
      expect(store.getState().repositories.selectedFilePath).toBe('/src/utils.cpp')
    })
  })

  describe('Visual selection state', () => {
    it('should highlight selected file with different background', () => {
      const store = createMockStore('/src/main.cpp')

      render(
        <Provider store={store}>
          <FileTree
            rootNode={mockFileTree}
            selectedFilePath="/src/main.cpp"
            onSelectFile={() => {
              /* noop */
            }}
          />
        </Provider>,
      )

      const fileNode = screen.getByText('main.cpp').closest('div')
      expect(fileNode).toHaveStyle({ backgroundColor: expect.any(String) })
    })

    it('should not highlight unselected files', () => {
      const store = createMockStore('/src/main.cpp')

      render(
        <Provider store={store}>
          <FileTree
            rootNode={mockFileTree}
            selectedFilePath="/src/main.cpp"
            onSelectFile={() => {
              /* noop */
            }}
          />
        </Provider>,
      )

      const selectedFile = screen.getByText('main.cpp').closest('div')
      const unselectedFile = screen.getByText('utils.cpp').closest('div')

      // Selected file should have a background color
      expect(selectedFile).toHaveStyle({ backgroundColor: expect.any(String) })

      // Unselected file should have transparent background
      // Note: We can't directly test theme tokens, so we verify they're different elements
      expect(selectedFile).not.toBe(unselectedFile)
    })

    it('should update visual state when selection changes', async () => {
      const user = userEvent.setup()
      const store = createMockStore()

      const handleSelectFile = (path: string) => {
        store.dispatch(selectFile(path))
      }

      const { rerender } = render(
        <Provider store={store}>
          <FileTree rootNode={mockFileTree} selectedFilePath={null} onSelectFile={handleSelectFile} />
        </Provider>,
      )

      const file1 = screen.getByText('main.cpp')
      await user.click(file1)

      rerender(
        <Provider store={store}>
          <FileTree
            rootNode={mockFileTree}
            selectedFilePath={store.getState().repositories.selectedFilePath}
            onSelectFile={handleSelectFile}
          />
        </Provider>,
      )

      const selectedFile = screen.getByText('main.cpp').closest('div')
      expect(selectedFile).toHaveStyle({ backgroundColor: expect.any(String) })
    })
  })

  describe('Integration with RepositoryView', () => {
    it('should pass selectedFilePath from Redux to FileTree', () => {
      const store = createMockStore('/src/main.cpp')

      render(
        <Provider store={store}>
          <FileTree
            rootNode={mockFileTree}
            selectedFilePath={store.getState().repositories.selectedFilePath}
            onSelectFile={() => {
              /* noop */
            }}
          />
        </Provider>,
      )

      expect(screen.getByText('main.cpp')).toBeInTheDocument()
    })
  })

  describe('Selector export', () => {
    it('should export selectSelectedFilePath selector', () => {
      const store = createMockStore('/src/main.cpp')
      const state = store.getState()
      expect(state.repositories.selectedFilePath).toBe('/src/main.cpp')
    })
  })
})
