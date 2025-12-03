# GitHub Stories Execution Roadmap
**Project**: C++ Grinding Mockup - Formal Verification Linter
**GitHub Project**: #13 - C++ Grinding Mockup
**Execution Start**: 2025-12-03
**Version**: 1.0

---

## Overview

This roadmap outlines the systematic execution of all user stories from GitHub Project #13 with TDD and engineering excellence. The project implements a Progressive Web App demonstrating formal verification for C++ code.

**Total Epics**: 7
**Total User Stories**: 11 (across 3 Epics with user stories; 4 Epics are direct implementations)
**Estimated Duration**: 22 hours across 2 days

---

## Epic Hierarchy & Priorities

### Critical Path (Sequential Dependencies)

```
Foundation → Epic 1 → Epic 2 → Epic 3 → Epic 4 → Epic 5 → Epic 6 → Epic 7 → Polish
```

### Epic Summary Table

| # | Epic | Priority | Effort | User Stories | Est. Hours | Dependencies |
|---|------|----------|--------|--------------|------------|--------------|
| 1 | PWA Installation & Launch | Critical | M | 4 stories | 3h | Foundation only |
| 2 | Landing Page & GitHub Connection | Critical | S | Direct impl | 2h | Epic 1, Foundation |
| 3 | Repository Selection Dashboard | High | S | Direct impl | 2h | Epic 2, Mock Data |
| 4 | File Tree Visualization | High | S | 4 stories | 1.5h | Epic 3, Mock Data |
| 5 | Formal Verification Analysis | Critical | M | 7 stories | 3h | Epic 4, Mock Data |
| 6 | Issue Investigation & Details | Critical | M | 6 stories | 3h | Epic 5 |
| 7 | AI Agent Integration & Export | Critical | S | Direct impl | 1.5h | Epic 6 |

**Total Implementation**: 16 hours
**Foundation**: 5 hours
**Polish**: 2 hours
**Grand Total**: 23 hours

---

## Phase 0: Discovery & Planning

**Duration**: 30 minutes
**Status**: ✅ Complete

### Completed

