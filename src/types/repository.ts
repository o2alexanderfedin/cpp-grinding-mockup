export interface FileNode {
  id: string
  name: string
  type: 'file' | 'directory'
  path: string
  extension?: string
  children?: FileNode[]
  issueCount: number
  criticalIssues: number
  highIssues: number
  mediumIssues: number
  lowIssues: number
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
