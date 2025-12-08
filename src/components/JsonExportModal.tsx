import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Issue } from '../types/issue'

interface JsonExportModalProps {
  issue: Issue
  open: boolean
  onClose: () => void
}

export function JsonExportModal({ issue, open, onClose }: JsonExportModalProps) {
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const exportData = {
    issueId: issue.id,
    severity: issue.severity,
    category: issue.category,
    title: issue.title,
    file: issue.file,
    line: issue.line,
    description: issue.explanation,
    codeSnippet: issue.codeSnippet,
    suggestedFix: issue.suggestedFix,
    smtProof: issue.smtLibProof,
    verifiedBy: 'cvc5',
    timestamp: new Date().toISOString(),
  }

  const jsonString = JSON.stringify(exportData, null, 2)

  const handleCopyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(jsonString)
      setShowCopySuccess(true)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const handleCloseSnackbar = (): void => {
    setShowCopySuccess(false)
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Export for AI Agent</Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This format can be sent to AI agents (Claude, GPT) to automatically generate fixes.
            The JSON includes the issue details, code context, SMT proof, and suggested fix.
          </Typography>
          <Box
            sx={{
              maxHeight: '400px',
              overflow: 'auto',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <SyntaxHighlighter
              language="json"
              style={vs}
              customStyle={{
                margin: 0,
                fontSize: '0.875rem',
              }}
            >
              {jsonString}
            </SyntaxHighlighter>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button
            variant="contained"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyToClipboard}
          >
            Copy to Clipboard
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showCopySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          JSON copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  )
}
