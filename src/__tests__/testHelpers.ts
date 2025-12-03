import type { Issue } from '../types/issue'

/**
 * Create a mock issue with all required fields for testing
 */
export function createMockIssue(partial: Partial<Issue> & Pick<Issue, 'id'>): Issue {
  return {
    severity: 'critical',
    category: 'memory-safety',
    file: '/src/test.cpp',
    line: 42,
    title: 'Test issue',
    description: 'Test description',
    codeSnippet: 'char buffer[16];',
    smtLibProof: '(assert true)',
    simplifiedProof: 'Simple proof',
    explanation: 'Test explanation',
    suggestedFix: 'Test fix',
    discoveredAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    status: 'new',
    ...partial,
  }
}
