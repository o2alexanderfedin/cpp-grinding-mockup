export interface FileNode {
  name: string
  type: 'file' | 'folder'
  path: string
  children?: FileNode[]
  issueCount?: number
}

export interface Repository {
  id: string
  name: string
  owner: string
  language: string
  description: string
  stars: number
  lastUpdated: string // ISO date string
  issueCount: number
  criticalIssues: number
  highIssues: number
  mediumIssues: number
  lowIssues: number
  fileTree: FileNode[]
  issues: string[] // Issue IDs
}
