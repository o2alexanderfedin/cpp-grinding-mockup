import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography, Grid, Paper } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  selectAllRepositories,
  selectSelectedFilePath,
  selectFile,
} from '../features/repositories/repositoriesSlice'
import { FileTree } from '../components/FileTree'

export const RepositoryView: FC = () => {
  const { repoId } = useParams<{ repoId: string }>()
  const dispatch = useAppDispatch()

  const repositories = useAppSelector(selectAllRepositories)
  const repository = repositories.find(r => r.id === repoId)
  const selectedFilePath = useAppSelector(selectSelectedFilePath)

  const handleSelectFile = (filePath: string) => {
    dispatch(selectFile(filePath))
  }

  if (!repository) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Repository not found</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {repository.owner}/{repository.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              File Tree
            </Typography>
            {repository.fileTree.map(rootNode => (
              <FileTree
                key={rootNode.id}
                rootNode={rootNode}
                selectedFilePath={selectedFilePath}
                onSelectFile={handleSelectFile}
              />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Issues</Typography>
            <Typography sx={{ mt: 2 }}>
              {selectedFilePath ? `Issues for ${selectedFilePath}` : 'Select a file to view issues'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
