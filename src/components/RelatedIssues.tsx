/**
 * RelatedIssues Component
 *
 * Displays a list of related issues based on relevance scoring.
 * Shows issues from the same file, category, severity, and nearby lines.
 */

import { Paper, Typography, List, ListItem, ListItemText, Chip } from '@mui/material'
import type { Issue } from '../types/issue'
import { findRelatedIssues } from '../utils/relatedIssues'

interface RelatedIssuesProps {
  currentIssue: Issue
  allIssues: Issue[]
  onSelectIssue: (issueId: string) => void
}

export function RelatedIssues({ currentIssue, allIssues, onSelectIssue }: RelatedIssuesProps) {
  const relatedIssues = findRelatedIssues(currentIssue, allIssues, 5)

  // Don't render if no related issues found
  if (relatedIssues.length === 0) {
    return null
  }

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
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Related Issues ({relatedIssues.length})
      </Typography>
      <List dense>
        {relatedIssues.map(issue => (
          <ListItem
            key={issue.id}
            onClick={() => onSelectIssue(issue.id)}
            sx={{ cursor: 'pointer', borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }}
          >
            <Chip
              label={issue.severity}
              size="small"
              color={getSeverityColor(issue.severity)}
              sx={{ mr: 1 }}
            />
            <ListItemText
              primary={issue.title}
              secondary={`${issue.file}:${issue.line} • ${issue.category}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
