import { type FC } from 'react'
import { Grid } from '@mui/material'
import { RepositoryCard } from './RepositoryCard'
import type { Repository } from '../types/repository'

export interface RepositoryGridProps {
  repositories: Repository[]
  selectedRepositoryId: string | null
  onSelectRepository: (repositoryId: string) => void
}

export const RepositoryGrid: FC<RepositoryGridProps> = ({
  repositories,
  selectedRepositoryId,
  onSelectRepository,
}) => {
  return (
    <Grid container spacing={3}>
      {repositories.map(repo => (
        <Grid item xs={12} md={6} key={repo.id}>
          <RepositoryCard
            repository={repo}
            isSelected={selectedRepositoryId === repo.id}
            onSelect={onSelectRepository}
          />
        </Grid>
      ))}
    </Grid>
  )
}
