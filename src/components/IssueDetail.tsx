import { useState } from 'react'
import { Box, Paper, Typography, Chip, Button, IconButton, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { formatDistanceToNow } from 'date-fns'
import type { Issue } from '../types/issue'
import { copyToClipboard, formatIssueForClipboard } from '../utils/clipboard'
import { RelatedIssues } from './RelatedIssues'
import { IssueActions } from './IssueActions'
import type { IssueStatus } from '../types/issue'

interface IssueDetailProps {
  issue: Issue
  allIssues?: Issue[]
  onSelectIssue?: (issueId: string) => void
  onStatusChange?: (status: IssueStatus) => void
}

export function IssueDetail({
  issue,
  allIssues = [],
  onSelectIssue,
  onStatusChange,
}: IssueDetailProps) {
  const [showSimplified, setShowSimplified] = useState(true)
  const [showFullContext, setShowFullContext] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleStatusChange = (status: IssueStatus) => {
    if (onStatusChange) {
      onStatusChange(status)
      setSnackbarMessage(`Issue marked as ${status}`)
      setSnackbarOpen(true)
    }
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

  // Get code with or without extended context
  const getCodeWithContext = (): { code: string; startLine: number } => {
    if (!showFullContext) {
      return {
        code: issue.codeSnippet,
        startLine: Math.max(1, issue.line - 3), // 3 lines before bug line
      }
    }

    // Generate extended context (±10 lines)
    const lines = issue.codeSnippet.split('\n')
    const contextLines = 10

    const beforeContext = Array(contextLines)
      .fill(0)
      .map((_, i) => `    // ... (line ${issue.line - contextLines - 3 + i}) ...`)

    const afterContext = Array(contextLines)
      .fill(0)
      .map((_, i) => `    // ... (line ${issue.line + lines.length - 3 + i}) ...`)

    return {
      code: [...beforeContext, ...lines, ...afterContext].join('\n'),
      startLine: Math.max(1, issue.line - contextLines - 3),
    }
  }

  // Custom line props to highlight the bug line
  const getLineProps = (lineNumber: number) => {
    return {
      style: {
        backgroundColor: lineNumber === issue.line ? '#ffebee' : 'transparent',
        display: 'block',
      },
    }
  }

  // Copy handlers
  const handleCopyCode = async () => {
    const success = await copyToClipboard(issue.codeSnippet)
    setSnackbarMessage(success ? 'Code copied!' : 'Failed to copy')
    setSnackbarOpen(true)
  }

  const handleCopyProof = async () => {
    const text = showSimplified ? issue.simplifiedProof : issue.smtLibProof
    const success = await copyToClipboard(text)
    setSnackbarMessage(success ? 'Proof copied!' : 'Failed to copy')
    setSnackbarOpen(true)
  }

  const handleCopyIssue = async () => {
    const text = formatIssueForClipboard(issue)
    const success = await copyToClipboard(text)
    setSnackbarMessage(success ? 'Issue copied!' : 'Failed to copy')
    setSnackbarOpen(true)
  }

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={issue.severity} color={getSeverityColor(issue.severity)} />
            <Chip label={issue.category} variant="outlined" />
            {issue.status && (
              <Chip
                label={`Status: ${issue.status}`}
                color={issue.status === 'new' ? 'error' : issue.status === 'fixed' ? 'success' : 'default'}
                size="small"
              />
            )}
          </Box>
          <IconButton size="small" onClick={handleCopyIssue} title="Copy entire issue">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {issue.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {issue.file} • Line {issue.line}
        </Typography>
        {/* Metadata Timestamps */}
        {(issue.discoveredAt || issue.lastUpdated) && (
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            {issue.discoveredAt && (
              <Chip
                label={`Discovered ${formatDistanceToNow(new Date(issue.discoveredAt))} ago`}
                variant="outlined"
                size="small"
              />
            )}
            {issue.lastUpdated && (
              <Chip
                label={`Updated ${formatDistanceToNow(new Date(issue.lastUpdated))} ago`}
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        )}
      </Box>

      {/* Related Issues */}
      {allIssues.length > 0 && onSelectIssue && (
        <RelatedIssues currentIssue={issue} allIssues={allIssues} onSelectIssue={onSelectIssue} />
      )}

      {/* Issue Actions */}
      {onStatusChange && <IssueActions issue={issue} onStatusChange={handleStatusChange} />}

      {/* Code Snippet */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2">Code Snippet</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton size="small" onClick={handleCopyCode} title="Copy code">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
            <Button
              size="small"
              onClick={() => setShowFullContext(!showFullContext)}
              startIcon={showFullContext ? <ExpandLessIcon data-testid="ExpandLessIcon" /> : <ExpandMoreIcon data-testid="ExpandMoreIcon" />}
            >
              {showFullContext ? 'Show Less' : 'Show More Context'}
            </Button>
          </Box>
        </Box>
        {(() => {
          const { code, startLine } = getCodeWithContext()
          return (
            <SyntaxHighlighter
              language="cpp"
              style={vs}
              showLineNumbers
              startingLineNumber={startLine}
              wrapLines
              lineProps={getLineProps}
              customStyle={{
                margin: 0,
                borderRadius: '4px',
                fontSize: '0.875rem',
              }}
            >
              {code}
            </SyntaxHighlighter>
          )
        })()}
      </Paper>

      {/* Formal Proof */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2">Formal Proof</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" onClick={() => setShowSimplified(!showSimplified)}>
              {showSimplified ? 'Show SMT-LIB' : 'Show Simplified'}
            </Button>
            <IconButton size="small" onClick={handleCopyProof} title="Copy proof">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {showSimplified ? (
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {issue.simplifiedProof}
          </Typography>
        ) : (
          <SyntaxHighlighter
            language="lisp"
            style={vs}
            customStyle={{
              margin: 0,
              borderRadius: '4px',
              fontSize: '0.875rem',
            }}
          >
            {issue.smtLibProof}
          </SyntaxHighlighter>
        )}
      </Paper>

      {/* Explanation */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Explanation
        </Typography>
        <Typography variant="body2">{issue.explanation}</Typography>
      </Paper>

      {/* Suggested Fix */}
      <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Suggested Fix
        </Typography>
        <SyntaxHighlighter
          language="cpp"
          style={vs}
          customStyle={{
            margin: 0,
            borderRadius: '4px',
            fontSize: '0.875rem',
            backgroundColor: 'transparent',
          }}
        >
          {issue.suggestedFix}
        </SyntaxHighlighter>
      </Paper>

      {/* Copy Feedback Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
