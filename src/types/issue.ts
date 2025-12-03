export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low'

export type IssueCategory = 'memory-safety' | 'concurrency' | 'undefined-behavior' | 'type-safety'

export type IssueStatus = 'new' | 'acknowledged' | 'fixed' | 'ignored'

export interface Issue {
  id: string
  severity: IssueSeverity
  category: IssueCategory
  file: string
  line: number
  title: string
  description: string
  codeSnippet: string
  smtLibProof: string
  simplifiedProof: string
  explanation: string
  suggestedFix: string
  // Metadata fields (optional for backward compatibility with tests)
  discoveredAt?: string // ISO timestamp
  lastUpdated?: string // ISO timestamp
  status?: IssueStatus
  acknowledgedBy?: string
  fixedAt?: string
}
