# Requirements Interview Notes

**Project**: C++ Grinding Mockup - Formal Verification Linter
**Date**: 2024-12-02
**Interviewer**: Claude
**Interviewee**: Alexander Fedin
**Status**: Complete

---

## Overview

### Problem Statement
Need a compelling demo PWA to present to Alchemist (investment firm) in tomorrow's Zoom interview. The demo must showcase a formally provable C/C++ linter concept that uses SMT solvers (cvc5) to catch bugs in AI-generated code.

### Solution Vision
A fully simulated PWA that demonstrates the complete workflow: connecting to GitHub repos (simulated), browsing code, running formal verification analysis, and displaying actionable results with SMT proofs. This showcases the larger vision of a "firewall" service that catches bugs in AI-generated code before they reach production.

### Target Users
- **Primary**: Alchemist investors/evaluators viewing Zoom demo
- **Future**: Development teams using AI code generation tools who need formal verification as a safety layer

---

## User Personas

### Persona 1: Alchemist Investor/Evaluator
- **Description**: Mix of technical and product-focused investors evaluating the startup pitch via Zoom
- **Goals**: Understand the product vision, see proof of concept, evaluate market opportunity
- **Pain Points**: Skeptical of vaporware, need to see working demo not just slides
- **Success Criteria**: Impressed by professional execution, clear value proposition, technical credibility

### Persona 2: Future Customer (Development Team)
- **Description**: Engineering teams using AI tools (Copilot, Claude, GPT) to generate C/C++ code
- **Goals**: Catch critical bugs before production, ensure AI-generated code is safe
- **Pain Points**: AI generates plausible but buggy code, lack of formal verification in dev workflow
- **Success Criteria**: Automated bug detection, actionable fixes, integration with AI agent workflow

---

## Core Features & Functionality

### Must-Have Features (MVP - Tomorrow's Demo)

1. **PWA Installation & Launch**
   - Description: Chrome-installable PWA with app icon and splash screen
   - User Value: Professional experience, shows technical capability
   - Acceptance Criteria: Can be installed from Chrome, launches as standalone app, works offline

2. **Landing Page with GitHub Connection**
   - Description: Clean landing page with "Connect to GitHub" CTA and tagline about formal verification
   - User Value: Clear entry point, sets context for the demo
   - Acceptance Criteria: macOS aesthetic, Hupyy Inc branding visible, smooth transition to dashboard

3. **Simulated Repository Selection**
   - Description: After "connecting", display list of two simulated repos to choose from
   - User Value: Shows tool can handle multiple repos, demonstrates versatility
   - Acceptance Criteria:
     - Repo 1: "stripe/payment-gateway" (security-critical payment processing)
     - Repo 2: "meta/compiler-optimizer" (performance-critical systems code)
     - Clear repo cards/items with relevant metadata

4. **Repository File Tree Display**
   - Description: Show simulated file structure of selected repository
   - User Value: Provides context, feels like real GitHub integration
   - Acceptance Criteria: Realistic C++ project structure, files organized in folders

5. **Run Analysis Button & Loading State**
   - Description: Prominent "Run Formal Verification" or similar button, with realistic loading simulation
   - User Value: Clear action, builds anticipation
   - Acceptance Criteria: Loading state feels authentic (2-5 seconds), shows progress

6. **Results Display in macOS Drawer Panel**
   - Description: macOS-style drawer showing 3-5 issues per repo
   - User Value: Familiar UX pattern, clean presentation
   - Acceptance Criteria:
     - Drawer slides in smoothly
     - Issues grouped by file
     - Color-coded severity (red/yellow/etc)
     - All problem categories represented:
       - Memory safety (buffer overflow, use-after-free, null pointer)
       - Concurrency (race conditions, deadlocks)
       - Undefined behavior (integer overflow, uninitialized variables)
       - Type safety violations

7. **Issue Detail Expansion**
   - Description: Click issue to see full details with multiple views
   - User Value: Shows depth of analysis, demonstrates formal verification
   - Acceptance Criteria: Shows ALL of:
     - Problematic C++ code snippet with line numbers
     - SMT-LIB/cvc5 formal proof (actual syntax, looks technical)
     - Simplified "formal proof" representation for clarity
     - "Verified by cvc5" indicator/badge
     - Human-readable explanation
     - Actionable fix suggestion

8. **AI Agent Integration Features**
   - Description: Two features showing this is an "AI firewall"
   - User Value: Demonstrates the larger vision beyond just linting
   - Acceptance Criteria:
     - "Export for AI Agent" button on each issue → shows JSON structure
     - Dashboard stat: "Blocked X AI-generated bugs" or similar metric

### Should-Have Features (Post-Demo)
- Repository switching without page reload
- Filter/sort results by severity or category
- Downloadable report generation
- Dark mode support

### Nice-to-Have Features (Future)
- Real GitHub OAuth integration
- Actual cvc5 backend integration
- Multi-file analysis visualization
- Historical analysis tracking

### Explicitly Out of Scope (for MVP)
- Real backend/API - everything is simulated client-side
- Actual formal verification - SMT output is mocked
- Real GitHub connection - OAuth, API calls all fake
- User accounts/authentication
- Data persistence between sessions
- Dark mode (light mode only for demo)
- Mobile responsive design (demo on desktop via Zoom)

---

## User Workflows

### Workflow 1: Primary Demo Flow
**Trigger**: User opens PWA from Chrome

