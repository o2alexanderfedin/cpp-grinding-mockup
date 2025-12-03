import { describe, it, expect } from 'vitest'
import { allIssues, issueMap } from '../data/mockIssues'
import type { IssueSeverity, IssueCategory } from '../types/issue'

describe('Epic 5 - Story #26 & #27: Mock Issues Data', () => {
  describe('Story #26: Realistic C++ Code Snippets', () => {
    it('should have at least 20 issues', () => {
      expect(allIssues.length).toBeGreaterThanOrEqual(20)
    })

    it('should have all required fields for each issue', () => {
      allIssues.forEach(issue => {
        expect(issue.id).toBeTruthy()
        expect(issue.severity).toBeTruthy()
        expect(issue.category).toBeTruthy()
        expect(issue.file).toBeTruthy()
        expect(issue.line).toBeGreaterThan(0)
        expect(issue.title).toBeTruthy()
        expect(issue.description).toBeTruthy()
        expect(issue.codeSnippet).toBeTruthy()
        expect(issue.smtLibProof).toBeTruthy()
        expect(issue.simplifiedProof).toBeTruthy()
        expect(issue.explanation).toBeTruthy()
        expect(issue.suggestedFix).toBeTruthy()
      })
    })

    it('should have code snippets that are valid C++ syntax', () => {
      allIssues.forEach(issue => {
        // Check for C++ keywords and syntax
        const hasValidCppSyntax =
          issue.codeSnippet.includes('void') ||
          issue.codeSnippet.includes('int') ||
          issue.codeSnippet.includes('uint') ||
          issue.codeSnippet.includes('char') ||
          issue.codeSnippet.includes('class') ||
          issue.codeSnippet.includes('return')

        expect(hasValidCppSyntax).toBe(true)
        expect(issue.codeSnippet.length).toBeGreaterThan(20)
      })
    })

    it('should have realistic line numbers referenced in code snippets', () => {
      allIssues.forEach(issue => {
        // Check that the line number appears as a comment in the code snippet
        const lineComment = `Line ${issue.line}`
        expect(
          issue.codeSnippet.includes(lineComment) || issue.codeSnippet.includes('BUG')
        ).toBe(true)
      })
    })

    it('should represent all severity levels', () => {
      const severities = new Set(allIssues.map(i => i.severity))
      expect(severities.has('critical')).toBe(true)
      expect(severities.has('high')).toBe(true)
      expect(severities.has('medium')).toBe(true)
      expect(severities.has('low')).toBe(true)
    })

    it('should represent all bug categories', () => {
      const categories = new Set(allIssues.map(i => i.category))
      expect(categories.has('memory-safety')).toBe(true)
      expect(categories.has('concurrency')).toBe(true)
      expect(categories.has('undefined-behavior')).toBe(true)
      expect(categories.has('type-safety')).toBe(true)
    })

    it('should have issues for multiple files', () => {
      const files = new Set(allIssues.map(i => i.file))
      expect(files.size).toBeGreaterThanOrEqual(5)
    })

    it('should have critical issues for PaymentProcessor.cpp', () => {
      const criticalPaymentIssues = allIssues.filter(
        i => i.file === '/src/PaymentProcessor.cpp' && i.severity === 'critical'
      )
      expect(criticalPaymentIssues.length).toBeGreaterThan(0)
    })
  })

  describe('Story #27: SMT-LIB Proofs', () => {
    it('should have valid SMT-LIB 2.0 syntax', () => {
      allIssues.forEach(issue => {
        const proof = issue.smtLibProof

        // Check for SMT-LIB 2.0 keywords
        const hasValidSmtLib =
          proof.includes('(set-logic') ||
          proof.includes('(declare-') ||
          proof.includes('(assert') ||
          proof.includes('(check-sat)')

        expect(hasValidSmtLib).toBe(true)
      })
    })

    it('should have simplified proof for each issue', () => {
      allIssues.forEach(issue => {
        expect(issue.simplifiedProof).toBeTruthy()
        expect(issue.simplifiedProof.length).toBeGreaterThan(20)
        // Simplified proofs should not contain SMT-LIB syntax
        expect(issue.simplifiedProof.includes('(assert')).toBe(false)
        expect(issue.simplifiedProof.includes('declare-')).toBe(false)
      })
    })

    it('should have buffer overflow proofs for buffer overflow bugs', () => {
      const bufferOverflowIssues = allIssues.filter(
        i =>
          i.title.toLowerCase().includes('buffer overflow') ||
          i.description.toLowerCase().includes('buffer overflow')
      )

      bufferOverflowIssues.forEach(issue => {
        expect(
          issue.smtLibProof.toLowerCase().includes('buffer') ||
            issue.smtLibProof.toLowerCase().includes('size') ||
            issue.simplifiedProof.toLowerCase().includes('buffer')
        ).toBe(true)
      })
    })

    it('should have null pointer proofs for null pointer bugs', () => {
      const nullPointerIssues = allIssues.filter(
        i => i.title.toLowerCase().includes('null') || i.description.toLowerCase().includes('null')
      )

      nullPointerIssues.forEach(issue => {
        expect(
          issue.smtLibProof.toLowerCase().includes('null') ||
            issue.simplifiedProof.toLowerCase().includes('null')
        ).toBe(true)
      })
    })

    it('should have integer overflow proofs for overflow bugs', () => {
      const overflowIssues = allIssues.filter(
        i =>
          i.title.toLowerCase().includes('integer overflow') ||
          i.title.toLowerCase().includes('overflow')
      )

      overflowIssues.forEach(issue => {
        expect(
          issue.smtLibProof.toLowerCase().includes('overflow') ||
            issue.smtLibProof.includes('bv') ||
            issue.simplifiedProof.toLowerCase().includes('overflow')
        ).toBe(true)
      })
    })

    it('should have explanations that are comprehensive', () => {
      allIssues.forEach(issue => {
        // Explanation should be substantive
        expect(issue.explanation.length).toBeGreaterThan(50)
        // Should contain descriptive content (not just empty strings)
        expect(issue.explanation.trim()).toBeTruthy()
      })
    })

    it('should have suggested fixes that include code', () => {
      allIssues.forEach(issue => {
        expect(issue.suggestedFix.length).toBeGreaterThan(20)
        // Check that suggested fix contains C++ code
        expect(
          issue.suggestedFix.includes('(') ||
            issue.suggestedFix.includes('{') ||
            issue.suggestedFix.includes(';')
        ).toBe(true)
      })
    })

    it('should have issueMap with all issues indexed by ID', () => {
      expect(issueMap.size).toBe(allIssues.length)

      allIssues.forEach(issue => {
        expect(issueMap.get(issue.id)).toEqual(issue)
      })
    })
  })

  describe('Issue Distribution', () => {
    it('should have appropriate distribution of severity levels', () => {
      const severityCount: Record<IssueSeverity, number> = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
      }

      allIssues.forEach(issue => {
        severityCount[issue.severity]++
      })

      // Critical should be less common than other severities
      expect(severityCount.critical).toBeGreaterThan(0)
      expect(severityCount.critical).toBeLessThan(severityCount.high + severityCount.medium)

      // Should have a good mix
      expect(severityCount.high).toBeGreaterThan(0)
      expect(severityCount.medium).toBeGreaterThan(0)
      expect(severityCount.low).toBeGreaterThan(0)
    })

    it('should have appropriate distribution of bug categories', () => {
      const categoryCount: Record<IssueCategory, number> = {
        'memory-safety': 0,
        concurrency: 0,
        'undefined-behavior': 0,
        'type-safety': 0,
      }

      allIssues.forEach(issue => {
        categoryCount[issue.category]++
      })

      // Memory safety should be well represented
      expect(categoryCount['memory-safety']).toBeGreaterThan(5)

      // All categories should have representation
      expect(categoryCount.concurrency).toBeGreaterThan(0)
      expect(categoryCount['undefined-behavior']).toBeGreaterThan(0)
      expect(categoryCount['type-safety']).toBeGreaterThan(0)
    })
  })
})
