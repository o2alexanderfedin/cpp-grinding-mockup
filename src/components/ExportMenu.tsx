import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import type { Issue } from '../types/issue'
import { exportToJSON, exportToCSV, generateFilename } from '../utils/export'

interface ExportMenuProps {
  issues: Issue[]
  repositoryName: string
}

export function ExportMenu({ issues, repositoryName }: ExportMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleExportJSON = () => {
    const filename = generateFilename(repositoryName, 'json')
    exportToJSON(issues, filename)
    handleClose()
  }

  const handleExportCSV = () => {
    const filename = generateFilename(repositoryName, 'csv')
    exportToCSV(issues, filename)
    handleClose()
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={issues.length === 0}
        title="Export issues"
        color="primary"
      >
        <DownloadIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleExportJSON}>Export as JSON</MenuItem>
        <MenuItem onClick={handleExportCSV}>Export as CSV</MenuItem>
      </Menu>
    </>
  )
}
