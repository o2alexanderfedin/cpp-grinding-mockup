import { List, Box, Typography } from '@mui/material'
import { IssueListItem } from './IssueListItem'
import type { Issue } from '../types/issue'

interface IssueListProps {
  issues: Issue[]
  selectedIssueId: string | null
  onSelectIssue: (issueId: string) => void
}

export function IssueList({ issues, selectedIssueId, onSelectIssue }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">Select a file to view issues</Typography>
      </Box>
    )
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {issues.map(issue => (
        <IssueListItem
          key={issue.id}
          issue={issue}
          isSelected={selectedIssueId === issue.id}
          onSelect={() => onSelectIssue(issue.id)}
        />
      ))}
    </List>
  )
}
