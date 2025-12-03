# Product Requirements Document: C++ Grinding Mockup - Formal Verification Linter

**Version**: 1.0
**Date**: 2024-12-02
**Status**: Draft

---

## 1. Overview

### Problem Statement
Alchemist investors need to see a compelling, working demonstration of the Hupyy formal verification concept during tomorrow's Zoom interview. Without a functional demo, the pitch relies solely on slides and verbal description, which fails to convey the technical credibility and product vision needed to secure investment.

Additionally, the broader market problem is that AI code generation tools (Copilot, Claude, GPT) produce plausible but potentially buggy C/C++ code. Development teams lack automated formal verification in their workflow to catch critical bugs before production deployment.

### Solution Vision
A Progressive Web App that demonstrates a complete formal verification workflow for C/C++ code. The demo simulates connecting to GitHub repositories, analyzing code with SMT solvers (cvc5), and displaying actionable results with formal proofs. This showcases Hupyy's vision of creating an "AI firewall" service that catches bugs in AI-generated code before they reach production.

The mockup is fully client-side with no backend, using simulated data to demonstrate the product experience and value proposition.

### Goals & Objectives
- **Primary Goal**: Deliver a polished, professional demo that impresses Alchemist investors and leads to next-stage funding discussions
- **Secondary Goal**: Validate the product concept and UX flow through live demonstration
- **Technical Goal**: Prove team capability to build production-quality software with AI-assisted development
- **Market Goal**: Clearly communicate the "AI firewall" value proposition for catching bugs in AI-generated code

### Target Users
- **Primary (Immediate)**: Alchemist investors/evaluators viewing Zoom demo presentation
- **Secondary (Future)**: Development teams using AI code generation tools who need formal verification as a safety layer

---

## 2. User Personas

### Persona 1: Alchemist Investor/Evaluator
**Description**: Mix of technical and product-focused investors at Alchemist accelerator. They evaluate dozens of pitches and can quickly distinguish between vaporware and credible products. Viewing via Zoom, they need to be impressed within the first few minutes.

**Goals**:
- Understand the product vision and market opportunity quickly
- See proof that the team can execute technically
- Evaluate whether the product solves a real problem worth funding
- Determine if this is differentiated from existing static analysis tools

**Pain Points**:
- Tired of seeing pitch decks without working products
- Skeptical of overly ambitious technical claims without proof
- Limited attention span - need to be hooked immediately
- Difficulty assessing technical feasibility from verbal descriptions alone

**Needs**:
- Professional, polished demo that works flawlessly
- Clear explanation of how this is different from traditional linters
- Evidence that formal verification can catch real bugs AI tools would miss
- Confidence that the team can build the real product

---

### Persona 2: Future Customer - Development Team Lead
**Description**: Engineering manager or tech lead at a company using AI coding assistants (GitHub Copilot, Claude Code, GPT-4) to accelerate C/C++ development. Concerned about code quality and bugs introduced by AI-generated code.

**Goals**:
- Catch critical bugs (memory safety, race conditions) before production
- Ensure AI-generated code meets safety standards
- Integrate verification seamlessly into existing CI/CD workflow
- Get actionable fixes that can be fed back to AI agents

**Pain Points**:
- AI generates code that compiles and looks correct but has subtle bugs
- Traditional static analysis has too many false positives
- No way to formally prove absence of critical bug classes
- Manual code review is time-consuming and misses edge cases

**Needs**:
- Automated detection of memory safety, concurrency, and undefined behavior issues
- Formal proofs that bugs exist (not heuristics)
- Actionable fixes in a format AI agents can consume
- Integration with GitHub workflow

---

## 3. User Stories

### Core User Stories

**As an** Alchemist investor, **I want** to see a working demo of the formal verification workflow **so that** I can evaluate the product's viability and the team's execution capability
- **Acceptance Criteria**:
  - Demo completes without technical issues
  - UI is professional and polished (not a hackathon prototype)
  - Workflow is clear and intuitive
  - Value proposition is immediately understandable
