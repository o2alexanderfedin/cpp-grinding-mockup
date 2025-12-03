import { useState } from 'react'
import { Box, Paper, Typography, Chip, Button, IconButton, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Issue } from '../types/issue'
import { copyToClipboard, formatIssueForClipboard } from '../utils/clipboard'

interface IssueDetailProps {
  issue: Issue
}

export function IssueDetail({ issue }: IssueDetailProps) {
  const [showSimplified, setShowSimplified] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

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

  // Calculate starting line number (3 lines before the bug line)
  const startingLineNumber = Math.max(1, issue.line - 3)

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
      </Box>

      {/* Code Snippet */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2">Code Snippet</Typography>
          <IconButton size="small" onClick={handleCopyCode} title="Copy code">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
        <SyntaxHighlighter
          language="cpp"
          style={vs}
          showLineNumbers
          startingLineNumber={startingLineNumber}
          wrapLines
          lineProps={getLineProps}
          customStyle={{
            margin: 0,
            borderRadius: '4px',
            fontSize: '0.875rem',
          }}
        >
          {issue.codeSnippet}
        </SyntaxHighlighter>
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
