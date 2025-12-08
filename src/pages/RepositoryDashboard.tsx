import { type FC } from 'react'
import { Container, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectFilteredRepositories,
  selectSelectedRepositoryId,
  selectSearchQuery,
  selectRepository,
  setSearchQuery,
} from '../features/repositories/repositoriesSlice'
import { RepositoryGrid } from '../components/RepositoryGrid'
import { SearchBar } from '../components/SearchBar'
import { PageNavigation } from '../components/PageNavigation'

export const RepositoryDashboard: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const repositories = useAppSelector(selectFilteredRepositories)
  const selectedRepositoryId = useAppSelector(selectSelectedRepositoryId)
  const searchQuery = useAppSelector(selectSearchQuery)

  const handleSelectRepository = (repositoryId: string) => {
    dispatch(selectRepository(repositoryId))
    navigate(`/repo/${repositoryId}`)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageNavigation showBack={false} />

      <Typography variant="h4" sx={{ mb: 4 }}>
        Your Repositories
      </Typography>

      <Box sx={{ mb: 3 }}>
        <SearchBar value={searchQuery} onChange={query => dispatch(setSearchQuery(query))} />
      </Box>

      <RepositoryGrid
        repositories={repositories}
        selectedRepositoryId={selectedRepositoryId}
        onSelectRepository={handleSelectRepository}
      />
    </Container>
  )
}
