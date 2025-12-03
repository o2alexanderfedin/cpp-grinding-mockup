# Codebase Architecture & Conventions
**Project**: C++ Grinding Mockup - Formal Verification Linter
**Tech Stack**: React 18 + TypeScript + Redux Toolkit + Material-UI v5 + Vite
**Created**: 2025-12-03
**Version**: 1.0

---

## Technology Stack Summary

### Core Framework
- **React**: 18.x (latest stable)
- **TypeScript**: 5.x (strict mode enabled)
- **Build Tool**: Vite 5.x
- **Node Version**: 20+ LTS

### State Management
- **Redux Toolkit**: 2.x (createSlice, createAsyncThunk, Reselect)
- **React-Redux**: 9.x (hooks: useAppDispatch, useAppSelector)

### UI Framework
- **Material-UI**: v5 (@mui/material, @emotion/react, @emotion/styled)
- **Icons**: @mui/icons-material
- **Theming**: Custom macOS aesthetic theme

### Routing
- **React Router**: v6 (useNavigate, useParams hooks)

### Animations
- **Framer Motion**: For complex animations (drawer, modal, page transitions)
- **CSS Transitions**: For simple hover/focus states

### PWA
- **vite-plugin-pwa**: For service worker generation
- **Workbox**: Automatic caching strategies

### Testing
- **Vitest**: Unit test framework (Vite-native)
- **@testing-library/react**: Component testing
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: DOM matchers

### Code Quality
- **ESLint**: Linting with TypeScript rules
- **Prettier**: Code formatting
- **TypeScript**: Strict mode type checking

### Syntax Highlighting (Epic 6)
- **Prism.js** or **highlight.js**: For C++ and SMT-LIB syntax highlighting

---

## Directory Structure

```
cpp-grinding-mockup/
├── .git/                           # Git repository
├── .github/                        # GitHub templates and workflows
├── .prompts/                       # Execution prompts and documentation
│   └── 001-github-stories-execution-do/
│       ├── ROADMAP.md             # This execution roadmap
│       ├── CODEBASE.md            # Architecture documentation (this file)
│       ├── PROGRESS.md            # Story completion tracker
│       └── stories/               # Story-specific analysis and test plans
│           ├── epic-1/
│           ├── epic-2/
│           └── ...
├── .requirements/                  # Product requirements
│   ├── PRD.md                     # Product Requirements Document
│   └── EPICS.md                   # Epic definitions
├── .architecture/                  # Technical architecture
│   └── ARCHITECTURE.md            # Technical architecture document
├── public/                        # Static assets
│   ├── manifest.json              # PWA manifest
│   ├── icons/                     # App icons (192x192, 512x512)
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   └── index.html                 # HTML template
├── src/                           # Source code
│   ├── app/                       # Redux store configuration
│   │   ├── store.ts               # Redux store setup
│   │   ├── rootReducer.ts         # Combine all slices
│   │   └── hooks.ts               # Typed useAppDispatch, useAppSelector
│   ├── features/                  # Feature modules (vertical slices)
│   │   ├── connection/            # GitHub connection flow
│   │   │   ├── connectionSlice.ts # Redux slice
│   │   │   ├── ConnectButton.tsx  # Container component
│   │   │   ├── ConnectionStatus.tsx # Presentation component
│   │   │   └── __tests__/         # Feature tests
│   │   ├── repositories/          # Repository selection
│   │   │   ├── repositoriesSlice.ts
│   │   │   ├── RepositoryDashboard.tsx
│   │   │   ├── RepositoryCard.tsx
│   │   │   ├── RepositorySelector.tsx
│   │   │   └── __tests__/
│   │   ├── analysis/              # Formal verification analysis
│   │   │   ├── analysisSlice.ts
│   │   │   ├── AnalysisButton.tsx
│   │   │   ├── ResultsDrawer.tsx
│   │   │   ├── IssueList.tsx
│   │   │   ├── IssueCard.tsx
│   │   │   ├── IssueDetailModal.tsx
│   │   │   ├── CodeSnippet.tsx
│   │   │   ├── FormalProof.tsx
│   │   │   ├── IssueExplanation.tsx
│   │   │   ├── SuggestedFix.tsx
│   │   │   └── __tests__/
│   │   ├── export/                # AI agent integration
│   │   │   ├── ExportButton.tsx
│   │   │   ├── JsonExportModal.tsx
│   │   │   ├── CopyToClipboard.tsx
│   │   │   └── __tests__/
│   │   └── fileTree/              # File tree visualization
│   │       ├── FileTreeView.tsx
│   │       ├── FileTreeNode.tsx
│   │       ├── FileIcon.tsx
│   │       └── __tests__/
│   ├── pages/                     # Route page components
│   │   ├── LandingPage.tsx        # Route: /
│   │   ├── RepositoryDashboard.tsx # Route: /dashboard
│   │   ├── RepositoryView.tsx     # Route: /repo/:repoId
│   │   └── __tests__/
│   ├── components/                # Shared/reusable components
│   │   ├── LoadingSpinner.tsx
│   │   ├── MetricCard.tsx
│   │   ├── TabPanel.tsx
│   │   ├── Header.tsx             # Hupyy branding
│   │   ├── Hero.tsx               # Landing page hero
│   │   └── __tests__/
│   ├── theme/                     # Material-UI theming
│   │   ├── macosTheme.ts          # Custom macOS theme
│   │   └── __tests__/
│   ├── types/                     # TypeScript type definitions
│   │   ├── repository.ts          # Repository, FileNode interfaces
│   │   ├── issue.ts               # Issue interface
│   │   ├── connection.ts          # Connection state types
│   │   └── index.ts               # Re-exports
│   ├── utils/                     # Utility functions
│   │   ├── jsonSerializer.ts      # Issue → JSON export
│   │   ├── mockData.ts            # Mock repository and issue data
│   │   └── __tests__/
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # Entry point
│   ├── serviceWorkerRegistration.ts # PWA service worker
│   └── vite-env.d.ts              # Vite type definitions
├── tests/                         # Integration tests
│   └── integration/
│       ├── pwa-installation.test.ts
│       ├── user-flow.test.ts
│       └── ...
├── .eslintrc.cjs                  # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite build configuration
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependencies
└── README.md                      # Project documentation
```

