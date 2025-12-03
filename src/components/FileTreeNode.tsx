import { type FC } from 'react'
import { Box, Typography, IconButton, Chip, Tooltip } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import type { FileNode } from '../types/repository'

type SeverityColor = 'error' | 'warning' | 'info' | 'default'

const getSeverityColor = (node: FileNode): SeverityColor => {
  if (node.criticalIssues > 0) return 'error'
  if (node.highIssues > 0) return 'warning'
  if (node.mediumIssues > 0) return 'info'
  return 'default'
}

export interface FileTreeNodeProps {
  node: FileNode
  level: number
  expanded: Set<string>
  selectedPath: string | null
  onToggle: (nodeId: string) => void
  onSelect: (path: string) => void
}

export const FileTreeNode: FC<FileTreeNodeProps> = ({
  node,
  level,
  expanded,
  selectedPath,
  onToggle,
  onSelect,
}) => {
  const isExpanded = expanded.has(node.id)
  const isSelected = selectedPath === node.path
  const isDirectory = node.type === 'directory'

  const handleClick = () => {
    if (isDirectory) {
      onToggle(node.id)
    } else {
      onSelect(node.path)
    }
  }

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: level * 2,
          paddingY: 0.5,
          cursor: 'pointer',
          backgroundColor: isSelected ? 'action.selected' : 'transparent',
          '&:hover': {
            backgroundColor: isSelected ? 'action.selected' : 'action.hover',
          },
        }}
      >
        {isDirectory && (
          <IconButton size="small" sx={{ mr: 0.5 }} data-testid={isExpanded ? 'ExpandMoreIcon' : 'ChevronRightIcon'}>
            {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}

        {isDirectory ? (
          <FolderIcon sx={{ mr: 1, color: 'primary.main' }} />
        ) : (
          <InsertDriveFileIcon sx={{ mr: 1, color: 'text.secondary' }} />
        )}

        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {node.name}
        </Typography>

        {node.issueCount > 0 && (
          <Tooltip
            title={
              <Box>
                {node.criticalIssues > 0 && <div>Critical: {node.criticalIssues}</div>}
                {node.highIssues > 0 && <div>High: {node.highIssues}</div>}
                {node.mediumIssues > 0 && <div>Medium: {node.mediumIssues}</div>}
                {node.lowIssues > 0 && <div>Low: {node.lowIssues}</div>}
              </Box>
            }
          >
            <Chip label={node.issueCount} size="small" color={getSeverityColor(node)} sx={{ ml: 1, minWidth: 32 }} />
          </Tooltip>
        )}
      </Box>

      {isDirectory && isExpanded && node.children && (
        <Box>
          {node.children.map(child => (
            <FileTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selectedPath={selectedPath}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </Box>
      )}
    </>
  )
}
