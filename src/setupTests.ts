import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { createElement } from 'react'

// Mock react-syntax-highlighter to avoid ESM issues in tests
vi.mock('react-syntax-highlighter', () => ({
  Prism: ({ children, language }: { children: React.ReactNode; language: string }) =>
    createElement('pre', { language }, createElement('code', null, children)),
}))

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  vs: {},
}))
