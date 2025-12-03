import { describe, it, expect } from 'vitest'
import { mockRepositories } from '../data/mockRepositories'
import type { FileNode } from '../types/repository'

describe('Story #22: File Tree Data Structure', () => {
  describe('FileNode structure validation', () => {
    it('should have valid FileNode structure for all repositories', () => {
      mockRepositories.forEach(repo => {
        expect(repo.fileTree).toBeDefined()
        expect(Array.isArray(repo.fileTree)).toBe(true)
        expect(repo.fileTree.length).toBeGreaterThan(0)
      })
    })

    it('should have required properties on each FileNode', () => {
      const validateNode = (node: FileNode): void => {
        expect(node.id).toBeDefined()
        expect(typeof node.id).toBe('string')
        expect(node.name).toBeDefined()
        expect(typeof node.name).toBe('string')
        expect(node.type).toBeDefined()
        expect(['file', 'directory']).toContain(node.type)
        expect(node.path).toBeDefined()
        expect(typeof node.path).toBe('string')
        expect(node.issueCount).toBeDefined()
        expect(typeof node.issueCount).toBe('number')
        expect(node.criticalIssues).toBeDefined()
        expect(typeof node.criticalIssues).toBe('number')
        expect(node.highIssues).toBeDefined()
        expect(typeof node.highIssues).toBe('number')
        expect(node.mediumIssues).toBeDefined()
        expect(typeof node.mediumIssues).toBe('number')
        expect(node.lowIssues).toBeDefined()
        expect(typeof node.lowIssues).toBe('number')

        if (node.type === 'directory') {
          expect(node.children).toBeDefined()
          expect(Array.isArray(node.children)).toBe(true)
          if (node.children && node.children.length > 0) {
            node.children.forEach(child => validateNode(child))
          }
        } else {
          expect(node.children).toBeUndefined()
        }

        if (node.type === 'file' && node.extension) {
          expect(['.cpp', '.h', '.hpp']).toContain(node.extension)
        }
      }

      mockRepositories.forEach(repo => {
        repo.fileTree.forEach(node => validateNode(node))
      })
    })

    it('should have realistic C++ project structure (src/, include/)', () => {
      const stripeRepo = mockRepositories.find(r => r.id === 'repo-1')
      expect(stripeRepo).toBeDefined()

      if (stripeRepo) {
        const srcFolder = stripeRepo.fileTree.find(n => n.name === 'src')
        const includeFolder = stripeRepo.fileTree.find(n => n.name === 'include')

        expect(srcFolder).toBeDefined()
        expect(srcFolder?.type).toBe('directory')
        expect(includeFolder).toBeDefined()
        expect(includeFolder?.type).toBe('directory')
      }
    })
  })

  describe('Issue count aggregation', () => {
    it('should aggregate issue counts from files to parent directories', () => {
      const validateAggregation = (node: FileNode): void => {
        if (node.type === 'directory' && node.children && node.children.length > 0) {
          const childrenTotal = node.children.reduce((sum, child) => sum + child.issueCount, 0)
          expect(node.issueCount).toBe(childrenTotal)

          const childrenCritical = node.children.reduce((sum, child) => sum + child.criticalIssues, 0)
          expect(node.criticalIssues).toBe(childrenCritical)

          const childrenHigh = node.children.reduce((sum, child) => sum + child.highIssues, 0)
          expect(node.highIssues).toBe(childrenHigh)

          const childrenMedium = node.children.reduce((sum, child) => sum + child.mediumIssues, 0)
          expect(node.mediumIssues).toBe(childrenMedium)

          const childrenLow = node.children.reduce((sum, child) => sum + child.lowIssues, 0)
          expect(node.lowIssues).toBe(childrenLow)

          node.children.forEach(child => validateAggregation(child))
        }
      }

      mockRepositories.forEach(repo => {
        repo.fileTree.forEach(node => validateAggregation(node))
      })
    })

    it('should have correct total issue count at repository level', () => {
      const calculateTotalIssues = (nodes: FileNode[]): number => {
        return nodes.reduce((sum, node) => {
          if (node.type === 'file') {
            return sum + node.issueCount
          } else if (node.children) {
            return sum + calculateTotalIssues(node.children)
          }
          return sum
        }, 0)
      }

      mockRepositories.forEach(repo => {
        const totalFromFiles = calculateTotalIssues(repo.fileTree)
        expect(repo.issueCount).toBe(totalFromFiles)
      })
    })
  })

  describe('Path generation', () => {
    it('should have correct path for all nodes', () => {
      const validatePath = (node: FileNode, expectedPrefix: string): void => {
        expect(node.path.startsWith(expectedPrefix)).toBe(true)

        if (node.type === 'directory' && node.children) {
          node.children.forEach(child => {
            validatePath(child, node.path)
          })
        }
      }

      mockRepositories.forEach(repo => {
        repo.fileTree.forEach(node => {
          validatePath(node, '/')
        })
      })
    })

    it('should have unique IDs for all nodes', () => {
      const collectIds = (nodes: FileNode[]): string[] => {
        return nodes.reduce<string[]>((ids, node) => {
          ids.push(node.id)
          if (node.children) {
            ids.push(...collectIds(node.children))
          }
          return ids
        }, [])
      }

      mockRepositories.forEach(repo => {
        const allIds = collectIds(repo.fileTree)
        const uniqueIds = new Set(allIds)
        expect(uniqueIds.size).toBe(allIds.length)
      })
    })
  })

  describe('Stripe payment-gateway repository', () => {
    it('should have complete file tree structure', () => {
      const stripeRepo = mockRepositories.find(r => r.id === 'repo-1')
      expect(stripeRepo).toBeDefined()

      if (stripeRepo) {
        expect(stripeRepo.fileTree.length).toBeGreaterThan(0)

        const srcFolder = stripeRepo.fileTree.find(n => n.name === 'src')
        expect(srcFolder).toBeDefined()
        expect(srcFolder?.children?.length).toBeGreaterThan(0)

        const paymentFile = srcFolder?.children?.find(n => n.name === 'PaymentProcessor.cpp')
        expect(paymentFile).toBeDefined()
        expect(paymentFile?.type).toBe('file')
        expect(paymentFile?.extension).toBe('.cpp')
      }
    })
  })

  describe('Meta compiler-optimizer repository', () => {
    it('should have complete file tree structure', () => {
      const metaRepo = mockRepositories.find(r => r.id === 'repo-2')
      expect(metaRepo).toBeDefined()

      if (metaRepo) {
        expect(metaRepo.fileTree.length).toBeGreaterThan(0)

        const srcFolder = metaRepo.fileTree.find(n => n.name === 'src')
        expect(srcFolder).toBeDefined()
        expect(srcFolder?.children?.length).toBeGreaterThan(0)
      }
    })
  })
})
