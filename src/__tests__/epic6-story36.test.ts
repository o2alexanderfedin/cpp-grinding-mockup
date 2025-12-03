/**
 * Epic 6 - Story #36: Related Issues Suggestions - Algorithm Tests
 *
 * Tests for the related issues suggestion algorithm that finds
 * similar issues based on file, category, severity, and line proximity.
 */

import { describe, it, expect } from 'vitest'
import { findRelatedIssues, calculateRelevanceScore } from '../utils/relatedIssues'
import { createMockIssue } from './testHelpers'

describe('Epic 6 - Story #36: Related Issues Algorithm', () => {
  describe('calculateRelevanceScore', () => {
    it('should give highest score (10+) for same file issues', () => {
      const current = createMockIssue({
        id: '1',
        file: '/src/PaymentProcessor.cpp',
        line: 100,
        category: 'memory-safety',
        severity: 'critical',
      })

      const sameFile = createMockIssue({
        id: '2',
        file: '/src/PaymentProcessor.cpp',
        line: 150,
        category: 'concurrency',
        severity: 'high',
      })

      const score = calculateRelevanceScore(current, sameFile)
      expect(score).toBeGreaterThanOrEqual(10)
    })

    it('should add 5 points for same category', () => {
      const current = createMockIssue({
        id: '1',
        category: 'memory-safety',
        severity: 'critical',
        file: '/src/file1.cpp',
        line: 100,
      })

      const sameCategory = createMockIssue({
        id: '2',
        category: 'memory-safety',
        severity: 'high',
        file: '/src/file2.cpp',
        line: 100,
      })

      const score = calculateRelevanceScore(current, sameCategory)
      expect(score).toBe(5) // Only category matches
    })

    it('should add 3 points for same severity', () => {
      const current = createMockIssue({
        id: '1',
        category: 'memory-safety',
        severity: 'critical',
        file: '/src/file1.cpp',
        line: 100,
      })

      const sameSeverity = createMockIssue({
        id: '2',
        category: 'concurrency',
        severity: 'critical',
        file: '/src/file2.cpp',
        line: 100,
      })

      const score = calculateRelevanceScore(current, sameSeverity)
      expect(score).toBe(3) // Only severity matches
    })

    it('should boost score for nearby lines in same file', () => {
      const current = createMockIssue({
        id: '1',
        file: '/src/PaymentProcessor.cpp',
        line: 100,
        category: 'memory-safety',
        severity: 'critical',
      })

      const nearbyLine = createMockIssue({
        id: '2',
        file: '/src/PaymentProcessor.cpp',
        line: 105, // 5 lines away
        category: 'concurrency',
        severity: 'high',
      })

      const score = calculateRelevanceScore(current, nearbyLine)
      // Same file (10) + nearby line bonus (up to 5)
      expect(score).toBeGreaterThan(10)
      expect(score).toBeLessThanOrEqual(15)
    })

    it('should not give proximity bonus for different files', () => {
      const current = createMockIssue({
        id: '1',
        file: '/src/file1.cpp',
        line: 100,
        category: 'memory-safety',
        severity: 'critical',
      })

      const differentFile = createMockIssue({
        id: '2',
        file: '/src/file2.cpp',
        line: 105, // Would be nearby if same file
        category: 'memory-safety',
        severity: 'critical',
      })

      const score = calculateRelevanceScore(current, differentFile)
      expect(score).toBe(8) // category (5) + severity (3), no proximity bonus
    })

    it('should combine multiple factors', () => {
      const current = createMockIssue({
        id: '1',
        file: '/src/PaymentProcessor.cpp',
        line: 100,
        category: 'memory-safety',
        severity: 'critical',
      })

      const related = createMockIssue({
        id: '2',
        file: '/src/PaymentProcessor.cpp',
        line: 110, // 10 lines away
        category: 'memory-safety',
        severity: 'critical',
      })

      const score = calculateRelevanceScore(current, related)
      // Same file (10) + same category (5) + same severity (3) + proximity bonus
      expect(score).toBeGreaterThan(18)
    })

    it('should return 0 for completely unrelated issues', () => {
      const current = createMockIssue({
        id: '1',
        file: '/src/file1.cpp',
        line: 100,
        category: 'memory-safety',
        severity: 'critical',
      })

      const unrelated = createMockIssue({
        id: '2',
        file: '/src/file2.cpp',
        line: 500,
        category: 'type-safety',
        severity: 'low',
      })

      const score = calculateRelevanceScore(current, unrelated)
      expect(score).toBe(0)
    })
  })

  describe('findRelatedIssues', () => {
    it('should exclude the current issue from results', () => {
      const current = createMockIssue({ id: '1' })
      const allIssues = [
        current,
        createMockIssue({ id: '2' }),
        createMockIssue({ id: '3' }),
      ]

      const related = findRelatedIssues(current, allIssues)

      expect(related).not.toContainEqual(current)
      expect(related.every(issue => issue?.id !== '1')).toBe(true)
    })

    it('should sort issues by relevance score (highest first)', () => {
      const current = createMockIssue({
        id: '1',
        file: '/src/PaymentProcessor.cpp',
        line: 100,
        category: 'memory-safety',
        severity: 'critical',
      })

      const allIssues = [
        current,
        createMockIssue({
          id: '2',
          file: '/src/other.cpp',
          category: 'type-safety',
          severity: 'low',
        }), // Low score
        createMockIssue({
          id: '3',
          file: '/src/PaymentProcessor.cpp',
          line: 105,
          category: 'memory-safety',
          severity: 'critical',
        }), // High score
        createMockIssue({
          id: '4',
          file: '/src/PaymentProcessor.cpp',
          line: 200,
          category: 'concurrency',
          severity: 'high',
        }), // Medium score
      ]

      const related = findRelatedIssues(current, allIssues)

      // Issue 3 should be first (same file + category + severity + nearby)
      expect(related[0]?.id).toBe('3')
      // Issue 4 should be second (same file)
      expect(related[1]?.id).toBe('4')
    })

    it('should limit results to maxResults parameter', () => {
      const current = createMockIssue({ id: '1', file: '/src/test.cpp' })

      const allIssues = [
        current,
        ...Array.from({ length: 10 }, (_, i) =>
          createMockIssue({ id: `${i + 2}`, file: '/src/test.cpp' })
        ),
      ]

      const related = findRelatedIssues(current, allIssues, 5)
      expect(related.length).toBe(5)
    })

    it('should default to 5 results when maxResults not specified', () => {
      const current = createMockIssue({ id: '1', file: '/src/test.cpp' })

      const allIssues = [
        current,
        ...Array.from({ length: 10 }, (_, i) =>
          createMockIssue({ id: `${i + 2}`, file: '/src/test.cpp' })
        ),
      ]

      const related = findRelatedIssues(current, allIssues)
      expect(related.length).toBe(5)
    })

    it('should filter out issues with zero score', () => {
      const current = createMockIssue({
        id: '1',
        file: '/src/file1.cpp',
        category: 'memory-safety',
        severity: 'critical',
      })

      const allIssues = [
        current,
        createMockIssue({
          id: '2',
          file: '/src/file1.cpp',
          category: 'memory-safety',
          severity: 'critical',
        }), // High score
        createMockIssue({
          id: '3',
          file: '/src/file2.cpp',
          category: 'type-safety',
          severity: 'low',
        }), // Zero score
      ]

      const related = findRelatedIssues(current, allIssues)

      expect(related.length).toBe(1)
      expect(related[0]?.id).toBe('2')
    })

    it('should return empty array when no related issues found', () => {
      const current = createMockIssue({
        id: '1',
        file: '/src/file1.cpp',
        category: 'memory-safety',
        severity: 'critical',
      })

      const allIssues = [
        current,
        createMockIssue({
          id: '2',
          file: '/src/file2.cpp',
          category: 'type-safety',
          severity: 'low',
        }),
      ]

      const related = findRelatedIssues(current, allIssues)
      expect(related).toEqual([])
    })

    it('should handle empty allIssues array', () => {
      const current = createMockIssue({ id: '1' })
      const related = findRelatedIssues(current, [])
      expect(related).toEqual([])
    })
  })
})