---

## TypeScript Configuration

### tsconfig.json (Strict Mode)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Strict Type Checking */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@app/*": ["src/app/*"],
      "@features/*": ["src/features/*"],
      "@components/*": ["src/components/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"],
      "@theme/*": ["src/theme/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Key Points**:
- **Strict Mode**: All strict flags enabled
- **No `any` Types**: noImplicitAny enforces explicit typing
- **Null Safety**: strictNullChecks prevents null reference errors
- **Index Safety**: noUncheckedIndexedAccess prevents array/object access errors
- **Path Aliases**: @ prefixes for cleaner imports

---

## Testing Framework

### Vitest Configuration (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/**/*'],
      manifest: {
        // ... manifest config
      },
      workbox: {
        // ... workbox strategies
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/__tests__/**',
        'src/main.tsx',
        'src/vite-env.d.ts'
      ]
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@app': '/src/app',
      '@features': '/src/features',
      '@components': '/src/components',
      '@types': '/src/types',
      '@utils': '/src/utils',
      '@theme': '/src/theme'
    }
  }
})
```

### Test Patterns

#### Unit Test Example
```typescript
// src/features/connection/connectionSlice.test.ts
import { describe, it, expect } from 'vitest'
import connectionReducer, { connectToGitHub, selectConnectionStatus } from './connectionSlice'

describe('connectionSlice', () => {
  it('should have initial state of disconnected', () => {
    const state = connectionReducer(undefined, { type: 'unknown' })
    expect(state.status).toBe('disconnected')
  })

  it('should transition to connecting when connectToGitHub is pending', () => {
    const state = connectionReducer(
      { status: 'disconnected' },
      connectToGitHub.pending('', undefined)
    )
    expect(state.status).toBe('connecting')
  })

  it('should transition to connected when connectToGitHub is fulfilled', () => {
    const state = connectionReducer(
      { status: 'connecting' },
      connectToGitHub.fulfilled(undefined, '', undefined)
    )
    expect(state.status).toBe('connected')
  })
})
```

#### Component Test Example
```typescript
// src/components/LoadingSpinner.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('should render without crashing', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should have aria-label for accessibility', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading')
  })
})
```

---

## Linting and Formatting

### ESLint Configuration

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
```

**Key Rules**:
- **No `any` Types**: Error on explicit any
- **No Unused Vars**: Error on unused variables (except `_` prefix)
- **No Console Logs**: Warn on console.log (allow warn/error)

### Prettier Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

---

## Build and Development Scripts

### package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\"",
    "type-check": "tsc --noEmit"
  }
}
```

**Usage**:
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run tests in watch mode
- `npm run test:coverage`: Generate coverage report
- `npm run lint`: Check for linting errors
- `npm run format`: Format all code
- `npm run type-check`: TypeScript type checking without emitting files

---

## Database Constraints (CRITICAL)

### PostgreSQL Connection
**Host**: localhost
**Port**: 5434
**Database**: oilfield
**User**: oilfield
**Password**: oilfield_dev
**Connection URL**: postgresql://oilfield:oilfield_dev@localhost:5434/oilfield

### IMPORTANT RULES (From CLAUDE.md)

**DO NOT MODIFY DATABASE**:
- ❌ NEVER touch database schema
- ❌ NEVER run migrations
- ❌ NEVER modify existing data
- ❌ NEVER delete or re-insert data
- ❌ NEVER run seed scripts

**Rationale**: This project is a pure frontend PWA mockup with NO BACKEND. The database connection information exists in the parent project but is NOT USED for this mockup. All data is hardcoded in Redux initial state.

---

## Component Patterns

### Presentation vs Container Components

**Presentation Component** (Pure UI):
```typescript
// src/features/repositories/RepositoryCard.tsx
import type { FC } from 'react'
import { Card, CardContent, Typography, Chip } from '@mui/material'

interface RepositoryCardProps {
  readonly name: string
  readonly owner: string
  readonly language: string
  readonly description: string
  readonly onSelect: (repoId: string) => void
}

export const RepositoryCard: FC<RepositoryCardProps> = ({
  name,
  owner,
  language,
  description,
  onSelect
}) => {
  return (
    <Card onClick={() => onSelect(`${owner}/${name}`)} sx={{ cursor: 'pointer' }}>
      <CardContent>
        <Typography variant="h6">{owner}/{name}</Typography>
        <Chip label={language} size="small" />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}
```

**Container Component** (Redux-connected):
```typescript
// src/features/repositories/RepositorySelector.tsx
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { selectRepository, selectAllRepositories } from './repositoriesSlice'
import { RepositoryCard } from './RepositoryCard'

export const RepositorySelector: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const repositories = useAppSelector(selectAllRepositories)

  const handleSelect = (repoId: string) => {
    dispatch(selectRepository(repoId))
    navigate(`/repo/${repoId}`)
  }

  return (
    <div>
      {repositories.map(repo => (
        <RepositoryCard
          key={repo.id}
          name={repo.name}
          owner={repo.owner}
          language={repo.language}
          description={repo.description}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}
```

### Redux Slice Pattern

```typescript
// src/features/connection/connectionSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '@app/store'

// Types
type ConnectionStatus = 'disconnected' | 'connecting' | 'connected'

interface ConnectionState {
  status: ConnectionStatus
}

// Initial State
const initialState: ConnectionState = {
  status: 'disconnected'
}

// Async Thunks
export const connectToGitHub = createAsyncThunk(
  'connection/connect',
  async () => {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    return undefined
  }
)

// Slice
const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    disconnect: state => {
      state.status = 'disconnected'
    }
  },
  extraReducers: builder => {
    builder
      .addCase(connectToGitHub.pending, state => {
        state.status = 'connecting'
      })
      .addCase(connectToGitHub.fulfilled, state => {
        state.status = 'connected'
      })
  }
})

// Actions
export const { disconnect } = connectionSlice.actions

// Selectors
export const selectConnectionStatus = (state: RootState) => state.connection.status

// Reducer
export default connectionSlice.reducer
```

---

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `RepositoryCard.tsx`, `IssueDetailModal.tsx`)
- **Slices**: camelCase + "Slice" (e.g., `connectionSlice.ts`, `analysisSlice.ts`)
- **Utilities**: camelCase (e.g., `jsonSerializer.ts`, `mockData.ts`)
- **Types**: camelCase (e.g., `repository.ts`, `issue.ts`)
- **Tests**: Same as file + `.test` (e.g., `RepositoryCard.test.tsx`)

### Variables
- **Components**: PascalCase (e.g., `const RepositoryCard = ...`)
- **Functions**: camelCase (e.g., `const handleClick = ...`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `const MAX_RETRIES = 3`)
- **Types/Interfaces**: PascalCase (e.g., `interface Repository`, `type ConnectionStatus`)

### Redux
- **Slices**: camelCase + "Slice" (e.g., `connectionSlice`)
- **Actions**: camelCase verb (e.g., `selectRepository`, `startAnalysis`)
- **Selectors**: "select" + noun (e.g., `selectRepositories`, `selectTotalIssueCount`)
- **Thunks**: camelCase verb (e.g., `connectToGitHub`, `runAnalysis`)

---

## Git Workflow (From CLAUDE.md)

### Git Flow Commands
```bash
# Start feature
git flow feature start <feature-name>

# Finish feature (merges to develop)
git flow feature finish <feature-name>

# Start release
git flow release start <version>

# Finish release (merges to main and develop, tags)
git flow release finish <version>

# Push all branches and tags
git push --all && git push --tags
```

### Commit Message Format
```
<type>: <subject>

<body>

<footer>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types**: feat, fix, refactor, test, docs, style, chore

### Pre-Commit Checklist
- [ ] All tests passing (`npm run test`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes with no warnings (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] No console errors

---

## Mock Data Structure

### Repository Interface
```typescript
interface Repository {
  id: string
  name: string
  owner: string
  language: string
  description: string
  fileTree: FileNode[]
  issues: Issue[]
}
```

### FileNode Interface
```typescript
interface FileNode {
  name: string
  type: 'file' | 'folder'
  path: string
  children?: FileNode[]
}
```

### Issue Interface
```typescript
interface Issue {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: 'memory-safety' | 'concurrency' | 'undefined-behavior' | 'type-safety'
  file: string
  line: number
  title: string
  description: string
  codeSnippet: string
  smtLibProof: string
  simplifiedProof: string
  explanation: string
  suggestedFix: string
}
```

### Mock Data Location
All mock data is stored in `src/utils/mockData.ts` and loaded into Redux initial state during store creation.

---

## Material-UI Theme (macOS Aesthetic)

### Theme Configuration
```typescript
// src/theme/macosTheme.ts
import { createTheme } from '@mui/material/styles'

export const macosTheme = createTheme({
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF'  // macOS blue
    },
    background: {
      default: '#F5F5F7',  // macOS light gray
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1D1D1F',
      secondary: '#86868B'
    }
  },
  shape: {
    borderRadius: 8  // macOS rounded corners
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.12)',
    '0 2px 6px rgba(0,0,0,0.12)',
    // ... (customize all 25 levels for subtle macOS shadows)
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // No ALL CAPS
          fontWeight: 500
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }
    }
  }
})
```

---

## PWA Configuration

### Manifest.json Structure
```json
{
  "name": "Hupyy C++ Formal Verification",
  "short_name": "Hupyy Verifier",
  "description": "AI Firewall for Code Verification",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F5F5F7",
  "theme_color": "#007AFF",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Workbox Strategies
- **Cache-First**: Static assets (JS, CSS, images)
- **Network-First**: HTML files (index.html)
- **Pre-cache**: All build assets on service worker install

---

## Security Considerations

### Input Validation
- All user inputs sanitized (though minimal user input in demo)
- No eval() or innerHTML usage
- XSS protection via React's default escaping

### Data Handling
- No sensitive data in mock data
- No API calls to external services
- No localStorage persistence (session-only state)

### CSP (Content Security Policy)
- Configure in index.html for production
- Restrict script sources
- Prevent inline scripts

---

## Performance Targets

### Load Times
- **Initial Load**: < 2 seconds on modern hardware
- **Route Navigation**: < 200ms
- **Analysis Simulation**: 2-5 seconds (intentional delay)

### Animation Performance
- **Target**: 60fps for all animations
- **Strategy**: Use CSS transforms (translateX, scale, opacity) for GPU acceleration
- **Avoid**: Animating width, height, left, top (triggers layout)

### Bundle Size
- **Target**: < 500KB gzipped
- **Strategy**: Tree-shaking via Vite, code splitting by route
- **Monitor**: Use `npm run build` and check dist/ sizes

---

## Browser Support

### Primary Target
- **Chrome**: Latest version (for PWA install demo)

### Secondary Target
- **Safari**: Latest version (macOS default browser)

### Not Supported (MVP)
- **Mobile browsers**: Desktop-only demo
- **Internet Explorer**: No support
- **Firefox**: Not tested (should work but not priority)

---

## Accessibility (Basic)

### ARIA Attributes
- All interactive elements have aria-label
- Loading states have aria-busy
- Modals have aria-modal and role="dialog"

### Keyboard Navigation
- All buttons and links keyboard accessible
- Tab order logical
- Focus visible on all interactive elements

### Color Contrast
- WCAG AA compliance for text (4.5:1 contrast ratio)
- Status indicators use both color and text/icons

---

## Known Limitations (By Design)

1. **No Backend**: All data is hardcoded, no real API calls
2. **No Real GitHub OAuth**: Simulated connection flow only
3. **No Actual Formal Verification**: Results are mocked, not from cvc5
4. **Session-Only State**: Data resets on page reload (no localStorage)
5. **Desktop-Only**: Not responsive, optimized for Zoom screenshare
6. **Light Mode Only**: No dark mode support in MVP
7. **Chrome-First**: PWA optimized for Chrome installation

---

## Next Steps

1. **Complete Foundation**: Set up Vite + React + TypeScript + Redux + Material-UI
2. **Begin Epic 1**: PWA Installation & Launch Experience
3. **Follow TDD**: Red → Green → Refactor for all features
4. **Track Progress**: Update PROGRESS.md after each story

---

## Document Status

**Status**: ✅ Complete
**Created**: 2025-12-03
**Last Updated**: 2025-12-03
**Next Action**: Create PROGRESS.md and begin Foundation setup

---

**End of Codebase Documentation**