- **Priority**: Must-have

**As an** Alchemist investor, **I want** to understand how this differs from traditional linters **so that** I can assess market differentiation
- **Acceptance Criteria**:
  - Demo shows formal SMT proofs (not heuristic warnings)
  - Results include "verified by cvc5" indicators
  - Clear explanation of formal verification vs static analysis
- **Priority**: Must-have

**As a** future development team lead, **I want** to see bugs categorized by type (memory safety, concurrency, etc.) **so that** I can prioritize fixes
- **Acceptance Criteria**:
  - Issues grouped or color-coded by category
  - All major bug categories represented (memory, concurrency, undefined behavior, type safety)
  - Severity levels visible
- **Priority**: Must-have

**As a** future development team lead, **I want** to export results in a format AI agents can consume **so that** I can close the feedback loop with AI code generators
- **Acceptance Criteria**:
  - "Export for AI Agent" button visible on issues
  - Export shows structured JSON format
  - Format includes code location, issue description, and suggested fix
- **Priority**: Must-have

**As a** demo viewer, **I want** to install the app as a PWA from Chrome **so that** I experience the product as a real application (not just a web page)
- **Acceptance Criteria**:
  - Installable from Chrome browser
  - App icon and splash screen present
  - Launches as standalone app
  - Works offline after installation
- **Priority**: Must-have

---

## 4. Feature Specifications

### Feature 1: PWA Installation & Launch Experience
**Priority**: Must-have

**Description**: The application must be a fully functional Progressive Web App that can be installed from Chrome and launched as a standalone application. This demonstrates technical sophistication and provides a more professional demo experience than a simple web page.

**User Flow**:
1. User opens localhost URL in Chrome browser
2. Browser detects PWA capability (install prompt may appear)
3. User clicks Chrome menu → "Install C++ Verifier" (or similar)
4. App installs with Hupyy icon on macOS dock/applications
5. App launches as standalone window (no browser chrome)
6. App works offline (no backend dependency)

**Acceptance Criteria**:
- [ ] manifest.json configured with app name, icons, theme color
- [ ] Service worker registered for offline functionality
- [ ] App installs successfully from Chrome
- [ ] Hupyy, Inc branding visible in app icon and splash screen
- [ ] Launches as standalone app (display: standalone in manifest)
- [ ] Works offline after initial load

**Success Metrics**:
- Successful installation during demo
- Zero errors during install or launch
- Professional appearance in installed state

**Dependencies**:
- manifest.json file
- Service worker implementation
- App icons (192x192, 512x512)

---

### Feature 2: Landing Page with GitHub Connection Flow
**Priority**: Must-have

**Description**: Professional landing page following macOS design aesthetic with Hupyy, Inc branding. Provides clear entry point to the demo with "Connect to GitHub" call-to-action and tagline explaining the formal verification value proposition.

**User Flow**:
1. PWA launches to landing page
2. User sees Hupyy branding, product name, and tagline
3. Tagline explains formal verification for AI-generated code
4. Prominent "Connect to GitHub" button visible
5. User clicks button
6. Simulated connection animation (1-2 seconds)
7. Smooth transition to repository dashboard

**Acceptance Criteria**:
- [ ] macOS aesthetic (clean, spacious, subtle shadows, SF Pro or similar font)
- [ ] Hupyy, Inc branding clearly visible (logo, company name)
- [ ] Compelling tagline that explains "AI firewall" concept
- [ ] "Connect to GitHub" CTA button prominent and clear
- [ ] Simulated loading state feels authentic (not instant)
- [ ] Smooth page transition animation
- [ ] Light mode only (no dark mode for MVP)

**Success Metrics**:
- Viewer immediately understands what the product does
- Professional visual impression in first 3 seconds

**Dependencies**:
- Hupyy, Inc logo and brand assets
- Tagline copy (needs drafting)

---

### Feature 3: Simulated Repository Selection Dashboard
**Priority**: Must-have

