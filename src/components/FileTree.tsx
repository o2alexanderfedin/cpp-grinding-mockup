import { type FC, useState } from 'react'
import { Box } from '@mui/material'
import { FileTreeNode } from './FileTreeNode'
import type { FileNode } from '../types/repository'

export interface FileTreeProps {
  rootNode: FileNode
  selectedFilePath: string | null
  onSelectFile: (filePath: string) => void
}

export const FileTree: FC<FileTreeProps> = ({ rootNode, selectedFilePath, onSelectFile }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set([rootNode.id]))

  const handleToggle = (nodeId: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <FileTreeNode
        node={rootNode}
        level={0}
        expanded={expanded}
        selectedPath={selectedFilePath}
        onToggle={handleToggle}
        onSelect={onSelectFile}
      />
    </Box>
  )
}
