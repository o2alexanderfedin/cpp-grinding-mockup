# Epic Identification Criteria

This reference defines what qualifies as an Epic and how to identify them from PRD and architecture documents.

## What is an Epic?

An Epic is a large body of work that:
- Delivers significant business value
- Takes 2-6 sprints to complete
- Can be broken down into multiple User Stories
- Represents a major feature, system component, or initiative
- Has clear acceptance criteria
- Aligns with product goals

## Epic vs User Story vs Task

| Aspect | Epic | User Story | Task |
|--------|------|------------|------|
| **Size** | 2-6 sprints | 1-5 days | Hours |
| **Scope** | Major feature/system | Single feature | Implementation detail |
| **Breakdown** | Into User Stories | Into Tasks | Not broken down |
| **Value** | High business value | Delivers user value | Technical enabler |
| **Example** | "User Authentication System" | "As a user, I can login with OAuth" | "Implement OAuth callback handler" |

**This skill creates ONLY Epics.** User Stories and Tasks are created later during sprint planning.

## Epic Identification from PRD

### Look for Major Features

PRD typically has sections like:
- "Features"
- "Requirements"
- "Functional Requirements"
- "Product Features"

**Each major feature section → candidate Epic**

**Example PRD structure:**
```markdown
## Features

### 1. User Authentication
Users need secure authentication with multiple providers.
- Email/password login
- OAuth (Google, GitHub)
- Password reset
- Session management

### 2. Project Dashboard
Display project overview and metrics.
- Project list
- Activity feed
- Statistics widgets
- Search and filter
```

**Identified Epics:**
1. "[EPIC] User Authentication System"
2. "[EPIC] Project Dashboard"

### Combine Small Features

If features are too small (< 2 sprints), combine related ones:

**Example - TOO SMALL individually:**
- Password reset (1 day)
- Email verification (1 day)
- Account settings (2 days)

**COMBINE into Epic:**
- "[EPIC] User Account Management" (includes reset, verification, settings)

### Respect Feature Boundaries

Don't split a cohesive feature into multiple Epics unless it's genuinely too large.

**Good Epic:**
- "[EPIC] Payment Processing" (includes checkout, payment methods, invoicing)

**Bad split:**
- "[EPIC] Checkout Flow"
- "[EPIC] Payment Methods"
- "[EPIC] Invoice Generation"
→ These are better as User Stories under one Epic

## Epic Identification from Architecture

### Look for Major Components

Architecture typically defines:
- System components/modules
- Architectural layers
- Integration points
- Infrastructure needs

**Each major component → candidate Epic**

**Example Architecture structure:**
```markdown
## System Components

### API Gateway
Express.js-based REST API serving frontend and mobile clients.
- Request routing
- Authentication middleware
- Rate limiting
- API documentation

### Database Layer
PostgreSQL with TypeORM for data persistence.
- Schema design
- Migrations
- Connection pooling
- Query optimization
```

**Identified Epics:**
1. "[EPIC] API Gateway Implementation"
2. "[EPIC] Database Layer Setup"

### Cross-Cutting Concerns

Some architectural concerns span multiple components:

**Infrastructure Epics:**
- "[EPIC] DevOps & CI/CD Pipeline"
- "[EPIC] Monitoring & Observability"
- "[EPIC] Security Implementation"
- "[EPIC] Performance Optimization"

**Technical Epics:**
- "[EPIC] Testing Framework"
- "[EPIC] Documentation System"
- "[EPIC] Error Handling & Logging"

## Mapping PRD to Architecture

**Best Epics appear in BOTH PRD and Architecture:**

| PRD Feature | Architecture Component | Epic |
|-------------|------------------------|------|
| User Authentication | Auth Service + User DB | [EPIC] User Authentication System |
| Project Dashboard | Frontend + Dashboard API | [EPIC] Project Dashboard |
| File Upload | Storage Service + S3 | [EPIC] File Management System |

### Resolve Discrepancies

**Feature in PRD but not Architecture:**
→ Flag for architectural design before creating Epic