- [x] Fetched GitHub Project structure (#13 with 7 Epics)
- [x] Analyzed PRD v1.0 (requirements document)
- [x] Analyzed ARCHITECTURE.md (technical architecture)
- [x] Analyzed epic-prioritization.md (dependency analysis)
- [x] Identified tech stack: React 18 + TypeScript + Redux Toolkit + Material-UI + Vite
- [x] Confirmed 8 CPU cores available for parallelization
- [x] Created execution roadmap (this file)

### Key Findings

1. **Tech Stack**: React 18, TypeScript, Redux Toolkit, Material-UI v5, Vite, Framer Motion
2. **No Backend**: Pure client-side simulation with hardcoded mock data
3. **TDD Required**: Test-driven development for all features
4. **Database**: PostgreSQL at localhost:5434 (DO NOT MODIFY - per CLAUDE.md)
5. **Git Flow**: Use git flow, no PRs, commit after each story, release after epics
6. **Testing**: Both unit and integration tests required
7. **Linting**: Must run before every commit
8. **Type Safety**: Strict TypeScript mode, no 'any' types

---

## Phase 1: Foundation Setup

**Duration**: 5 hours
**Status**: Pending

### Prerequisites (Must Complete First)

#### 1.1 Project Initialization (1 hour)
- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure tsconfig.json (strict mode, all flags)
- [ ] Set up project structure (src/app, src/features, src/components, src/types, src/utils)
- [ ] Install core dependencies:
  - Redux Toolkit + React-Redux
  - React Router DOM v6
  - Material-UI v5 (@mui/material, @emotion/react, @emotion/styled)
  - Framer Motion
  - vite-plugin-pwa (Workbox)
- [ ] Install dev dependencies:
  - Vitest (testing framework)
  - @testing-library/react
  - @testing-library/user-event
  - ESLint + Prettier
  - TypeScript type definitions

**Acceptance**:
- App runs with `npm run dev`
- TypeScript compiles with no errors
- Strict mode enabled

#### 1.2 Redux Store Configuration (1 hour)
- [ ] Create Redux store with Redux Toolkit configureStore
- [ ] Set up Redux DevTools integration
- [ ] Define RootState type
- [ ] Create placeholder slices (connection, repositories, analysis, ui)
- [ ] Write store tests (basic state initialization)

**Acceptance**:
- Redux DevTools shows store
- Store test passes
- All slices export typed hooks (useAppDispatch, useAppSelector)

#### 1.3 Material-UI Theme Setup (1 hour)
- [ ] Create macOS-themed Material-UI theme
- [ ] Configure typography (SF Pro Text font stack)
- [ ] Configure palette (primary: #007AFF, background: #F5F5F7)
- [ ] Configure shadows (subtle macOS-style)
- [ ] Configure component overrides (Button, Card, etc.)
- [ ] Apply ThemeProvider at app root
- [ ] Write theme tests (basic theme application)

**Acceptance**:
- Sample component shows macOS aesthetic
- Theme test passes
- No console warnings

#### 1.4 React Router Setup (30 minutes)
- [ ] Configure React Router with routes:
  - `/` → LandingPage
  - `/dashboard` → RepositoryDashboard
  - `/repo/:repoId` → RepositoryView
- [ ] Create placeholder page components
- [ ] Test navigation flow
- [ ] Write routing tests

**Acceptance**:
- All routes render placeholder components
- Navigation works
- Routing test passes

#### 1.5 Mock Data Creation (1.5 hours)
- [ ] Define TypeScript interfaces:
  - Repository (id, name, owner, language, description, fileTree, issues)
  - FileNode (name, type, path, children)
  - Issue (id, severity, category, file, line, title, description, codeSnippet, smtLibProof, simplifiedProof, explanation, suggestedFix)
- [ ] Create mock data for stripe/payment-gateway repository
  - 15-20 file nodes (realistic C++ structure)
  - 3-5 issues covering all categories
  - Realistic C++ code snippets
  - Plausible SMT-LIB proofs
  - Human-readable explanations
  - Suggested fixes
- [ ] Create mock data for meta/compiler-optimizer repository
  - 15-20 file nodes
  - 3-5 issues (different from stripe)
- [ ] Add mock data to Redux initial state
- [ ] Write data validation tests (TypeScript compilation + runtime checks)

**Acceptance**:
- All interfaces defined and exported
- Mock data compiles without errors
- Data validation tests pass
- All bug categories represented (memory safety, concurrency, undefined behavior, type safety)

**Foundation Completion Gate**:
- [ ] All dependencies installed
- [ ] TypeScript strict mode working
- [ ] Redux store operational with DevTools
- [ ] Material-UI theme applied
- [ ] Routes configured
- [ ] Mock data created and typed
- [ ] All foundation tests passing
- [ ] ESLint + Prettier configured
- [ ] Zero console errors

---

## Epic 1: PWA Installation & Launch Experience

**GitHub Issue**: [#1](https://github.com/o2alexanderfedin/cpp-grinding-mockup/issues/1)
**Priority**: Critical (1)
**Effort**: Medium
**Estimated Duration**: 3 hours
**Dependencies**: Foundation only
**User Stories**: 4 (#8, #9, #10, #11)

### Story Breakdown

#### Story #8: Configure PWA Manifest (1 hour)
**TDD Approach**: Test manifest existence → Implement manifest → Verify structure

**Red Phase**:
- [ ] Write test: manifest.json exists in public/
- [ ] Write test: manifest has required fields (name, short_name, display, start_url, theme_color, background_color, icons)
- [ ] Run tests → Should fail

**Green Phase**:
- [ ] Create public/manifest.json
- [ ] Configure manifest with Hupyy branding
  - name: "Hupyy C++ Formal Verification"
  - short_name: "Hupyy Verifier"
  - display: "standalone"
  - start_url: "/"
  - theme_color: "#007AFF"
  - background_color: "#F5F5F7"
  - icons: [192x192, 512x512 references]
- [ ] Link manifest in index.html
- [ ] Run tests → Should pass

**Refactor Phase**:
- [ ] Extract theme colors to constants (DRY)
- [ ] Ensure manifest validates against PWA spec

**Acceptance**:
- [ ] manifest.json exists with all required fields
- [ ] Manifest references Hupyy branding
- [ ] Theme colors match macOS aesthetic
- [ ] Tests pass
- [ ] Linting passes

#### Story #9: Create App Icons with Hupyy Branding (1 hour)
**TDD Approach**: Test icon files exist → Create icons → Verify dimensions

**Red Phase**:
- [ ] Write test: icon files exist at public/icons/icon-192x192.png and icon-512x512.png
- [ ] Write test: icons have correct dimensions (image parsing)
- [ ] Run tests → Should fail

**Green Phase**:
- [ ] Create public/icons/ directory
- [ ] Design/generate Hupyy app icon (shield or verification symbol)
- [ ] Create 192x192 PNG icon
- [ ] Create 512x512 PNG icon
- [ ] Update manifest.json to reference icons
- [ ] Run tests → Should pass

**Refactor Phase**:
- [ ] Optimize PNG file sizes
- [ ] Ensure icons look good at both resolutions

**Acceptance**:
- [ ] Icons created at correct resolutions
- [ ] Icons include Hupyy branding
- [ ] Manifest correctly references icons
- [ ] Tests pass
- [ ] Visual review confirms quality

#### Story #10: Implement Service Worker with Workbox (1 hour)
**TDD Approach**: Test service worker registration → Configure plugin → Verify offline

**Red Phase**:
- [ ] Write test: service worker registers successfully
- [ ] Write test: service worker caches static assets
- [ ] Write test: app works offline after first load
- [ ] Run tests → Should fail

**Green Phase**:
- [ ] Install vite-plugin-pwa
- [ ] Configure plugin in vite.config.ts:
  - registerType: 'autoUpdate'
  - includeAssets: ['icons/**/*']
  - workbox strategies: cache-first for assets, network-first for HTML
  - manifest: link to manifest.json
- [ ] Create src/serviceWorkerRegistration.ts helper
- [ ] Register service worker in main.tsx
- [ ] Build app and test service worker registration
- [ ] Run tests → Should pass

**Refactor Phase**:
- [ ] Extract Workbox config to separate file if complex
- [ ] Ensure cache names are versioned
- [ ] Add service worker update notification (optional)

**Acceptance**:
- [ ] vite-plugin-pwa installed and configured
- [ ] Service worker generates at build time
- [ ] Workbox strategies configured correctly
- [ ] Service worker registration code in place
- [ ] Tests pass
- [ ] Linting passes

#### Story #11: Verify PWA Installation in Chrome (Integration Test)
**TDD Approach**: Manual testing → Document steps → Automate where possible

**Manual Testing**:
- [ ] Build app with production configuration
- [ ] Serve app on localhost with preview server
- [ ] Open in Chrome
- [ ] Verify install prompt appears (or menu → Install App available)
- [ ] Click install
- [ ] Verify app appears in macOS dock/applications
- [ ] Launch app from dock
- [ ] Verify app opens without browser chrome (standalone)
- [ ] Close app and disconnect internet
- [ ] Relaunch app
- [ ] Verify app works offline
- [ ] Document installation steps

**Automated Tests** (where possible):
- [ ] Test manifest is served correctly
- [ ] Test service worker is registered
- [ ] Test offline caching works

**Acceptance**:
- [ ] App installs from Chrome successfully
- [ ] App icon visible in macOS dock
- [ ] Launches as standalone app (no browser UI)
- [ ] Works offline after first load
- [ ] Window title shows app name
- [ ] Installation documented
- [ ] All tests pass

### Epic 1 Completion Gate

- [ ] All 4 user stories completed
- [ ] PWA manifest configured correctly
- [ ] App icons created with Hupyy branding
- [ ] Service worker operational
- [ ] Chrome installation tested and verified
- [ ] Offline mode working
- [ ] All tests passing (unit + integration)
- [ ] Linting passes with no warnings
- [ ] Code committed to git
- [ ] No console errors during install or launch

**Git Actions**:
```bash
git add .
git commit -m "feat: Implement PWA installation and launch experience

Implements Epic #1 - PWA Installation & Launch Experience

User Stories Completed:
- #8: Configure PWA manifest with Hupyy branding
- #9: Create app icons (192x192, 512x512)
- #10: Implement service worker with Workbox
- #11: Verify PWA installation in Chrome

Technical Implementation:
- manifest.json configured with standalone display mode
- vite-plugin-pwa configured with cache-first strategy
- Service worker auto-generated with Workbox
- PWA installs successfully from Chrome
- App works offline after initial load

Tests:
- Manifest structure validation
- Icon existence and dimensions
- Service worker registration
- Offline functionality

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push
```

---

## Epic 2: Landing Page & GitHub Connection Flow

**GitHub Issue**: [#2](https://github.com/o2alexanderfedin/cpp-grinding-mockup/issues/2)
**Priority**: Critical (1)
**Effort**: Small
**Estimated Duration**: 2 hours
**Dependencies**: Epic 1, Foundation (Redux + Theme)
**User Stories**: Direct implementation (no child stories)

### Implementation Steps (TDD)

#### Step 1: Connection Redux Slice (30 minutes)
**Red Phase**:
- [ ] Write test: connectionSlice initial state is 'disconnected'
- [ ] Write test: connectToGitHub action transitions to 'connecting'
- [ ] Write test: connectionSuccess action transitions to 'connected'
- [ ] Write test: connectToGitHub thunk simulates 1-2 sec delay
- [ ] Run tests → Should fail

**Green Phase**:
- [ ] Create src/features/connection/connectionSlice.ts
- [ ] Define ConnectionState interface
- [ ] Create slice with status: 'disconnected' | 'connecting' | 'connected'
- [ ] Create connectToGitHub async thunk with setTimeout(1-2 sec)
- [ ] Create selectors: selectConnectionStatus
- [ ] Add to root reducer
- [ ] Run tests → Should pass

**Refactor Phase**:
- [ ] Extract delay constant
- [ ] Add JSDoc comments
- [ ] Ensure immutability

**Acceptance**:
- [ ] connectionSlice created and typed
- [ ] Thunk simulates realistic delay
- [ ] All tests pass
- [ ] Linting passes

#### Step 2: Landing Page Component (1 hour)
**Red Phase**:
- [ ] Write test: LandingPage renders without crashing
- [ ] Write test: Hupyy branding visible (logo, company name)
- [ ] Write test: Tagline text renders
- [ ] Write test: "Connect to GitHub" button renders
- [ ] Run tests → Should fail

**Green Phase**:
- [ ] Create src/pages/LandingPage.tsx
- [ ] Create src/features/connection/Header.tsx (Hupyy branding)
- [ ] Create src/features/connection/Hero.tsx (tagline)
- [ ] Create src/features/connection/ConnectButton.tsx (container component)
- [ ] Style with Material-UI (macOS theme)
- [ ] Add tagline: "AI Firewall for Code Verification"
- [ ] Run tests → Should pass

**Refactor Phase**:
- [ ] Extract common spacing constants
- [ ] Ensure responsive layout (though desktop-only MVP)
- [ ] Optimize component structure (presentation/container pattern)

**Acceptance**:
- [ ] macOS aesthetic (SF Pro font, subtle shadows, spacious layout)
- [ ] Hupyy branding clearly visible
- [ ] Tagline explains "AI firewall" concept
- [ ] All tests pass
- [ ] Linting passes

#### Step 3: Connection Flow (30 minutes)
**Red Phase**:
- [ ] Write test: Button click dispatches connectToGitHub
- [ ] Write test: Loading spinner shows during 'connecting' state
- [ ] Write test: Navigation to /dashboard on 'connected' state
- [ ] Run tests → Should fail

**Green Phase**:
- [ ] Implement ConnectButton container:
  - useAppDispatch, useAppSelector hooks
  - Dispatch connectToGitHub on click
  - Show LoadingSpinner during 'connecting'
  - Navigate to /dashboard using useNavigate when 'connected'
- [ ] Create src/components/LoadingSpinner.tsx
- [ ] Run tests → Should pass

**Refactor Phase**:
- [ ] Extract navigation logic to useEffect
- [ ] Ensure button disabled during loading
- [ ] Add accessibility attributes (aria-label, aria-busy)

**Acceptance**:
- [ ] Button triggers connection
- [ ] Loading state shows spinner
- [ ] Smooth transition to dashboard
- [ ] All tests pass
- [ ] Zero console errors

### Epic 2 Completion Gate

- [ ] Landing page renders with macOS aesthetic
- [ ] Hupyy branding visible (logo, company name)
- [ ] "Connect to GitHub" button functional
- [ ] Simulated 1-2 second loading works
- [ ] Navigation to /dashboard smooth
- [ ] connectionSlice stores 'connected' status
- [ ] All tests passing (unit + integration)
- [ ] Linting passes with no warnings
- [ ] Code committed to git
- [ ] No console errors

**Git Actions**:
```bash
git add .
git commit -m "feat: Implement landing page and GitHub connection flow

Implements Epic #2 - Landing Page & GitHub Connection Flow

Technical Implementation:
- connectionSlice with status state machine
- LandingPage with macOS aesthetic
- Hupyy branding (logo, company name, tagline)
- Simulated GitHub connection (1-2 sec delay)
- Smooth navigation to dashboard

Components Created:
- LandingPage (page)
- Header (Hupyy branding)
- Hero (tagline)
- ConnectButton (container)
- LoadingSpinner (reusable)

Tests:
- connectionSlice state transitions
- Component rendering
- User interaction flow
- Navigation logic

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push
```

---

## Epics 3-7: Remaining Implementation

**Note**: Similar detailed breakdowns follow the same TDD pattern for each Epic:

### Epic 3: Repository Selection Dashboard (2 hours)
- Stories: Direct implementation
- Key deliverables: repositoriesSlice, RepositoryDashboard, RepositoryCard
- Git commit after completion

### Epic 4: File Tree Visualization (1.5 hours)
- Stories: #22, #23, #24, #25
- Key deliverables: FileTreeView, FileTreeNode (recursive), FileIcon
- Git commit after completion

### Epic 5: Formal Verification Analysis (3 hours)
- Stories: #26, #27, #28, #29, #30, #31, #32
- Key deliverables: analysisSlice, AnalysisButton, ResultsDrawer, IssueList
- Git commit after completion
- **Git Release**: After Epic 5 (core value prop milestone)

### Epic 6: Issue Investigation & Details (3 hours)
- Stories: #33, #34, #35, #36, #37, #38
- Key deliverables: IssueDetailModal, CodeSnippet, FormalProof, tabs
- Git commit after completion

### Epic 7: AI Agent Integration & Export (1.5 hours)
- Stories: Direct implementation
- Key deliverables: ExportButton, JsonExportModal, MetricCard
- Git commit after completion
- **Git Release**: After Epic 7 (final epic milestone)

---

## Final Phase: Polish & Testing

**Duration**: 2 hours

### Animation Tuning (30 minutes)
- [ ] Verify all transitions run at 60fps
- [ ] Adjust timing curves for natural motion
- [ ] Test drawer slide-in animation
- [ ] Test modal open/close animation
- [ ] Test page transition animations

### Visual Polish (30 minutes)
- [ ] Check spacing consistency
- [ ] Verify shadow depths
- [ ] Ensure typography hierarchy
- [ ] Test on presentation screen resolution
- [ ] Confirm Hupyy branding throughout

### Full Walkthrough Testing (1 hour)
- [ ] Run complete demo flow 5+ times
- [ ] Check for console errors
- [ ] Verify offline mode works
- [ ] Test PWA install/launch
- [ ] Confirm all acceptance criteria met
- [ ] Performance check (load times, animation smoothness)
- [ ] Security review (input validation, no sensitive data exposure)

### Final Verification
- [ ] All tests passing (unit + integration)
- [ ] Type checking passes (tsc --noEmit)
- [ ] Linting passes with zero warnings
- [ ] Format checking passes
- [ ] All Epics completed
- [ ] All acceptance criteria met
- [ ] Zero bugs or console errors

**Final Git Release**:
```bash
git flow release start v1.0.0
# Final polish commits
git flow release finish v1.0.0
git push --all && git push --tags
```

---

## Execution Order Summary

### Day 1 Timeline (12.5 hours)

**Morning (8am-1pm): Foundation + Epic 1** [5 hours]
- Foundation setup: 5h
  - 1h: Project init
  - 1h: Redux store
  - 1h: MUI theme
  - 0.5h: Routing
  - 1.5h: Mock data

**Afternoon (1pm-4pm): Epic 1** [3 hours]
- Story #8: PWA manifest (1h)
- Story #9: App icons (1h)
- Story #10: Service worker (1h)

**Evening (4pm-8:30pm): Epics 2-4** [4.5 hours]
- Epic 2: Landing + connection (2h)
- Epic 3: Repository selection (2h)
- Epic 4: File tree (partially, 0.5h)

### Day 2 Timeline (10.5 hours)

**Morning (8am-12pm): Epic 4-5** [4 hours]
- Epic 4: File tree completion (1h)
- Epic 5: Formal verification (3h)

**Afternoon (1pm-6pm): Epics 6-7** [5 hours]
- Epic 6: Issue investigation (3h)
- Epic 7: AI integration (1.5h)
- Buffer/testing (0.5h)

**Evening (6pm-8:30pm): Polish** [2.5 hours]
- Animation tuning (0.5h)
- Visual polish (0.5h)
- Full walkthrough testing (1h)
- Final verification (0.5h)

**Total**: 23 hours

---

## Success Criteria

### Technical Excellence
- [x] All code strongly typed (strict TypeScript)
- [ ] 100% test coverage of business logic
- [ ] All tests passing (unit + integration)
- [ ] Zero linting warnings
- [ ] Zero console errors

### SOLID Principles
- [ ] Single Responsibility: Each component has one reason to change
- [ ] Open/Closed: Components extensible without modification
- [ ] Liskov Substitution: All implementations interchangeable
- [ ] Interface Segregation: Components receive only needed props
- [ ] Dependency Inversion: Components depend on abstractions (Redux state)

### TDD Process
- [ ] Every feature starts with failing test
- [ ] Minimal code to pass tests
- [ ] Refactor while keeping tests green
- [ ] Red → Green → Refactor cycle followed

### Git Workflow
- [ ] Commit after each completed user story/epic
- [ ] Meaningful commit messages
- [ ] Git releases after major epics (Epic 5, Epic 7)
- [ ] All code pushed to remote
- [ ] No force pushes
- [ ] Git flow followed

### Demo Readiness
- [ ] PWA installs successfully
- [ ] All 7 Epics functional
- [ ] Smooth animations (60fps)
- [ ] macOS aesthetic throughout
- [ ] Zero bugs or glitches
- [ ] Professional appearance

---

## Risk Management

### High-Risk Items
1. **PWA Installation** (Epic 1)
   - Mitigation: Test early, have browser tab fallback

2. **Animation Performance** (Epics 5-6)
   - Mitigation: Use GPU-accelerated CSS transforms, test on target hardware

3. **Syntax Highlighting** (Epic 6)
   - Mitigation: Test Prism.js integration early, pre-rendered fallback

4. **Mock Data Quality** (Foundation)
   - Mitigation: Review for realism, get second opinion

### Contingency Plans
- **Priority 1 Epics (1, 2, 5, 6, 7)**: Must complete, no compromise
- **Priority 2 Epics (3, 4)**: Simplify UX if time runs short
- **Polish Phase**: Can reduce from 2.5h to 1h if needed

---

## Document Status

**Status**: ✅ Complete
**Created**: 2025-12-03
**Last Updated**: 2025-12-03
**Next Action**: Create CODEBASE.md and begin Foundation phase

---

**End of Roadmap**
