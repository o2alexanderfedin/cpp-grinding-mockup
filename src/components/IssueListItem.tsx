import { ListItem, ListItemText, Chip, Box, Typography } from '@mui/material'
import type { Issue } from '../types/issue'

interface IssueListItemProps {
  issue: Issue
  isSelected: boolean
  onSelect: () => void
}

export function IssueListItem({ issue, isSelected, onSelect }: IssueListItemProps) {
  const getSeverityColor = (
    severity: Issue['severity']
  ): 'error' | 'warning' | 'info' | 'default' => {
    switch (severity) {
      case 'critical':
        return 'error'
      case 'high':
        return 'warning'
      case 'medium':
        return 'info'
      case 'low':
        return 'default'
    }
  }

  return (
    <ListItem
      button
      selected={isSelected}
      onClick={onSelect}
      sx={{
        borderLeft: isSelected ? '4px solid' : 'none',
        borderColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={issue.severity} color={getSeverityColor(issue.severity)} size="small" />
            <Typography variant="body1">{issue.title}</Typography>
          </Box>
        }
        secondary={
          <Typography variant="body2" color="text.secondary">
            {issue.category} • Line {issue.line}
          </Typography>
        }
      />
    </ListItem>
  )
}
