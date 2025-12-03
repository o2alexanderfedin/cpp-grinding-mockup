/**
 * IssueActions Component
 *
 * Provides action buttons for changing issue status:
 * - Acknowledge (new → acknowledged)
 * - Mark as Fixed (new/acknowledged → fixed)
 * - Ignore (with confirmation dialog)
 */

import { useState } from 'react'
import {
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BlockIcon from '@mui/icons-material/Block'
import type { Issue, IssueStatus } from '../types/issue'

interface IssueActionsProps {
  issue: Issue
  onStatusChange: (status: IssueStatus) => void
}

export function IssueActions({ issue, onStatusChange }: IssueActionsProps) {
  const [confirmIgnore, setConfirmIgnore] = useState(false)

  const currentStatus = issue.status || 'new'

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Actions
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {currentStatus === 'new' && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<CheckCircleOutlineIcon data-testid="CheckCircleOutlineIcon" />}
            onClick={() => onStatusChange('acknowledged')}
          >
            Acknowledge
          </Button>
        )}

        {(currentStatus === 'new' || currentStatus === 'acknowledged') && (
          <Button
            variant="contained"
            size="small"
            color="success"
            startIcon={<CheckCircleIcon data-testid="CheckCircleIcon" />}
            onClick={() => onStatusChange('fixed')}
          >
            Mark as Fixed
          </Button>
        )}

        {currentStatus !== 'ignored' && currentStatus !== 'fixed' && (
          <Button
            variant="outlined"
            size="small"
            color="warning"
            startIcon={<BlockIcon data-testid="BlockIcon" />}
            onClick={() => setConfirmIgnore(true)}
          >
            Ignore
          </Button>
        )}

        {currentStatus === 'fixed' && <Chip label="Fixed" color="success" />}

        {currentStatus === 'ignored' && <Chip label="Ignored" color="default" />}
      </Stack>

      {/* Ignore Confirmation Dialog */}
      <Dialog open={confirmIgnore} onClose={() => setConfirmIgnore(false)}>
        <DialogTitle>Ignore This Issue?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will mark the issue as ignored and hide it from the default view. You can always
            re-enable it later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmIgnore(false)}>Cancel</Button>
          <Button
            onClick={() => {
              onStatusChange('ignored')
              setConfirmIgnore(false)
            }}
            color="warning"
            variant="contained"
          >
            Ignore Issue
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
