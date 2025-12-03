export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low'

export type IssueCategory = 'memory-safety' | 'concurrency' | 'undefined-behavior' | 'type-safety'

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
}
