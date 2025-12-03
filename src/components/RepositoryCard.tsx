import { type FC } from 'react'
import { Card, CardContent, Typography, Chip, Box } from '@mui/material'
import { formatDistance } from 'date-fns'
import type { Repository } from '../types/repository'

export interface RepositoryCardProps {
  repository: Repository
  isSelected: boolean
  onSelect: (repositoryId: string) => void
}

export const RepositoryCard: FC<RepositoryCardProps> = ({ repository, isSelected, onSelect }) => {
  return (
    <Card
      elevation={isSelected ? 4 : 1}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s',
        border: isSelected ? '2px solid #007AFF' : 'none',
        '&:hover': {
          elevation: 3,
          transform: 'translateY(-4px)',
        },
      }}
      onClick={() => onSelect(repository.id)}
    >
      <CardContent>
        {/* Repository info */}
        <Typography variant="h6" sx={{ mb: 1 }}>
          {repository.owner}/{repository.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {repository.description}
        </Typography>

        {/* Metadata */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip label={repository.language} size="small" />
          <Chip label={`⭐ ${repository.stars}`} size="small" />
          <Chip label={`${repository.issueCount} issues`} size="small" />
        </Box>

        {/* Issue severity badges */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {repository.criticalIssues > 0 && (
            <Chip label={`${repository.criticalIssues} critical`} color="error" size="small" />
          )}
          {repository.highIssues > 0 && (
            <Chip label={`${repository.highIssues} high`} color="warning" size="small" />
          )}
          {repository.mediumIssues > 0 && (
            <Chip label={`${repository.mediumIssues} medium`} color="info" size="small" />
          )}
        </Box>

        {/* Last updated */}
        <Typography variant="caption" color="text.secondary">
          Updated {formatDistance(new Date(repository.lastUpdated), new Date())} ago
        </Typography>
      </CardContent>
    </Card>
  )
}