**Steps**:
1. Landing page loads with Hupyy Inc branding, tagline about formal verification
2. User clicks "Connect to GitHub" button (simulated connection)
3. Connection animation/loading state (brief, realistic)
4. Dashboard shows two simulated repos: "stripe/payment-gateway" and "meta/compiler-optimizer"
5. User selects one repo (e.g., stripe/payment-gateway)
6. File tree displays for selected repo
7. User clicks "Run Formal Verification Analysis" button
8. Loading state simulates analysis (2-5 seconds)
9. macOS drawer slides in with 3-5 issues found
10. User clicks on an issue to expand details
11. Details show: code snippet, SMT proof, explanation, actionable fix
12. User sees "Export for AI Agent" button
13. Dashboard shows "Blocked X AI-generated bugs" metric

**Success Outcome**: Alchemist evaluators are impressed by polish, technical credibility, and clear value proposition

### Workflow 2: Repository Switching
**Trigger**: User wants to see results for the other repo

**Steps**:
1. User clicks repo switcher (dropdown or drawer navigation)
2. Second repo loads (meta/compiler-optimizer)
3. File tree updates
4. Run analysis on second repo
5. Different set of 3-5 issues displayed
6. User can compare problem categories across repos

**Success Outcome**: Demonstrates tool handles diverse codebases

---

## Technical Requirements

### Technology Preferences
- **Language/Framework**: React with Redux for state management (required)
- **UI Library**: Material UI with macOS look & feel customization
- **PWA**: Service worker, manifest, installable from Chrome
- **Deployment**: localhost (running on presenter's machine for Zoom demo)
- **Rationale**: React/Redux for robust state management, Material UI for professional polish, PWA for impressive install experience

### System Requirements
- **Performance**: Instant interactions, smooth animations, simulated analysis completes in 2-5 seconds
- **Scalability**: N/A - client-side only, no scaling concerns
- **Security**: N/A - no real data, no backend
- **Availability**: Must work offline (PWA requirement), no backend dependencies

### Integrations
- **None**: Fully self-contained simulation, no external APIs or services

### Constraints
- **Timeline**: Demo tomorrow - must be complete in ~12-18 hours
- **No Backend**: Pure client-side React app, all data mocked
- **Browser**: Must work perfectly in Chrome (for install + demo)
- **Platform**: macOS aesthetic required, light mode only
- **Branding**: Hupyy, Inc branding throughout

---

## Success Metrics

### Key Metrics
- **Demo Success**: Alchemist evaluators impressed, meeting leads to next steps
- **Technical Credibility**: Looks professional, not like a hackathon project
- **Value Clarity**: Evaluators understand "AI firewall" concept immediately

### Success Timeline
- **Tomorrow**: Successful demo presentation, positive feedback
- **1 week**: Follow-up meeting scheduled based on demo strength

### Measurement Approach
Qualitative feedback during and after demo, follow-up interest from Alchemist

---

## Open Questions

1. ✓ Resolved: Repo names - using "stripe/payment-gateway" and "meta/compiler-optimizer"
2. ✓ Resolved: Problem categories - showing all (memory, concurrency, undefined behavior, type safety)
3. ✓ Resolved: Results display - macOS drawer panel
4. Hupyy Inc logo/brand assets - do they exist or need creation?
5. Exact tagline/positioning text for landing page - need to draft

---

## Assumptions

1. Presenter has Chrome installed and knows how to install PWA
2. Zoom screenshare will work smoothly with PWA
3. Simulated data (mock repos, issues, SMT proofs) doesn't need to be 100% technically accurate - just plausible
4. Alchemist evaluators won't deep-dive into SMT syntax validity during demo
5. macOS aesthetic means: clean, spacious, subtle shadows, SF Pro font (or similar), smooth animations
6. 3-5 issues per repo is enough to show capability without overwhelming
7. AI-assisted development can complete this in available timeframe

---

## Risks & Concerns

- **Timeline Risk**: Very tight deadline (demo tomorrow)
  - Mitigation: Use AI-assisted development (50x faster per user), focus on core workflow only

- **Technical Demo Risk**: Something breaks during live Zoom demo
  - Mitigation: Thorough testing beforehand, have localhost running before meeting starts

- **Visual Polish Risk**: Doesn't look professional enough
  - Mitigation: Use Material UI for baseline quality, follow macOS design patterns

---

## Additional Notes

### Direct Quotes
"We use AI-assisted development, it is 50x faster than human being."
- Context: Confidence in timeline despite tight deadline

"The greater idea is that our future service (non-simulated!) will be used as a 'firewall' for AI agents that generate code, so those actionable items can be fed back to AI agents to fix the problems found."
- Context: Core value proposition beyond just linting

### Context & Background
- This is a pitch to Alchemist, a well-known startup accelerator/investor
- The mockup is proving the concept is viable and impressive
- Real product would have actual cvc5 backend doing formal verification
- Target market is development teams increasingly relying on AI code generation

### Dependencies
- Chrome browser availability for install and demo
- Stable internet for Zoom call (but PWA works offline once installed)
- Hupyy Inc branding assets (logo, colors) - TBD

### Stakeholders
- Alexander Fedin (presenter, decision maker)
- Alchemist evaluators (audience)

---

## Next Steps

- [ ] Generate comprehensive PRD from these notes
- [ ] Create Hupyy Inc branding/logo if not existing
- [ ] Build React + Redux + Material UI PWA
- [ ] Populate with mock data (repos, file trees, issues, SMT proofs)
- [ ] Test PWA installation in Chrome
- [ ] Dry run full demo workflow
- [ ] Deploy to localhost ready for tomorrow's Zoom call

---

## Interview Metadata

**Duration**: ~15 minutes
**Completeness**: All sections covered comprehensively
**Confidence Level**: High - clear requirements, user has strong vision
**Follow-up Needed**: No - ready to generate PRD
