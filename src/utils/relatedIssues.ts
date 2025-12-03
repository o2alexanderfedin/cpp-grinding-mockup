/**
 * Related Issues Utility
 *
 * Functions to find and score related issues based on:
 * - Same file (highest priority)
 * - Same category
 * - Same severity
 * - Line proximity (for same file)
 */

import type { Issue } from '../types/issue'

/**
 * Calculate relevance score between two issues
 *
 * Scoring system:
 * - Same file: +10 points
 * - Same category: +5 points
 * - Same severity: +3 points
 * - Nearby lines (same file only): up to +5 points based on distance
 */
export function calculateRelevanceScore(current: Issue, other: Issue): number {
  let score = 0

  // Same file: +10 points (highest priority)
  if (current.file === other.file) {
    score += 10

    // Nearby lines bonus (only for same file): up to +5 points
    const distance = Math.abs(current.line - other.line)
    if (distance <= 20) {
      // Linear decay: 0 distance = +5, 20 distance = 0
      score += Math.max(0, 5 - distance / 4)
    }
  }

  // Same category: +5 points
  if (current.category === other.category) {
    score += 5
  }

  // Same severity: +3 points
  if (current.severity === other.severity) {
    score += 3
  }

  return score
}

/**
 * Find related issues for a given issue
 *
 * @param currentIssue - The issue to find related issues for
 * @param allIssues - All available issues
 * @param maxResults - Maximum number of related issues to return (default: 5)
 * @returns Array of related issues, sorted by relevance (highest first)
 */
export function findRelatedIssues(
  currentIssue: Issue,
  allIssues: Issue[],
  maxResults: number = 5
): Issue[] {
  return (
    allIssues
      // Exclude the current issue
      .filter(issue => issue.id !== currentIssue.id)
      // Calculate score for each issue
      .map(issue => ({
        issue,
        score: calculateRelevanceScore(currentIssue, issue),
      }))
      // Sort by score (highest first)
      .sort((a, b) => b.score - a.score)
      // Take top N results
      .slice(0, maxResults)
      // Filter out zero-score issues
      .filter(item => item.score > 0)
      // Extract just the issues
      .map(item => item.issue)
  )
}