**Description**: After "connecting" to GitHub, display a list of two high-profile simulated repositories that demonstrate the tool's applicability to critical infrastructure code. Repository selection allows demonstrating versatility across different code domains.

**User Flow**:
1. Dashboard loads showing "Connected to GitHub" status
2. Two repository cards/items displayed:
   - "stripe/payment-gateway" (security-critical fintech)
   - "meta/compiler-optimizer" (performance-critical systems)
3. Each repo shows metadata: language (C++), file count, last updated
4. User clicks on a repository to select it
5. Repository loads with file tree display

**Acceptance Criteria**:
- [ ] Two repos clearly visible: "stripe/payment-gateway" and "meta/compiler-optimizer"
- [ ] Repo cards show relevant metadata (language, stars/activity icons, description)
- [ ] Clear visual affordance for selection (hover states, click targets)
- [ ] Selection triggers smooth transition to repo view
- [ ] "Connected" status indicator visible
- [ ] Option to switch repos visible (dropdown or navigation)

**Success Metrics**:
- Repo names impress Alchemist evaluators (recognizable, high-stakes)
- Clear that tool handles diverse code domains

**Dependencies**:
- Mock repository data structure
- Repository metadata definitions

---

### Feature 4: Repository File Tree Display
**Priority**: Must-have

**Description**: Display realistic C++ project file structure for the selected repository. Provides context for the analysis results and makes the simulation feel authentic.

**User Flow**:
1. After selecting repo, file tree displays on left side or in drawer
2. Tree shows realistic C++ project structure:
   - src/ directory with .cpp and .h files
   - include/ directory
   - tests/ directory
   - CMakeLists.txt or similar build files
3. Files are organized in collapsible folders
4. File icons indicate file types (C++, header, build)
5. User can see context for where issues will be found

**Acceptance Criteria**:
- [ ] Realistic C++ project structure (src/, include/, tests/)
- [ ] 10-20 files total per repo (enough to feel real, not overwhelming)
- [ ] Folders are collapsible/expandable
- [ ] File type icons visible (.cpp, .h, .txt)
- [ ] macOS-style tree view aesthetic
- [ ] Files don't need to be clickable/openable (out of scope for MVP)

**Success Metrics**:
- Looks like a real C++ project
- Provides context for analysis results

**Dependencies**:
- Mock file tree data structure for each repo

---

### Feature 5: Run Analysis Button & Simulated Processing
**Priority**: Must-have

**Description**: Prominent action button to trigger the formal verification analysis. Includes realistic loading state to simulate actual cvc5 processing and build anticipation for results.

**User Flow**:
1. User sees file tree with "Run Formal Verification" button prominent
2. Button clearly indicates action (icon + text)
3. User clicks button
4. Button state changes to "Analyzing..." with spinner
5. Progress indicator or animation shows work happening (2-5 seconds)
6. Completion animation (checkmark, success state)
7. Results drawer slides in

**Acceptance Criteria**:
- [ ] "Run Formal Verification" button clearly visible and actionable
- [ ] Button includes icon (shield, check, verification symbol)
- [ ] Loading state shows progress (spinner, progress bar, or animation)
- [ ] Loading duration feels realistic (2-5 seconds, not instant)
- [ ] Button disabled during analysis to prevent double-clicks
- [ ] Completion state before results appear
- [ ] macOS-style button design

**Success Metrics**:
- Loading feels authentic (not obviously fake)
- Builds anticipation for results
- Zero confusion about what the button does

**Dependencies**:
- Timer/delay for simulated processing
- Loading animation assets or CSS animations

---

### Feature 6: Results Display in macOS-Style Drawer
**Priority**: Must-have

**Description**: Display 3-5 formal verification issues in a macOS-style drawer panel that slides in from the side or bottom. Issues represent all major bug categories (memory safety, concurrency, undefined behavior, type safety) with clear visual hierarchy and severity indicators.

