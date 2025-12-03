import type { Issue } from '../types/issue'

/**
 * Download a blob as a file
 * @param blob The blob to download
 * @param filename The filename for the download
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export issues to JSON format
 * @param issues The issues to export
 * @param filename The filename for the download
 */
export function exportToJSON(issues: Issue[], filename: string): void {
  const json = JSON.stringify(issues, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  downloadBlob(blob, filename)
}

/**
 * Export issues to CSV format
 * @param issues The issues to export
 * @param filename The filename for the download
 */
export function exportToCSV(issues: Issue[], filename: string): void {
  const headers = ['Severity', 'Category', 'Title', 'File', 'Line', 'Explanation']
  const rows = issues.map(issue => [
    issue.severity,
    issue.category,
    issue.title,
    issue.file,
    issue.line.toString(),
    // Escape quotes and newlines for CSV
    issue.explanation.replace(/"/g, '""').replace(/\n/g, ' '),
  ])

  const csv = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  downloadBlob(blob, filename)
}

/**
 * Generate a filename with timestamp
 * @param repository The repository name
 * @param format The file format
 * @returns Formatted filename
 */
export function generateFilename(repository: string, format: 'json' | 'csv'): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const sanitizedRepo = repository.replace(/[^a-zA-Z0-9-_]/g, '_')
  return `${sanitizedRepo}-issues-${timestamp}.${format}`
}
