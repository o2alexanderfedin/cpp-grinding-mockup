import { type FC } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import type { FileNode } from '../types/repository'

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