**User Flow**:
1. After analysis completes, drawer slides into view smoothly
2. Header shows summary: "Found 4 issues" with severity breakdown
3. Issues listed in cards/rows grouped by file or severity
4. Each issue shows:
   - Severity indicator (critical/high/medium, color-coded)
   - Category badge (Memory Safety, Concurrency, etc.)
   - File name and line number
   - Brief description
   - "Expand" affordance
5. User can scroll through issues
6. Click issue to expand details

**Acceptance Criteria**:
- [ ] Drawer slides in with smooth animation
- [ ] 3-5 issues per repo (stripe has different issues than meta)
- [ ] All bug categories represented across both repos:
  - Memory safety (buffer overflow, use-after-free, null pointer dereference)
  - Concurrency (race conditions, deadlocks)
  - Undefined behavior (integer overflow, uninitialized variables)
  - Type safety violations
- [ ] Each issue clearly shows: severity, category, file, line, brief description
- [ ] Color-coded severity (red for critical, yellow/orange for high, etc.)
- [ ] Grouped presentation (by file or by severity)
- [ ] Drawer can be collapsed/minimized
- [ ] macOS aesthetic (subtle shadows, smooth animations)

**Success Metrics**:
- Immediately clear that serious bugs were found
- Visual hierarchy makes scanning easy
- Looks polished and professional

**Dependencies**:
- Mock issue data for both repositories
- Severity and category taxonomies
- Drawer animation implementation

---

### Feature 7: Issue Detail Expansion with Comprehensive Views
**Priority**: Must-have

**Description**: When user clicks an issue, expand to show comprehensive details including: problematic C++ code snippet, SMT-LIB/cvc5 formal proof, simplified proof representation, human-readable explanation, and actionable fix. This demonstrates the depth of formal verification vs traditional linting.

**User Flow**:
1. User clicks on an issue in the list
2. Issue card expands or modal opens
3. Tabs or sections show all information:
   - **Code** tab: Problematic C++ snippet with line numbers, syntax highlighting
   - **Formal Proof** tab: Actual cvc5/SMT-LIB syntax showing proof
   - **Proof Visualization** tab: Simplified symbolic representation
   - **Explanation** tab: Human-readable description of bug
   - **Fix** tab: Suggested code fix with before/after
4. "Verified by cvc5" badge/indicator prominent
5. User can switch between tabs to see different views
6. Close button returns to issue list

