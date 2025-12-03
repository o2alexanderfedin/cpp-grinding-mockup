import { useState } from 'react'
import { Box, Paper, Typography, Chip, Button } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Issue } from '../types/issue'

interface IssueDetailProps {
  issue: Issue
}

export function IssueDetail({ issue }: IssueDetailProps) {
  const [showSimplified, setShowSimplified] = useState(true)

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

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Chip label={issue.severity} color={getSeverityColor(issue.severity)} />
          <Chip label={issue.category} variant="outlined" />
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
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Code Snippet
        </Typography>
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
          <Button size="small" onClick={() => setShowSimplified(!showSimplified)}>
            {showSimplified ? 'Show SMT-LIB' : 'Show Simplified'}
          </Button>
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
    </Box>
  )
}