**Component in Architecture but not PRD:**
→ Verify business justification before creating Epic

**Naming conflicts:**
→ Use PRD terminology for Epic title (business language)

## Epic Sizing Guidelines

### Too Small (< 2 sprints)

**Indicators:**
- Single User Story could cover it
- Takes days, not weeks
- No sub-features to break down

**Action:** Combine with related features into larger Epic

**Example:**
- "Login page" → Too small
- "User profile page" → Too small
- **Combined Epic:** "[EPIC] User Interface Core Pages"

### Just Right (2-6 sprints)

**Indicators:**
- Can be broken into 5-15 User Stories
- Multiple developers could work on it
- Spans several sprint cycles
- Clear incremental delivery path

**Example:**
- "[EPIC] User Authentication System"
  - Could break into: Login, Registration, OAuth, Password Reset, Session Management, 2FA
  - Multiple developers: frontend + backend + security
  - 3-4 sprints to complete

### Too Large (> 6 sprints)

**Indicators:**
- Would take 2+ months
- Covers multiple major features
- Too many sub-features (20+ User Stories)
- Hard to define clear acceptance criteria

**Action:** Split into multiple Epics

**Example:**
- "Complete E-commerce Platform" → Too large
- **Split into:**
  1. "[EPIC] Product Catalog"
  2. "[EPIC] Shopping Cart & Checkout"
  3. "[EPIC] Payment Processing"
  4. "[EPIC] Order Management"

## Epic Priority

Derive priority from PRD:

### Critical Priority

- Blocking other work
- Core functionality (MVP requirement)
- Security-critical
- Legal/compliance requirement

**Example:** "[EPIC] User Authentication System" (required for any user-facing features)

### High Priority

- Important for current phase
- High business value
- Customer-requested
- Technical foundation

**Example:** "[EPIC] Payment Processing" (key revenue feature)

### Medium Priority

- Standard features
- Enhancement to existing functionality
- Nice-to-have for current release

**Example:** "[EPIC] Advanced Analytics Dashboard"

### Low Priority

- Future enhancement
- Low business impact
- Optimization/refactoring
- Nice-to-have features

**Example:** "[EPIC] Dark Mode Theme"

## Epic Acceptance Criteria

From PRD, extract or derive:

### Functional Criteria

What the Epic must DO:
- "Users can authenticate with email/password"
- "System supports 1000 concurrent users"
- "Payment processing completes in < 3 seconds"

### Non-Functional Criteria

Quality attributes:
- "99.9% uptime"
- "Passes security audit"
- "Mobile responsive"
- "WCAG 2.1 AA compliant"

### Completeness Criteria

When is the Epic DONE:
- "All authentication methods implemented"
- "Integration tests passing"
- "Documentation complete"
- "Security review approved"

## Common Epic Patterns

### Feature Epics

Based on user-facing functionality:
- "[EPIC] User Authentication System"
- "[EPIC] Project Dashboard"
- "[EPIC] File Upload & Management"
- "[EPIC] Search & Filter"
- "[EPIC] Notifications System"

### Component Epics

Based on system architecture:
- "[EPIC] API Gateway"
- "[EPIC] Database Layer"
- "[EPIC] Frontend Application"
- "[EPIC] Background Job Processing"
- "[EPIC] Caching Layer"

### Infrastructure Epics

Foundation and tooling:
- "[EPIC] DevOps & CI/CD Pipeline"
- "[EPIC] Monitoring & Logging"
- "[EPIC] Security Implementation"
- "[EPIC] Testing Framework"
- "[EPIC] Documentation System"

### Integration Epics

Third-party integrations:
- "[EPIC] Payment Gateway Integration"
- "[EPIC] Email Service Integration"
- "[EPIC] Cloud Storage Integration"
- "[EPIC] Analytics Integration"
- "[EPIC] Authentication Provider Integration"

## Quality Checklist

Before finalizing an Epic, verify:

- [ ] **Size**: 2-6 sprints of work
- [ ] **Value**: Clear business value stated
- [ ] **Scope**: Well-defined boundaries
- [ ] **Breakdown**: Can be split into User Stories
- [ ] **PRD Link**: References specific PRD sections
- [ ] **Architecture Link**: References architecture components
- [ ] **Goal**: Clear Epic goal stated
- [ ] **Criteria**: Acceptance criteria defined
- [ ] **Priority**: Priority assigned from PRD
- [ ] **Dependencies**: Other Epics identified
- [ ] **Naming**: "[EPIC] {Name}" format
- [ ] **Description**: Describes WHAT and WHY, not HOW

## Anti-Patterns to Avoid

### ❌ Too Technical

**Bad:** "[EPIC] Implement PostgreSQL with TypeORM"
**Good:** "[EPIC] Database Layer" (mentions PostgreSQL in description)

### ❌ Too Vague

**Bad:** "[EPIC] Improve System"
**Good:** "[EPIC] Performance Optimization" (with specific metrics)

### ❌ Implementation Detail

**Bad:** "[EPIC] Create Login Component"
**Good:** "[EPIC] User Authentication System" (login is a User Story)

### ❌ No Business Value

**Bad:** "[EPIC] Refactor Code"
**Good:** "[EPIC] Performance Optimization - Reduce Page Load Time" (measurable value)

### ❌ Mixing Concerns

**Bad:** "[EPIC] Frontend and Backend and Database"
**Good:** Split into separate Epics for each layer

### ❌ No Acceptance Criteria

**Bad:** "Build authentication" (how do we know when done?)
**Good:** "Authentication complete when email, OAuth, and password reset work with tests passing"

## Examples from Real Projects

### E-commerce Platform

**PRD Features → Epics:**
1. "[EPIC] Product Catalog Management"
2. "[EPIC] Shopping Cart & Checkout"
3. "[EPIC] Payment Processing"
4. "[EPIC] Order Management"
5. "[EPIC] Customer Account Management"
6. "[EPIC] Admin Dashboard"
7. "[EPIC] Inventory Management"
8. "[EPIC] Shipping & Fulfillment Integration"

**Architecture Components → Epics:**
1. "[EPIC] Frontend Application (React)"
2. "[EPIC] API Gateway (Node.js)"
3. "[EPIC] Database Layer (PostgreSQL)"
4. "[EPIC] File Storage (S3)"
5. "[EPIC] Search Engine (Elasticsearch)"
6. "[EPIC] Cache Layer (Redis)"
7. "[EPIC] Message Queue (RabbitMQ)"
8. "[EPIC] DevOps & CI/CD Pipeline"

### SaaS Project Management Tool

**PRD Features → Epics:**
1. "[EPIC] User Authentication & Authorization"
2. "[EPIC] Project Creation & Management"
3. "[EPIC] Task Management"
4. "[EPIC] Team Collaboration"
5. "[EPIC] File Sharing"
6. "[EPIC] Time Tracking"
7. "[EPIC] Reporting & Analytics"
8. "[EPIC] Notifications System"

**Architecture Components → Epics:**
1. "[EPIC] Web Application (Vue.js)"
2. "[EPIC] Mobile App (React Native)"
3. "[EPIC] REST API (Express.js)"
4. "[EPIC] Real-time Service (WebSocket)"
5. "[EPIC] Database Layer (MongoDB)"
6. "[EPIC] Authentication Service"
7. "[EPIC] File Storage Service"
8. "[EPIC] Background Job Processor"

## Summary

**Epic Identification Process:**
1. Read PRD → identify major features → candidate Epics
2. Read Architecture → identify major components → candidate Epics
3. Map features to components → align Epics
4. Size check → combine small, split large
5. Priority assignment → from PRD importance
6. Acceptance criteria → from PRD requirements
7. Dependencies → cross-reference Epics

**Remember:**
- Epics are HIGH-LEVEL
- Epics represent 2-6 sprints of work
- Epics are broken into User Stories LATER
- This skill creates ONLY Epics (no Stories, no Tasks)