**Acceptance Criteria**:
- [ ] Code snippet shows actual C++ with line numbers
- [ ] Syntax highlighting for C++ code
- [ ] SMT-LIB/cvc5 proof uses realistic syntax (doesn't need to be 100% valid, just plausible)
- [ ] Simplified proof representation for non-experts (symbolic diagram or pseudo-code)
- [ ] "Verified by cvc5" badge clearly visible
- [ ] Human-readable explanation in clear, non-jargon language
- [ ] Suggested fix shows specific code change
- [ ] All views accessible (tabs, accordion, or sections)
- [ ] Easy to close and return to list

**Success Metrics**:
- Demonstrates formal verification depth vs traditional linting
- Multiple views show value for both technical and non-technical audiences
- Actionable fixes prove practical value

**Dependencies**:
- Mock C++ code snippets for each issue
- Mock SMT-LIB proof text
- Simplified proof visualizations
- Fix suggestions for each issue

---

### Feature 8: AI Agent Integration Features
**Priority**: Must-have

**Description**: Two features that demonstrate the "AI firewall" concept: (1) "Export for AI Agent" button on each issue that shows JSON structure, and (2) dashboard metric showing total bugs blocked. This connects the demo to the larger vision of catching AI-generated bugs.

**User Flow - Export Button**:
1. User viewing issue details sees "Export for AI Agent" button
2. User clicks button
3. Modal or expandable section shows formatted JSON:
   ```json
   {
     "file": "src/payment.cpp",
     "line": 142,
     "severity": "critical",
     "category": "memory-safety",
     "issue": "buffer overflow in payment processing",
     "proof": "cvc5 formal verification",
     "suggested_fix": "..."
   }
   ```
4. Copy button allows copying JSON to clipboard
5. Explanation text: "This format can be sent to AI agents (Claude, GPT) to automatically generate fixes"

**User Flow - Dashboard Metric**:
1. Dashboard or results header shows metric card
2. Metric displays: "Blocked 7 AI-Generated Bugs" or similar
3. Subtitle explains: "Formal verification caught these issues before production"
4. Visual indicator (shield icon, success color)

**Acceptance Criteria**:
- [ ] "Export for AI Agent" button visible on each issue detail view
- [ ] JSON export shows realistic structure with all necessary fields
- [ ] JSON is properly formatted and syntax-highlighted
- [ ] Copy to clipboard functionality works
- [ ] Dashboard metric visible (location: header, sidebar, or results summary)
- [ ] Metric shows aggregated count of issues found
- [ ] Messaging clearly connects to "AI firewall" concept
- [ ] Both features work across both repos

**Success Metrics**:
- Alchemist evaluators understand the "AI firewall" positioning
- Clear differentiation from traditional static analysis
- Practical value demonstrated (not just theoretical)

**Dependencies**:
- JSON serialization of issue data
- Clipboard API implementation
- Dashboard metric calculation

---

## 5. Technical Requirements

### Architecture & Stack
**Preferred Technologies**:
- **Frontend Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit (required by user)
- **UI Library**: Material-UI v5+ with macOS-themed customization
- **PWA**: Workbox for service worker, web app manifest
- **Build Tool**: Vite or Create React App
- **Deployment**: Local development server (localhost:3000 or similar)

**Rationale**: React + Redux provides robust state management for complex UI interactions. Material-UI provides professional baseline components that can be customized to match macOS aesthetic. PWA capabilities demonstrate technical sophistication. TypeScript ensures code quality for rapid AI-assisted development.

### System Requirements
- **Performance**:
  - Initial page load < 2 seconds on modern hardware
  - Smooth 60fps animations (drawer slides, page transitions)
  - Simulated analysis completes in 2-5 seconds
  - No janky scrolling or UI freezes

- **Scalability**: N/A - client-side only, no backend scaling concerns

- **Security**: N/A - no real data, no authentication, localhost only

- **Availability**:
  - Must work offline after initial load (PWA requirement)
  - No external API dependencies that could fail
  - Runs reliably on presenter's macOS system

### Integrations
- **None**: Fully self-contained simulation with no external APIs, databases, or services

### Constraints
- **Timeline**: Must be complete and tested before tomorrow's Zoom presentation
- **No Backend**: Pure client-side React application, all data hardcoded or in Redux store
- **Browser**: Must work perfectly in Chrome (for PWA install and screenshare demo)
- **Platform**: Optimized for macOS aesthetic and presentation on macOS system
- **Branding**: Must incorporate Hupyy, Inc visual identity throughout
- **Mode**: Light mode only (no dark mode for MVP)

### Non-Functional Requirements
- **Accessibility**: Basic keyboard navigation for demo purposes, no WCAG compliance required for MVP
- **Browser Support**: Chrome latest version (primary), Safari secondary
- **Mobile**: Not required - demo on desktop via Zoom screenshare
- **Internationalization**: English only

---

## 6. Success Metrics

### Key Performance Indicators (KPIs)

#### Demo Success Metrics
- **Primary**: Alchemist evaluators express interest in follow-up meeting/next steps
- **Visual Polish**: Zero visual bugs or UI glitches during demo
- **Technical Credibility**: Evaluators believe the team can build the real product
- **Value Clarity**: Evaluators understand "AI firewall" concept without extensive explanation

#### User Engagement (Demo)
- **Completion Rate**: Demo completes full workflow without interruption
- **Question Quality**: Evaluators ask about implementation details and go-to-market (not basic concept questions)
- **Emotional Response**: Positive reactions during demo (visible interest, leaning in, note-taking)

#### Technical Execution
- **Zero Errors**: No console errors, failed loads, or broken interactions
- **Smooth Animations**: All transitions and loading states work as designed
- **PWA Install**: Successfully installs and launches as standalone app
- **Responsive Interactions**: All clicks/actions respond immediately (no lag)

### Measurement Approach
- Qualitative feedback during Zoom call (evaluator reactions, questions asked)
- Post-demo follow-up interest (meeting scheduled, email engagement)
- Self-assessment of technical execution (checklist of features demonstrated)

### Success Criteria

**Tomorrow (Demo Day)**:
- Demo completes without technical issues
- Alchemist evaluators understand the product vision
- Positive feedback on execution and polish
- Interest expressed in next steps

**1 Week Post-Demo**:
- Follow-up meeting scheduled with Alchemist
- Positive feedback received via email or call
- Team has clear next steps for product development

---

## 7. Scope & Boundaries

### In Scope for MVP (Tomorrow's Demo)
- PWA installation and offline functionality
- Landing page with GitHub "connection" simulation
- Two simulated repositories with realistic names and file structures
- File tree display for each repo
- Run analysis button with simulated processing (2-5 seconds)
- Results drawer with 3-5 issues per repo
- All bug categories represented: memory safety, concurrency, undefined behavior, type safety
- Issue detail expansion with code snippet, SMT proof, explanation, and fix
- "Export for AI Agent" functionality with JSON format
- Dashboard metric showing total bugs found
- macOS aesthetic with Hupyy, Inc branding
- Light mode only

### Explicitly Out of Scope (Deferred or Excluded)
- **Real Backend**: No API server, database, or external services
- **Actual GitHub OAuth**: No real GitHub authentication or API calls
- **Real Formal Verification**: No actual cvc5 integration, all results are mocked
- **User Accounts**: No authentication, user profiles, or data persistence
- **Session Persistence**: Data resets on page reload (acceptable for demo)
- **Dark Mode**: Light mode only for MVP
- **Mobile Responsiveness**: Desktop-only, optimized for Zoom screenshare
- **File Content Viewing**: Can't click into files to see full source code
- **Multiple Analysis Runs**: Re-running analysis shows same results (no randomization)
- **Settings/Configuration**: No user preferences or customization
- **Historical Data**: No tracking of previous analysis runs
- **Real Deployment**: Localhost only, no production hosting

### Future Considerations (Post-Demo)
- Real cvc5 backend integration for actual formal verification
- GitHub OAuth and real repository connection
- Persistent storage of analysis results
- User accounts and team collaboration features
- CI/CD integration (GitHub Actions, GitLab CI)
- API for AI agent integration
- Downloadable reports (PDF, JSON)
- Dark mode support
- Mobile-responsive design
- Multi-language support (beyond C++)

---

## 8. Open Questions & Assumptions

### Open Questions
1. **Hupyy, Inc Branding**: Do brand assets (logo, color palette) exist, or do they need to be created for this demo?
2. **Tagline Copy**: What specific tagline should appear on the landing page? (e.g., "Formal Verification Firewall for AI-Generated Code")
3. **Presentation Setup**: What screen resolution will be used for Zoom screenshare? (affects responsive design testing)
4. **Demo Narrative**: Is there a specific order the presenter wants to navigate features, or freestyle?
5. **Backup Plan**: If PWA install fails during demo, is fallback to browser tab acceptable?

### Assumptions
1. **Presenter Familiarity**: Presenter has Chrome installed and knows how to install PWAs
2. **Zoom Setup**: Zoom screenshare will work smoothly with PWA (no technical glitches)
3. **Technical Accuracy**: Simulated SMT proofs don't need to be 100% syntactically correct - just plausible enough for non-experts
4. **Alchemist Knowledge**: Evaluators understand basics of formal verification concept but aren't SMT solver experts
5. **Visual Design**: macOS aesthetic means: SF Pro font (or SF-compatible), subtle shadows, spacious layout, smooth animations, light color palette
6. **Issue Count**: 3-5 issues per repo is sufficient to demonstrate capability without overwhelming
7. **AI-Assisted Development**: Team can leverage AI coding tools to meet aggressive timeline
8. **Testing Environment**: Localhost is acceptable for demo (no need for live URL)
9. **Data Realism**: Mock data (repos, issues, code snippets) should look realistic but doesn't need to be production-level accurate
10. **Success Definition**: Positive evaluator reaction + follow-up interest = successful demo

### Risks

- **Risk**: Timeline is extremely tight (demo tomorrow)
  - **Impact**: High - missing deadline means no demo
  - **Mitigation**: Use AI-assisted development tools, focus ruthlessly on must-have features only, cut any nice-to-haves

- **Risk**: PWA install could fail during demo
  - **Impact**: Medium - reduces polish factor but doesn't break core demo
  - **Mitigation**: Test installation multiple times beforehand, have browser tab fallback ready

- **Risk**: Technical glitch during Zoom screenshare
  - **Impact**: High - interrupts demo flow and damages credibility
  - **Mitigation**: Thorough pre-demo testing, restart computer before demo, close all other applications, have localhost server running before call starts

- **Risk**: Visual design doesn't look polished enough
  - **Impact**: Medium - reduces investor confidence
  - **Mitigation**: Use Material-UI for baseline quality, leverage macOS design patterns that are proven, focus on smooth animations

- **Risk**: Alchemist evaluators don't understand formal verification value prop
  - **Impact**: High - miss the differentiation from traditional linters
  - **Mitigation**: Clear tagline on landing page, "Verified by cvc5" badges prominent, SMT proofs visible in results

- **Risk**: Demo narrative is unclear (evaluators get lost)
  - **Impact**: Medium - reduces impact of demo
  - **Mitigation**: Practice demo walkthrough beforehand, have clear user flow from landing page to results

---

## 9. Appendix

### Glossary
- **PWA (Progressive Web App)**: Web application that can be installed and run like a native app, works offline
- **SMT (Satisfiability Modulo Theories)**: Mathematical framework for formal verification
- **cvc5**: Open-source SMT solver used for formal verification
- **Formal Verification**: Mathematical proof that code satisfies certain properties (vs heuristic analysis)
- **AI Firewall**: Metaphor for a system that catches bugs in AI-generated code before production
- **macOS Aesthetic**: Design language following Apple's Human Interface Guidelines (spacious, subtle, smooth)

### References
- React Documentation: https://react.dev
- Redux Toolkit: https://redux-toolkit.js.org
- Material-UI: https://mui.com
- PWA Best Practices: https://web.dev/progressive-web-apps
- cvc5 SMT Solver: https://cvc5.github.io

### Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-12-02 | Claude (from interview with Alexander Fedin) | Initial PRD |

---

## Notes

### Critical Success Factors
1. **Visual Polish**: First impression in first 3 seconds determines credibility
2. **Zero Errors**: Any bug during demo destroys investor confidence
3. **Clear Narrative**: Evaluators must understand "AI firewall" concept immediately
4. **Realistic Simulation**: Simulated data must feel authentic (repo names, issue descriptions)
5. **Smooth Workflow**: User flow from landing → connection → analysis → results must be seamless

### Demo Day Checklist
Before the Zoom call:
- [ ] Restart computer
- [ ] Close all unnecessary applications
- [ ] Test PWA installation in Chrome
- [ ] Practice full demo walkthrough (timing: 5-7 minutes)
- [ ] Have localhost server running
- [ ] Confirm Zoom screenshare works with PWA
- [ ] Test all interactions (button clicks, drawer animations, issue expansion)
- [ ] Verify no console errors
- [ ] Check visual appearance at presentation resolution

### Implementation Priority Order
1. Basic React + Redux setup with routing
2. PWA configuration (manifest, service worker)
3. Landing page with branding and connection flow
4. Repository selection dashboard
5. File tree display
6. Run analysis button and loading state
7. Results drawer with mock issues
8. Issue detail expansion
9. AI agent integration features
10. Final polish and animation tuning
