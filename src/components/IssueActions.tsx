import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import CloseIcon from '@mui/icons-material/Close'
import { useAppDispatch } from '../app/hooks'
import { applyFix, markAsFixed, dismissIssue } from '../features/analysis/analysisSlice'
import type { Issue } from '../types/issue'

interface IssueActionsProps {
  issue: Issue
}

export function IssueActions({ issue }: IssueActionsProps) {
  const dispatch = useAppDispatch()
  const [showDismissDialog, setShowDismissDialog] = useState(false)
  const [showApplySuccess, setShowApplySuccess] = useState(false)
  const [showFixedSuccess, setShowFixedSuccess] = useState(false)
  const [showDismissSuccess, setShowDismissSuccess] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  const handleApplyFix = async (): Promise<void> => {
    setIsApplying(true)
    // Simulate applying fix with animation
    await new Promise(resolve => setTimeout(resolve, 1500))
    dispatch(applyFix(issue.id))
    setIsApplying(false)
    setShowApplySuccess(true)
  }

  const handleMarkAsFixed = (): void => {
    dispatch(markAsFixed(issue.id))
    setShowFixedSuccess(true)
  }

  const handleDismissClick = (): void => {
    setShowDismissDialog(true)
  }

  const handleDismissConfirm = (): void => {
    dispatch(dismissIssue(issue.id))
    setShowDismissDialog(false)
    setShowDismissSuccess(true)
  }

  const handleDismissCancel = (): void => {
    setShowDismissDialog(false)
  }

  const handleCloseSnackbar = (): void => {
    setShowApplySuccess(false)
    setShowFixedSuccess(false)
    setShowDismissSuccess(false)
  }

  const isFixed = issue.status === 'fixed'
  const isDismissed = issue.status === 'dismissed'

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
        {!isFixed && !isDismissed && (
          <>
            <Button
              variant="contained"
              color="success"
              startIcon={isApplying ? undefined : <AutoFixHighIcon />}
              onClick={handleApplyFix}
              disabled={isApplying}
              sx={{
                minWidth: '140px',
                '&.Mui-disabled': {
                  background: '#4caf50',
                  color: 'white',
                },
              }}
            >
              {isApplying ? 'Applying Fix...' : 'Apply Fix'}
            </Button>
            <Button
              variant="outlined"
              color="success"
              startIcon={<CheckCircleIcon />}
              onClick={handleMarkAsFixed}
            >
              Mark as Fixed
            </Button>
            <Button variant="outlined" color="error" startIcon={<CloseIcon />} onClick={handleDismissClick}>
              Dismiss
            </Button>
          </>
        )}

        {isFixed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
            <CheckCircleIcon />
            <Box sx={{ fontWeight: 500 }}>Issue marked as fixed</Box>
          </Box>
        )}

        {isDismissed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <CloseIcon />
            <Box sx={{ fontWeight: 500 }}>Issue dismissed</Box>
          </Box>
        )}
      </Box>

      {/* Dismiss Confirmation Dialog */}
      <Dialog open={showDismissDialog} onClose={handleDismissCancel}>
        <DialogTitle>Dismiss Issue?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to dismiss this issue? This should only be used for false positives or
            intentional code patterns.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDismissCancel}>Cancel</Button>
          <Button onClick={handleDismissConfirm} color="error" variant="contained">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbars */}
      <Snackbar
        open={showApplySuccess}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Fix applied successfully! The code has been automatically updated.
        </Alert>
      </Snackbar>

      <Snackbar
        open={showFixedSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Issue marked as fixed!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showDismissSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          Issue dismissed
        </Alert>
      </Snackbar>
    </>
  )
}
