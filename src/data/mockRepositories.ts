import type { Repository } from '../types/repository'

export const mockRepositories: Repository[] = [
  {
    id: 'repo-1',
    name: 'payment-gateway',
    owner: 'stripe',
    language: 'C++',
    description: 'High-performance payment processing engine with formal verification',
    stars: 12543,
    lastUpdated: '2025-12-01T10:30:00Z',
    issueCount: 23,
    criticalIssues: 3,
    highIssues: 8,
    mediumIssues: 9,
    lowIssues: 3,
    fileTree: [
      {
        name: 'src',
        type: 'folder',
        path: '/src',
        issueCount: 15,
        children: [
          {
            name: 'payment.cpp',
            type: 'file',
            path: '/src/payment.cpp',
            issueCount: 5,
          },
          {
            name: 'validation.cpp',
            type: 'file',
            path: '/src/validation.cpp',
            issueCount: 3,
          },
        ],
      },
      {
        name: 'tests',
        type: 'folder',
        path: '/tests',
        issueCount: 0,
        children: [
          {
            name: 'payment.test.cpp',
            type: 'file',
            path: '/tests/payment.test.cpp',
            issueCount: 0,
          },
        ],
      },
    ],
    issues: [
      'issue-1',
      'issue-2',
      'issue-3',
      'issue-4',
      'issue-5',
      'issue-6',
      'issue-7',
      'issue-8',
      'issue-9',
      'issue-10',
    ],
  },
  {
    id: 'repo-2',
    name: 'compiler-optimizer',
    owner: 'meta',
    language: 'C++',
    description: 'LLVM-based compiler optimization framework',
    stars: 8921,
    lastUpdated: '2025-11-28T15:45:00Z',
    issueCount: 15,
    criticalIssues: 1,
    highIssues: 4,
    mediumIssues: 7,
    lowIssues: 3,
    fileTree: [
      {
        name: 'optimizer',
        type: 'folder',
        path: '/optimizer',
        issueCount: 10,
        children: [
          {
            name: 'ast.cpp',
            type: 'file',
            path: '/optimizer/ast.cpp',
            issueCount: 4,
          },
          {
            name: 'codegen.cpp',
            type: 'file',
            path: '/optimizer/codegen.cpp',
            issueCount: 6,
          },
        ],
      },
      {
        name: 'runtime',
        type: 'folder',
        path: '/runtime',
        issueCount: 5,
        children: [
          {
            name: 'memory.cpp',
            type: 'file',
            path: '/runtime/memory.cpp',
            issueCount: 5,
          },
        ],
      },
    ],
    issues: ['issue-11', 'issue-12', 'issue-13', 'issue-14', 'issue-15'],
  },
]
