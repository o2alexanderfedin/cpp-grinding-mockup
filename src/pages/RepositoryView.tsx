import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { useAppSelector } from '../app/hooks'
import { selectAllRepositories } from '../features/repositories/repositoriesSlice'

export const RepositoryView: FC = () => {
  const { repoId } = useParams<{ repoId: string }>()
  const repositories = useAppSelector(selectAllRepositories)
  const repository = repositories.find(r => r.id === repoId)

  if (!repository) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Repository not found</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {repository.owner}/{repository.name}
      </Typography>

      <Typography variant="body1" color="text.secondary">
        File tree and analysis coming soon...
      </Typography>
    </Container>
  )
}
