import type { Issue } from '../types/issue'

/**
 * Copy text to clipboard using the Clipboard API
 * @param text The text to copy
 * @returns Promise resolving to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
    return false
  }
}

/**
 * Format an issue as plain text for clipboard
 * @param issue The issue to format
 * @returns Formatted text representation of the issue
 */
export function formatIssueForClipboard(issue: Issue): string {
  return `
${issue.severity.toUpperCase()}: ${issue.title}
Category: ${issue.category}
File: ${issue.file}:${issue.line}

Code:
${issue.codeSnippet}

Explanation:
${issue.explanation}

Suggested Fix:
${issue.suggestedFix}
  `.trim()
}
