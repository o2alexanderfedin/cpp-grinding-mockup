# User Story Prioritization Analysis
## C++ Grinding Mockup - GitHub Project #13

**Generated**: 2025-12-03
**Analysis Scope**: All Epics and User Stories in Project #13
**Methodology**: Vertical slice architecture + technical dependency mapping + SOLID principles

---

## Executive Summary

This analysis provides a detailed prioritization of User Stories within each Epic, based on technical dependencies, architectural layering, and development efficiency. The prioritization ensures:

- **Foundation-first approach**: Data models and types before features that consume them
- **Dependency satisfaction**: No User Story is scheduled before its prerequisites
- **Parallel opportunities**: Independent work streams identified to accelerate delivery
- **Incremental value**: Each sequence delivers testable, demonstrable progress

### Key Findings

- **Total Epics**: 7
- **Epics with User Stories**: 4 (Epics #4, #5, #6, #7)
- **Epics needing breakdown**: 3 (Epics #1, #2, #3)
- **Total User Stories**: 23
- **Parallelization potential**: 30-40% time savings through concurrent work streams

---

## Epic-by-Epic Prioritization

### Epic #1: PWA Installation & Launch Experience
**Status**: ⚠️ No User Stories created yet

**Next Action**: Use epic-to-user-stories skill to break down this Epic

**Recommended User Story Breakdown**:
1. Configure PWA manifest with Hupyy branding
2. Implement service worker with Workbox
3. Create app icons (192x192, 512x512)
4. Integrate PWA into root HTML
5. Test installation from Chrome
6. Verify offline functionality
7. End-to-end PWA installation testing

---

### Epic #2: Landing Page & GitHub Connection Flow
**Status**: ⚠️ No User Stories created yet

**Next Action**: Use epic-to-user-stories skill to break down this Epic

**Recommended User Story Breakdown**:
1. Design landing page UI and branding
2. Implement "Connect to GitHub" button and state management
3. Create loading state and connection animation
4. Implement navigation to dashboard after connection
5. Apply macOS aesthetic theming

---

### Epic #3: Repository Selection Dashboard
**Status**: ⚠️ No User Stories created yet

**Next Action**: Use epic-to-user-stories skill to break down this Epic

**Recommended User Story Breakdown**:
1. Create repository mock data and Redux state
2. Build repository dashboard UI and cards
3. Implement repository selection and navigation
4. Display connection status indicator

---

### Epic #4: File Tree Visualization
**Status**: ✅ 4 User Stories (13 story points total)

#### Prioritized Sequence

**Priority 1 (Foundation - Must Complete First):**
1. **#22: Display Realistic C++ Project Structure** (3 SP)
   - **Layer**: Data Models (Layer 1)
   - **Dependencies**: None
   - **Blocks**: All other File Tree stories
   - **Rationale**: Defines FileNode interface and mock data structure consumed by all other stories
   - **Tasks**:
     - Define FileNode TypeScript interface
     - Create stripe/payment-gateway file tree mock data
     - Create meta/compiler-optimizer file tree mock data
     - Add fileTree property to Repository interface
     - Add mock data to repositoriesSlice

**Priority 2 (Core Component - Can Start in Parallel):**
2. **#23: Implement File Tree Component with Collapsible Folders** (5 SP) [STREAM A]
   - **Layer**: Presentation Components (Layer 3)
   - **Dependencies**: #22 (needs FileNode interface and mock data)
   - **Blocks**: #25 (integration depends on component existing)
   - **Rationale**: Core recursive component logic; independent UI implementation
   - **Tasks**:
     - Create FileTreeView and FileTreeNode components
     - Implement expand/collapse functionality
     - Add macOS aesthetic styling

3. **#24: Display File Type Icons** (2 SP) [STREAM B - Can parallel with #23]
   - **Layer**: Presentation Components (Layer 3)
   - **Dependencies**: #22 (needs FileNode type), Material-UI icons library
   - **Parallel with**: #23 (independent icon component)
   - **Rationale**: Simple mapping component, no dependency on FileTreeNode structure
   - **Tasks**:
     - Create FileIcon component
     - Map file extensions to icons
     - Handle folder open/closed states

**Priority 3 (Integration - Requires All Components):**
4. **#25: Integrate File Tree into Repository View Layout** (3 SP)
   - **Layer**: Container Components (Layer 4) + Integration (Layer 5)
   - **Dependencies**: #23 (FileTreeView component), #24 (FileIcon component), #22 (mock data), Epic #3 (Repository selection)
   - **Rationale**: Final integration requires all components to exist
   - **Tasks**:
     - Add FileTreeView to RepositoryView layout
     - Create Redux selector for file tree
     - Position and style in page layout

#### Dependency Visualization

```
#22 (Data/Types) ──┬──> #23 (FileTree Component) ──┐
                   │                                  ├──> #25 (Integration)
                   └──> #24 (File Icons) ────────────┘
```

#### Parallelization Strategy

- **Sequential Phase 1**: Complete #22 (3 SP)
- **Parallel Phase 2**: #23 and #24 simultaneously (max 5 SP with 2 developers)
- **Sequential Phase 3**: Complete #25 (3 SP)

**Critical Path**: #22 → #23 → #25 = 11 story points
**With Parallelization**: #22 → [#23 || #24] → #25 = 11 story points
**Time Savings**: Minimal (2 SP saved if 2 developers), but allows team flexibility

#### Implementation Guidance

**Start Immediately**:
- #22: Display Realistic C++ Project Structure

**Start After #22**:
- Assign Stream A: #23 (FileTree Component)
- Assign Stream B: #24 (File Icons)

**Start After Streams A & B Complete**:
- #25: Integration

---

### Epic #5: Formal Verification Analysis
**Status**: ✅ 7 User Stories (25 story points total)

#### Prioritized Sequence

**Priority 1 (Foundation - Data Layer):**
1. **#26: Create Mock Issue Data with All Bug Categories** (5 SP)
   - **Layer**: Data Models (Layer 1)
   - **Dependencies**: Repository data structure
   - **Blocks**: All other Epic #5 stories
   - **Rationale**: Defines Issue interface and mock data consumed by all UI components
   - **Tasks**:
     - Define Issue TypeScript interface
     - Write realistic C++ code snippets with bugs
     - Create plausible SMT-LIB proofs
     - Write explanations and suggested fixes

**Priority 2 (State Management - Layer 2):**
2. **#28: Create Redux Analysis State Management** (3 SP)
   - **Layer**: State Management (Layer 2)
   - **Dependencies**: #26 (Issue interface)
   - **Blocks**: #27 (button needs actions), #29 (drawer needs state), #30 (list needs selectors)
   - **Rationale**: Centralized state must exist before UI components can connect
   - **Tasks**:
     - Create analysisSlice with status/results/selectedIssueId
     - Implement runAnalysis async thunk
     - Create selectors for status and results

**Priority 3 (Parallel UI Components - Layer 3):**
3. **#27: Implement Analysis Button with Loading States** (3 SP) [STREAM A]
   - **Layer**: Container Component (Layer 4)
   - **Dependencies**: #28 (analysisSlice actions)
   - **Parallel with**: #29 (drawer development)
   - **Rationale**: Button triggers analysis; independent of results display
   - **Tasks**:
     - Create AnalysisButton container component
     - Implement button state transitions
     - Add loading spinner and completion state

4. **#29: Build Results Drawer with Smooth Animations** (5 SP) [STREAM B]
   - **Layer**: Presentation Component (Layer 3)
   - **Dependencies**: #28 (analysis state), Framer Motion
   - **Parallel with**: #27 (button development)
   - **Rationale**: Drawer structure independent of button; both connect to same state
   - **Tasks**:
     - Create ResultsDrawer with Framer Motion
     - Implement slide-in animation
     - Add drawer header and body sections

**Priority 4 (Results Display - Layer 3/4):**
5. **#31: Implement Issue Summary Header with Metrics** (2 SP) [STREAM A]
   - **Layer**: Presentation Component (Layer 3)
   - **Dependencies**: #28 (selectors), #29 (drawer header)
   - **Parallel with**: #30 (issue list development)
   - **Rationale**: Summary component independent of issue cards
   - **Tasks**:
     - Create IssueSummary component
     - Calculate severity breakdown
     - Display in drawer header

6. **#30: Display Issue List with Severity and Category Indicators** (5 SP) [STREAM B]
   - **Layer**: Presentation Component (Layer 3)
   - **Dependencies**: #28 (selectors), #29 (drawer body)
   - **Parallel with**: #31 (summary development)
   - **Rationale**: Issue cards independent of summary metrics
   - **Tasks**:
     - Create IssueList and IssueCard components
     - Implement severity color coding
     - Add category badges

**Priority 5 (Enhancement - Layer 3):**
7. **#32: Add Drawer Collapse/Expand Functionality** (2 SP)
   - **Layer**: Enhancement to existing component
   - **Dependencies**: #29 (drawer must exist), #30 (content to collapse), #31 (summary to show when collapsed)
   - **Rationale**: Polish feature; requires drawer and content to exist
   - **Tasks**:
     - Add collapse/expand button
     - Implement height animation
     - Handle collapsed state

#### Dependency Visualization

```
#26 (Issue Data) ──> #28 (Redux State) ──┬──> #27 (Button) [STREAM A]
                                          │
                                          └──> #29 (Drawer) ──┬──> #31 (Summary) [STREAM A]
                                                               │
                                                               └──> #30 (Issue List) [STREAM B]
                                                                    │
                                                                    └──> #32 (Collapse)
```

#### Parallelization Strategy

- **Sequential Phase 1**: #26 (5 SP)
- **Sequential Phase 2**: #28 (3 SP)
- **Parallel Phase 3**: #27 and #29 simultaneously (max 5 SP)
- **Parallel Phase 4**: #31 and #30 simultaneously (max 5 SP)
- **Sequential Phase 5**: #32 (2 SP)

**Critical Path**: #26 → #28 → #29 → #30 → #32 = 20 story points
**With Parallelization**: #26 → #28 → [#27 || #29] → [#31 || #30] → #32 = 20 story points
**Time Savings**: Up to 8 story points (32% faster) with 2 developers

#### Implementation Guidance

**Start Immediately**:
- #26: Create Mock Issue Data

**Start After #26**:
- #28: Redux Analysis State

**Start After #28** (Assign 2 Streams):
- Stream A: #27 (Analysis Button)
- Stream B: #29 (Results Drawer)

**Start After Phase 3** (Continue 2 Streams):
- Stream A: #31 (Summary Header)
- Stream B: #30 (Issue List)

**Start After Phase 4**:
- #32: Collapse/Expand

---

### Epic #6: Issue Investigation & Details
**Status**: ✅ 6 User Stories (21 story points total)

#### Prioritized Sequence

**Priority 1 (Modal Infrastructure - Layer 3):**
1. **#33: Create Issue Detail Modal with Tab Navigation** (3 SP)
   - **Layer**: Container Component (Layer 4)
   - **Dependencies**: Analysis slice with selectIssue/clearSelection (Epic #5, #28)
   - **Blocks**: All tab content stories (#34-#38)
   - **Rationale**: Modal structure and tab framework must exist before tab content
   - **Tasks**:
     - Create IssueDetailModal with Material-UI
     - Implement Framer Motion animations
     - Set up Material-UI Tabs structure
     - Connect to Redux for selectedIssue

**Priority 2 (Tab Content - Can Parallel After Modal Exists):**

2. **#34: Implement Code Snippet Tab with Syntax Highlighting** (5 SP) [STREAM A - Priority]
   - **Layer**: Presentation Component (Layer 3)
   - **Dependencies**: #33 (modal/tabs), Prism.js/highlight.js
   - **Blocks**: #38 (suggested fix reuses CodeSnippet)
   - **Parallel with**: #35, #36, #37
   - **Rationale**: Reusable component needed by #38; complex syntax highlighting
   - **Tasks**:
     - Install Prism.js
     - Create CodeSnippet component
     - Implement C++ syntax highlighting
     - Add line number display

3. **#35: Display Formal Proof Tab with SMT-LIB Syntax** (3 SP) [STREAM B]
   - **Layer**: Presentation Component (Layer 3)
   - **Dependencies**: #33 (modal/tabs), optionally #34 (can reuse CodeSnippet)
   - **Parallel with**: #34, #36, #37
   - **Rationale**: Independent tab; can reuse CodeSnippet if available
   - **Tasks**:
     - Create FormalProof component
     - Add SMT-LIB formatting
     - Display "Verified by cvc5" badge

4. **#36: Create Simplified Proof Visualization** (5 SP) [STREAM C]
   - **Layer**: Presentation Component (Layer 3)
   - **Dependencies**: #33 (modal/tabs)
   - **Parallel with**: #34, #35, #37
   - **Rationale**: Creative visualization; complex but independent
   - **Tasks**:
     - Design simplified proof format
     - Create ProofVisualization component
     - Implement symbolic representation

5. **#37: Add Human-Readable Explanation Tab** (2 SP) [STREAM D]
   - **Layer**: Presentation Component (Layer 3)
   - **Dependencies**: #33 (modal/tabs), optionally react-markdown
   - **Parallel with**: #34, #35, #36
   - **Rationale**: Simple text display; lowest complexity
   - **Tasks**:
     - Create IssueExplanation component
     - Add markdown rendering (optional)
     - Apply macOS typography

**Priority 3 (Dependent Tab Content):**
6. **#38: Implement Suggested Fix Tab with Before/After Comparison** (3 SP)
   - **Layer**: Presentation Component (Layer 3)
   - **Dependencies**: #33 (modal/tabs), #34 (CodeSnippet component for reuse)
   - **Rationale**: Reuses CodeSnippet; requires diff highlighting logic
   - **Tasks**:
     - Create SuggestedFix component
     - Implement before/after layout
     - Add diff highlighting (red/green)

#### Dependency Visualization

```
#33 (Modal + Tabs) ──┬──> #34 (Code Tab) ────────────────────┐
                     │                                         │
                     ├──> #35 (Proof Tab) [can use #34] ─────┤
                     │                                         │
                     ├──> #36 (Visualization Tab) ────────────┤ ALL PARALLEL
                     │                                         │
                     ├──> #37 (Explanation Tab) ──────────────┤
                     │                                         │
                     └──> #38 (Fix Tab) [DEPENDS on #34] ─────┘
```

#### Parallelization Strategy

- **Sequential Phase 1**: #33 (3 SP)
- **Parallel Phase 2**: #34, #35, #36, #37 simultaneously (max 5 SP with 4 developers)
- **Sequential Phase 3**: #38 after #34 completes (3 SP)

**Critical Path**: #33 → #34 → #38 = 11 story points
**With Parallelization**: #33 → [#34 || #35 || #36 || #37] → #38 = 11 story points
**Time Savings**: Up to 10 story points (48% faster) with 4 developers

**Realistic 2-Developer Scenario**:
- Stream A: #34 → #38 (8 SP)
- Stream B: #35 → #36 → #37 (10 SP)
- Total: 10 SP (vs 18 sequential)

#### Implementation Guidance

**Start Immediately**:
- #33: Modal with Tab Navigation

**Start After #33** (Assign All Available Developers):
- Stream A (Priority): #34 (Code Snippet) - Must complete before #38
- Stream B: #35 (Formal Proof)
- Stream C: #36 (Proof Visualization)
- Stream D: #37 (Explanation)

**Start After #34 Completes**:
- Continue Stream A: #38 (Suggested Fix)

---

### Epic #7: AI Agent Integration & Export
**Status**: ✅ 6 User Stories (12 story points total)

#### Prioritized Sequence

**Priority 1 (Foundation - Data Layer):**
1. **#40: JSON Serialization for AI Agent Export** (2 SP)
   - **Layer**: Data Models (Layer 1) / Utilities
   - **Dependencies**: Issue interface (Epic #5, #26)
   - **Blocks**: #39 (export button needs JSON), #41 (clipboard needs data)
   - **Rationale**: Defines export format consumed by export button and clipboard
   - **Tasks**:
     - Create jsonSerializer.ts utility
     - Define AIAgentExportFormat interface
     - Implement Issue → JSON conversion
     - Handle edge cases

**Priority 2 (State Management - Selector):**
2. **#43: Redux Selector for Total Issue Count** (1 SP)
   - **Layer**: State Management (Layer 2)
   - **Dependencies**: Analysis results state (Epic #5, #28)
   - **Blocks**: #42 (metrics card needs count)
   - **Rationale**: Derived selector needed for metrics display
   - **Tasks**:
     - Create selectTotalIssueCount selector
     - Memoize for performance
     - Add TypeScript types

**Priority 3 (Parallel UI Features - Layer 3/4):**
3. **#39: Export Button Component for AI Agent Integration** (3 SP) [STREAM A]
   - **Layer**: Container Component (Layer 4)
   - **Dependencies**: #40 (JSON serialization), Issue detail modal (Epic #6, #33)
   - **Parallel with**: #42 (independent UI features)
   - **Rationale**: Export modal independent of dashboard metrics
   - **Tasks**:
     - Create ExportButton container component
     - Create JsonExportModal presentation component
     - Add syntax-highlighted JSON display
     - Add explanatory text

4. **#42: Dashboard Metrics Card for AI Firewall** (3 SP) [STREAM B]
   - **Layer**: Presentation Component (Layer 3)
   - **Dependencies**: #43 (selectTotalIssueCount)
   - **Parallel with**: #39 (independent UI features)
   - **Rationale**: Metrics card independent of export functionality
   - **Tasks**:
     - Create MetricCard presentation component
     - Create DashboardMetrics container component
     - Add shield icon and success styling
     - Position in dashboard/results header

**Priority 4 (Enhancements - Layer 3):**
5. **#41: Copy to Clipboard Functionality** (2 SP)
   - **Layer**: Utility Component
   - **Dependencies**: #39 (export modal must exist), #40 (JSON data)
   - **Rationale**: Enhances export feature after core modal exists
   - **Tasks**:
     - Create CopyToClipboard component
     - Implement Clipboard API
     - Add visual feedback (copied state)
     - Handle errors gracefully

6. **#44: AI Firewall Messaging and Visual Identity** (1 SP)
   - **Layer**: Content/UX Enhancement
   - **Dependencies**: #39 (export modal), #42 (metrics card)
   - **Rationale**: Polish layer; adds messaging to all features
   - **Tasks**:
     - Define messaging constants
     - Add shield icon to metrics
     - Add explanatory text to export modal
     - Apply success color scheme

#### Dependency Visualization

```
#40 (JSON) ──┬──> #39 (Export Modal) ──> #41 (Clipboard) ──┐
            │                                               │
            │                                               ├──> #44 (Messaging)
            │                                               │
#43 (Selector) ──> #42 (Metrics Card) ─────────────────────┘
```

#### Parallelization Strategy

- **Sequential Phase 1**: #40 (2 SP)
- **Sequential Phase 2**: #43 (1 SP) - Can parallel with #40 if Issue interface ready
- **Parallel Phase 3**: #39 and #42 simultaneously (max 3 SP)
- **Sequential Phase 4**: #41 (2 SP)
- **Sequential Phase 5**: #44 (1 SP)

**Critical Path**: #40 → #39 → #41 → #44 = 8 story points
**With Parallelization**: [#40 || #43] → [#39 || #42] → #41 → #44 = 9 story points
**Time Savings**: 3 story points (25% faster) with 2 developers

#### Implementation Guidance

**Start Immediately** (Can Parallel):
- Stream A: #40 (JSON Serialization)
- Stream B: #43 (Redux Selector) - if Issue interface ready

**Start After Phase 1** (Assign 2 Streams):
- Stream A: #39 (Export Button)
- Stream B: #42 (Metrics Card)

**Start After #39 Completes**:
- #41 (Copy to Clipboard)

**Start After #39 and #42 Complete**:
- #44 (AI Firewall Messaging)

---

## Cross-Epic Dependencies

### Epic Dependencies Map

```
Epic #1 (PWA) ──────────────────────────────┐
                                            │
Epic #2 (Landing Page) ─────────────────────┤
                                            │
Epic #3 (Repository Selection) ─────────────┼──> Epic #4 (File Tree)
                                            │
                                            │
Epic #5 (Analysis) ──> Epic #6 (Details) ──┼──> Epic #7 (Export)
                                            │
                                            │
                                            └──> Complete MVP
```

### Critical Path Across All Epics

1. **Epic #3 (Repository Selection)** → provides repository context
2. **Epic #4 (File Tree)** → displays project structure
3. **Epic #5 (Formal Verification)** → provides Issue data
4. **Epic #6 (Issue Details)** → displays detailed information
5. **Epic #7 (AI Export)** → demonstrates AI firewall value

**Note**: Epic #1 (PWA) and #2 (Landing Page) can be developed in parallel with Epics #3-7.

---

## Architectural Layer Summary

### Layer 1: Data Models and Types (Foundation)
- **Epic #4**: #22 (FileNode interface, mock file tree data)
- **Epic #5**: #26 (Issue interface, mock issue data)
- **Epic #7**: #40 (JSON serialization format)

**Principle**: All data structures must be defined before components that consume them.

### Layer 2: State Management (Redux)
- **Epic #5**: #28 (analysisSlice with async thunk)
- **Epic #7**: #43 (selectTotalIssueCount selector)

**Principle**: State management layer sits between data and UI.

### Layer 3: Presentation Components (Pure UI)
- **Epic #4**: #23 (FileTreeView), #24 (FileIcon)
- **Epic #5**: #29 (ResultsDrawer), #30 (IssueList/IssueCard), #31 (IssueSummary)
- **Epic #6**: #34 (CodeSnippet), #35 (FormalProof), #36 (ProofVisualization), #37 (IssueExplanation)
- **Epic #7**: #42 (MetricCard)

**Principle**: Presentation components are reusable, stateless, and UI-focused.

### Layer 4: Container Components (State-Connected)
- **Epic #5**: #27 (AnalysisButton)
- **Epic #6**: #33 (IssueDetailModal)
- **Epic #7**: #39 (ExportButton), #42 (DashboardMetrics container)

**Principle**: Container components connect Redux state to presentation components.

### Layer 5: Integration and Enhancement
- **Epic #4**: #25 (File tree integration into RepositoryView)
- **Epic #5**: #32 (Drawer collapse/expand)
- **Epic #6**: #38 (SuggestedFix - depends on CodeSnippet)
- **Epic #7**: #41 (Copy to clipboard), #44 (Messaging)

**Principle**: Integration work happens after all constituent components exist.

---

## Parallelization Summary

### Epic #4: File Tree Visualization
- **Parallel Opportunities**: #23 and #24 (2 developers)
- **Time Savings**: Minimal (2 SP)
- **Recommendation**: Nice-to-have parallelization if team available

### Epic #5: Formal Verification Analysis
- **Parallel Opportunities**:
  - Phase 3: #27 and #29 (5 SP saved)
  - Phase 4: #31 and #30 (5 SP saved)
- **Time Savings**: 8 SP (32%)
- **Recommendation**: **High priority for parallelization** - significant time savings

### Epic #6: Issue Investigation & Details
- **Parallel Opportunities**: #34, #35, #36, #37 (all tab content)
- **Time Savings**: 10 SP (48%)
- **Recommendation**: **Highest priority for parallelization** - maximum time savings

### Epic #7: AI Agent Integration & Export
- **Parallel Opportunities**:
  - Phase 1: #40 and #43 (1 SP saved)
  - Phase 3: #39 and #42 (3 SP saved)
- **Time Savings**: 3 SP (25%)
- **Recommendation**: Moderate priority for parallelization

### Overall Parallelization Impact

- **Sequential Total**: 71 story points
- **With Optimal Parallelization**: ~50 story points (30% reduction)
- **Realistic 2-Developer Team**: ~55 story points (22% reduction)

---

## Story Point Distribution Analysis

### By Epic
- **Epic #4**: 13 SP (18%)
- **Epic #5**: 25 SP (35%) - Largest Epic
- **Epic #6**: 21 SP (30%)
- **Epic #7**: 12 SP (17%)

### By Architectural Layer
- **Layer 1 (Data)**: 10 SP (14%)
- **Layer 2 (State)**: 4 SP (6%)
- **Layer 3 (Presentation)**: 37 SP (52%)
- **Layer 4 (Container)**: 9 SP (13%)
- **Layer 5 (Integration)**: 11 SP (15%)

### Complexity Distribution
- **1 SP stories**: 2 stories (low complexity selectors/messaging)
- **2 SP stories**: 5 stories (simple UI components)
- **3 SP stories**: 8 stories (medium complexity)
- **5 SP stories**: 8 stories (high complexity)

**Insight**: Balanced distribution enables steady velocity and predictable delivery.

---

## Risk Assessment

### High-Risk User Stories (Require Careful Attention)

1. **#26: Create Mock Issue Data** (5 SP)
   - **Risk**: Blocks entire Epic #5
   - **Mitigation**: Start immediately; allocate experienced developer
   - **Complexity**: Requires realistic C++ bugs and SMT-LIB proofs

2. **#23: File Tree Component** (5 SP)
   - **Risk**: Recursive component logic can be tricky
   - **Mitigation**: Use Material-UI TreeView library; follow TRIZ-IFR principle
   - **Complexity**: Recursive rendering and state management

3. **#36: Proof Visualization** (5 SP)
   - **Risk**: Creative design requirement; may need iteration
   - **Mitigation**: Start early; consider simple step-by-step format first
   - **Complexity**: Balancing technical accuracy with non-expert comprehension

### Technical Dependencies External to User Stories

1. **Material-UI Theme Configuration**
   - Required by: Most UI components
   - Status: Needs setup before UI work begins

2. **Framer Motion Library**
   - Required by: #29 (drawer), #33 (modal)
   - Status: Install before Epic #5, Story #29

3. **Prism.js / highlight.js**
   - Required by: #34 (code snippet), #35 (formal proof)
   - Status: Install before Epic #6, Story #34

4. **Repository Selection (Epic #3)**
   - Required by: Epic #4, Story #25
   - Status: ⚠️ Epic #3 needs User Story breakdown first

---

## Immediate Next Steps

### For Epics with User Stories (Ready to Start)

#### Epic #4: File Tree Visualization
**START NOW**: #22 - Display Realistic C++ Project Structure
**Blockers**: None
**Developer**: 1 developer, 3 story points
**Deliverable**: FileNode interface + mock data for both repositories

#### Epic #5: Formal Verification Analysis
**START NOW**: #26 - Create Mock Issue Data with All Bug Categories
**Blockers**: None
**Developer**: 1 senior developer (requires C++ and SMT-LIB knowledge), 5 story points
**Deliverable**: Issue interface + realistic mock data covering all bug categories

### For Epics Without User Stories

#### Epic #1: PWA Installation & Launch Experience
**Action**: Run `/epic-to-user-stories 1` to break down into User Stories
**Estimated Stories**: 5-7 stories
**Priority**: Medium (can run parallel to Epics #4-#7)

#### Epic #2: Landing Page & GitHub Connection Flow
**Action**: Run `/epic-to-user-stories 2` to break down into User Stories
**Estimated Stories**: 4-6 stories
**Priority**: Medium (can run parallel to Epics #4-#7)

#### Epic #3: Repository Selection Dashboard
**Action**: Run `/epic-to-user-stories 3` to break down into User Stories
**Estimated Stories**: 3-5 stories
**Priority**: **HIGH** - Blocks Epic #4, Story #25

---

## Verification Checklist

### Dependency Verification

- [x] **Epic #4**: All dependencies mapped correctly
  - #22 blocks #23, #24, #25
  - #23 and #24 both block #25
  - No circular dependencies

- [x] **Epic #5**: All dependencies mapped correctly
  - #26 blocks #28
  - #28 blocks #27, #29, #30, #31
  - #29 blocks #32
  - No circular dependencies

- [x] **Epic #6**: All dependencies mapped correctly
  - #33 blocks all tab content stories
  - #34 blocks #38 (CodeSnippet reuse)
  - No circular dependencies

- [x] **Epic #7**: All dependencies mapped correctly
  - #40 blocks #39, #41
  - #43 blocks #42
  - #39 blocks #41
  - #39 and #42 block #44
  - No circular dependencies

### Architectural Layer Verification

- [x] **Layer 1 (Data)** comes before all other layers
- [x] **Layer 2 (State)** comes before Layer 3/4 (UI)
- [x] **Layer 3 (Presentation)** can parallel with Layer 2 in some cases
- [x] **Layer 4 (Container)** depends on both Layer 2 and Layer 3
- [x] **Layer 5 (Integration)** comes after all component layers

### First User Story Verification

- [x] **Epic #4**: #22 is truly unblocked (no dependencies)
- [x] **Epic #5**: #26 is truly unblocked (no dependencies)
- [x] **Epic #6**: #33 requires Epic #5, Story #28 (BLOCKED until #28 complete)
- [x] **Epic #7**: #40 requires Epic #5, Story #26 (BLOCKED until #26 complete)

### Parallelization Verification

- [x] **Epic #4**: #23 and #24 are genuinely independent
- [x] **Epic #5**: Parallel streams verified as independent
- [x] **Epic #6**: All tab content stories are independent except #38
- [x] **Epic #7**: #39 and #42 are genuinely independent

### Critical Path Verification

- [x] **Epic #4**: Critical path = 11 SP (#22 → #23 → #25)
- [x] **Epic #5**: Critical path = 20 SP (#26 → #28 → #29 → #30 → #32)
- [x] **Epic #6**: Critical path = 11 SP (#33 → #34 → #38)
- [x] **Epic #7**: Critical path = 8 SP (#40 → #39 → #41 → #44)

---

## Conclusion

This prioritization analysis provides a clear, dependency-aware sequence for implementing all User Stories across Epics #4, #5, #6, and #7. Key takeaways:

1. **Foundation First**: Data models and state management must precede UI work
2. **Significant Parallelization Opportunity**: 30% time savings possible with proper team assignment
3. **Clear Starting Points**: Epic #4 (#22) and Epic #5 (#26) can start immediately
4. **Epic #3 is Critical**: Must break down Epic #3 to unblock Epic #4, Story #25
5. **No Circular Dependencies**: All sequences are implementable as specified

### Recommended Team Strategy

**2-Developer Team**:
- **Developer A**: Focus on Epic #4 → Epic #6 (UI-heavy)
- **Developer B**: Focus on Epic #5 → Epic #7 (State + complex components)
- **Coordination Points**: After #28 (analysisSlice), after #33 (modal infrastructure)

**Solo Developer**:
- Follow sequential path with critical path priorities
- Expected timeline: 71 story points (14-15 sprints at 5 SP/sprint)

---

**Analysis Completed**: 2025-12-03
**Next Update**: After Epics #1, #2, #3 are broken down into User Stories
