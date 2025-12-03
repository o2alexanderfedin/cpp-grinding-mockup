export interface FileNode {
  name: string
  type: 'file' | 'folder'
  path: string
  children?: FileNode[]
}

export interface Repository {
  id: string
  name: string
  owner: string
  language: string
  description: string
  fileTree: FileNode[]
  issues: string[] // Issue IDs
}
