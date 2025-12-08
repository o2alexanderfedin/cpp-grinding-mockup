import { useState } from 'react'
import { Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { JsonExportModal } from './JsonExportModal'
import type { Issue } from '../types/issue'

interface ExportButtonProps {
  issue: Issue
}

export function ExportButton({ issue }: ExportButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = (): void => {
    setIsModalOpen(true)
  }

  const handleClose = (): void => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleOpen}
        sx={{ mt: 2 }}
      >
        Export for AI Agent
      </Button>
      <JsonExportModal issue={issue} open={isModalOpen} onClose={handleClose} />
    </>
  )
}
