/**
 * Epic 6 - Story #33: Copy to Clipboard Functionality Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { copyToClipboard, formatIssueForClipboard } from '../utils/clipboard'
import type { Issue } from '../types/issue'

describe('Story #33: Copy to Clipboard Functionality', () => {
  const mockIssue: Issue = {
    id: 'test-1',
    severity: 'critical',
    category: 'memory-safety',
    file: '/src/test.cpp',
    line: 42,
    title: 'Test buffer overflow',
    description: 'Test description',
    codeSnippet: 'char buffer[16];\nstrcpy(buffer, input);',
    smtLibProof: '(assert true)',
    simplifiedProof: 'This is a test proof',
    explanation: 'This is a test explanation',
    suggestedFix: 'Use strncpy instead',
  }

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(async (_content: string) => Promise.resolve()),
      },
    })
  })

  describe('copyToClipboard function', () => {
    it('should copy text to clipboard successfully', async () => {
      const testText = 'test content'
      const result = await copyToClipboard(testText)

      expect(result).toBe(true)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText)
    })

    it('should return false when clipboard API fails', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn(async () => Promise.reject(new Error('Clipboard denied'))),
        },
      })

      const result = await copyToClipboard('test')

      expect(result).toBe(false)
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should handle empty strings', async () => {
      const result = await copyToClipboard('')

      expect(result).toBe(true)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('')
    })
  })

  describe('formatIssueForClipboard function', () => {
    it('should format issue with all fields', () => {
      const formatted = formatIssueForClipboard(mockIssue)

      expect(formatted).toContain('CRITICAL: Test buffer overflow')
      expect(formatted).toContain('Category: memory-safety')
      expect(formatted).toContain('File: /src/test.cpp:42')
      expect(formatted).toContain('Code:')
      expect(formatted).toContain('char buffer[16];')
      expect(formatted).toContain('Explanation:')
      expect(formatted).toContain('This is a test explanation')
      expect(formatted).toContain('Suggested Fix:')
      expect(formatted).toContain('Use strncpy instead')
    })

    it('should capitalize severity', () => {
      const formatted = formatIssueForClipboard(mockIssue)
      expect(formatted).toContain('CRITICAL:')
    })

    it('should include line number in file path', () => {
      const formatted = formatIssueForClipboard(mockIssue)
      expect(formatted).toContain('/src/test.cpp:42')
    })

    it('should not have leading or trailing whitespace', () => {
      const formatted = formatIssueForClipboard(mockIssue)
      expect(formatted).toBe(formatted.trim())
    })

    it('should format multiline code snippets correctly', () => {
      const issueWithMultiline: Issue = {
        ...mockIssue,
        codeSnippet: 'line1\nline2\nline3',
      }

      const formatted = formatIssueForClipboard(issueWithMultiline)
      expect(formatted).toContain('line1\nline2\nline3')
    })
  })

  describe('Integration: Copy formatted issue', () => {
    it('should copy formatted issue to clipboard', async () => {
      const formatted = formatIssueForClipboard(mockIssue)
      const result = await copyToClipboard(formatted)

      expect(result).toBe(true)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(formatted)
    })
  })
})
