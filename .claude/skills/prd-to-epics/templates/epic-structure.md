# Epic Structure Template

This template defines the standard structure for Epic GitHub Issues created from PRD and Architecture documents.

## Epic Issue Format

```markdown
## Epic Goal
{Single sentence describing what this Epic achieves}

## Description
{Detailed description extracted from PRD, covering:}
- What features are included in this Epic
- What problem this Epic solves
- What business value this Epic provides
- Who benefits from this Epic (user personas)

{2-4 paragraphs providing context and scope}

## PRD References
{For each relevant PRD section:}
- **{Section Title}** (`.requirements/PRD.md:{start_line}-{end_line}`)
  > {Brief excerpt or summary from PRD showing this feature}

{Repeat for all relevant PRD sections}

## Architecture References
{For each relevant architecture component:}
- **{Component/Section Title}** (`.architecture/ARCHITECTURE.md:{start_line}-{end_line}`)
  > {Brief excerpt or summary showing architectural approach}

{Repeat for all relevant architecture sections}

## Acceptance Criteria
{Extracted from PRD or derived from requirements:}
- [ ] {Specific, measurable criterion}
- [ ] {Functional requirement met}
- [ ] {Non-functional requirement met}
- [ ] {Integration tests passing}
- [ ] {Documentation complete}
- [ ] {Security review approved (if applicable)}
- [ ] {Performance benchmarks met (if applicable)}

{5-10 criteria that define when this Epic is complete}

## Business Value
{Why this Epic matters:}
- **Users:** {How this benefits end users}
- **Business:** {Business impact, revenue, growth}
- **Technical:** {Technical value, foundation for future work}

{1-2 paragraphs explaining value proposition}

## Technical Scope
{High-level technical overview from architecture:}
- **Technologies:** {Primary technologies/frameworks used}
- **Components:** {Major system components involved}
- **Integrations:** {Integration points with other systems}
- **Data:** {Key data models and persistence}
- **APIs:** {API endpoints or services}

{2-3 paragraphs outlining technical approach WITHOUT implementation details}

## Dependencies
{What this Epic depends on:}
- #{issue_number} - [EPIC] {Title of blocking Epic}
- {External dependency description}

{What blocks this Epic:}
- {Blocking factor with mitigation plan if known}

{If no dependencies:}
*No dependencies identified*

## Estimated Effort
{X} sprints ({reasoning: team size, complexity, unknowns})

{Breakdown if helpful:}
- Backend: {Y} days
- Frontend: {Z} days
- Integration & Testing: {W} days

---
*Generated from PRD and Architecture documentation*
*PRD: `{PRD_PATH}`*
*Architecture: `{ARCH_PATH}`*
*Generated: {timestamp}*
```

## Field Definitions

### Epic Goal

**Purpose:** One-sentence summary of what this Epic delivers

**Format:** Active voice, clear outcome

**Examples:**
- ✅ "Enable users to securely authenticate using multiple providers"
- ✅ "Provide real-time project dashboard with metrics and activity"
- ✅ "Implement scalable file upload and storage system"
- ❌ "Authentication" (too vague)
- ❌ "Build OAuth system using Passport.js" (too technical, mentions HOW)

**Guidelines:**
- Start with action verb (Enable, Provide, Implement, Create)
- Focus on outcome, not implementation
- Business language, not technical jargon
- One sentence maximum

### Description

**Purpose:** Detailed explanation of what this Epic includes and why it exists

**Content:**
1. **What:** Features and capabilities included
2. **Why:** Problem being solved
3. **Who:** User personas affected
4. **Value:** Business or user benefit

**Length:** 2-4 paragraphs

**Example:**
```
This Epic delivers a comprehensive user authentication system supporting multiple
authentication methods. Users will be able to create accounts, log in, reset
passwords, and manage their sessions securely.

The current system lacks authentication, blocking all user-facing features. This
Epic provides the foundation for personalized experiences, data security, and
access control.

Affected users include all end users who need accounts, plus administrators who
manage user access and permissions. The system must support both individual
users and team collaboration scenarios.

The authentication system follows industry best practices for security, including
password hashing, session management, CSRF protection, and rate limiting. It
integrates with the existing database schema and provides hooks for future
features like SSO and 2FA.
```

### PRD References

**Purpose:** Link Epic to specific sections of PRD for traceability

**Format:**
```markdown
- **{Section Title}** (`.requirements/PRD.md:{line_range}`)
  > {Brief excerpt or summary}
```

**Guidelines:**
- Include section title for easy reference
- Provide file path and line numbers for precision
- Add brief excerpt (1-2 sentences) to show relevance
- Link to multiple PRD sections if Epic spans multiple features
- Use relative paths from project root

**Example:**
```markdown
## PRD References
- **User Authentication Requirements** (`.requirements/PRD.md:120-165`)
  > "The system shall support email/password authentication, OAuth 2.0 with
  > Google and GitHub providers, and secure password reset functionality."

- **Security Requirements** (`.requirements/PRD.md:230-245`)
  > "All passwords must be hashed using bcrypt with minimum 12 rounds. Sessions
  > must expire after 30 days of inactivity."

- **User Personas** (`.requirements/PRD.md:45-60`)
  > "Primary personas include individual developers, team leads, and enterprise
  > administrators, each requiring different permission levels."
```

### Architecture References

**Purpose:** Link Epic to architectural components and technical design

**Format:** Same as PRD References but pointing to architecture doc

**Guidelines:**
- Reference relevant architectural components
- Include technical approach and decisions
- Link to data models, APIs, integrations
- Show how components interact
- Use relative paths from project root

**Example:**
```markdown
## Architecture References
- **Authentication Service** (`.architecture/ARCHITECTURE.md:180-220`)
  > "Express.js middleware handles authentication using Passport.js strategies.
  > JWT tokens provide stateless authentication with refresh token rotation."

- **User Database Schema** (`.architecture/ARCHITECTURE.md:340-365`)
  > "Users table includes email, password_hash, created_at, last_login. OAuth
  > providers stored in separate oauth_accounts table with foreign key to users."

- **API Security** (`.architecture/ARCHITECTURE.md:500-530`)
  > "All authenticated endpoints require valid JWT in Authorization header.
  > Rate limiting applied at 100 requests/hour per user for auth endpoints."
```

### Acceptance Criteria

**Purpose:** Define specific, testable conditions for Epic completion

**Format:** Checklist with measurable criteria

**Guidelines:**
- Start with functional requirements (features work)
- Include non-functional requirements (performance, security)
- Add quality gates (tests, documentation, reviews)
- Make each criterion specific and testable
- Use checkboxes for tracking
- 5-10 criteria typical

**Example:**
```markdown
## Acceptance Criteria
- [ ] Users can register with email and password
- [ ] Users can log in with email and password
- [ ] Users can log in with Google OAuth
- [ ] Users can log in with GitHub OAuth
- [ ] Users can request password reset via email
- [ ] Users can reset password using reset token
- [ ] Sessions persist for 30 days or until logout
- [ ] All authentication API endpoints return < 500ms
- [ ] Password hashing uses bcrypt with 12+ rounds
- [ ] Rate limiting blocks brute force attempts (100 req/hour)
- [ ] All unit tests passing (>90% coverage)
- [ ] Integration tests cover happy path and error cases
- [ ] API documentation complete in Swagger/OpenAPI
- [ ] Security review approved by security team
- [ ] Authentication flows work on mobile and desktop
```

**Criteria Types:**
- **Functional:** Feature X works as specified
- **Non-functional:** Performance, security, usability metrics
- **Quality:** Tests passing, documentation complete
- **Approval:** Reviews, audits, sign-offs

### Business Value

**Purpose:** Justify why this Epic matters to business and users

**Content:**
- User value (how it helps users)
- Business value (revenue, growth, retention)
- Technical value (foundation, debt reduction, scalability)

**Length:** 1-2 paragraphs

**Example:**
```markdown
## Business Value
**Users:** Authentication enables personalized experiences, saves user
preferences, and protects user data. OAuth integration reduces friction by
allowing login with existing accounts. Users gain confidence knowing their
data is secure.

**Business:** Authentication is required for all paid tiers and enables customer
tracking, conversion metrics, and targeted communications. It's the foundation
for our SaaS business model. OAuth reduces support burden by eliminating
password reset requests.

**Technical:** This Epic establishes security patterns and middleware used across
all future features. It provides hooks for SSO, 2FA, and advanced permission
systems planned for future releases.
```

### Technical Scope

**Purpose:** Outline technical approach WITHOUT prescribing implementation

**Content:**
- Technologies/frameworks used (from architecture)
- Major components involved
- Integration points
- Data models
- APIs exposed

**Guidelines:**
- High-level overview, not detailed design
- Reference architecture decisions
- Mention key technologies
- Identify integration points
- 2-3 paragraphs maximum
- Avoid code-level details (leave for User Stories/Tasks)

**Example:**
```markdown
## Technical Scope
This Epic implements authentication using Express.js middleware with Passport.js
handling multiple strategies. The system uses JWT tokens for stateless
authentication with refresh token rotation for security. PostgreSQL stores user
credentials with bcrypt password hashing (12 rounds minimum).

OAuth 2.0 integration supports Google and GitHub providers using official client
libraries. The authentication service exposes REST API endpoints for registration,
login, logout, password reset, and token refresh. All endpoints include rate
limiting (express-rate-limit) and CSRF protection.

The implementation integrates with the existing Express.js API gateway and
PostgreSQL database. Future User Stories will break down the work into specific
tasks like "Implement email/password strategy," "Add Google OAuth," "Create
password reset flow," etc.
```

### Dependencies

**Purpose:** Identify blocking factors and dependent Epics

**Types:**
1. **Epic Dependencies:** Other Epics that must complete first
2. **External Dependencies:** Third-party APIs, vendor access, etc.
3. **Technical Dependencies:** Infrastructure, tools, environments

**Format:**
```markdown
## Dependencies
**Required before starting:**
- #42 - [EPIC] Database Layer Setup
- External: GitHub OAuth app credentials from GitHub Settings

**Blocks these Epics:**
- #50 - [EPIC] User Profile Management (needs authentication)
- #55 - [EPIC] Team Collaboration (needs user accounts)

**No blockers identified** - Can start immediately
```

**If no dependencies:**
```markdown
## Dependencies
*No dependencies identified - This Epic can start immediately*
```

### Estimated Effort

**Purpose:** Rough size estimate for planning

**Format:** `{N} sprints` with optional breakdown

**Guidelines:**
- Based on Epic criteria (2-6 sprints is typical)
- Include reasoning (team size, complexity, unknowns)
- Optional breakdown by discipline or phase
- Assume average team velocity
- Subject to refinement during sprint planning

**Examples:**
```markdown
## Estimated Effort
3 sprints (assuming 2 developers, 2-week sprints)

Breakdown:
- Backend authentication service: 1 sprint
- OAuth integration (Google + GitHub): 1 sprint
- Frontend integration + testing: 1 sprint
```

```markdown
## Estimated Effort
4 sprints (high complexity due to security requirements and multiple providers)

Factors:
- Security audit required before production
- Complex OAuth flows with multiple providers
- Integration with existing user database
- Comprehensive testing needed (unit + integration + security)
```

## Footer

**Always include:**
```markdown
---
*Generated from PRD and Architecture documentation*
*PRD: `{relative_path_to_PRD}`*
*Architecture: `{relative_path_to_architecture}`*
*Generated: {ISO_8601_timestamp}*
```

**Example:**
```markdown
---
*Generated from PRD and Architecture documentation*
*PRD: `.requirements/PRD.md`*
*Architecture: `.architecture/ARCHITECTURE.md`*
*Generated: 2025-12-02T22:30:00Z*
```

## Complete Example

```markdown
## Epic Goal
Enable users to securely authenticate using email/password and OAuth providers.

## Description
This Epic delivers a comprehensive user authentication system supporting multiple
authentication methods. Users will be able to create accounts with email/password,
log in using Google or GitHub OAuth, reset forgotten passwords via email, and
manage their sessions securely.

The current application lacks authentication, blocking all personalized features
and preventing user data persistence. This Epic provides the security foundation
for all future user-facing features including profiles, preferences, team
collaboration, and access control.

Affected users include all end users (developers, team leads, administrators) who
need personal accounts to use the application. The system supports both individual
users and future team collaboration scenarios with role-based permissions.

The authentication system follows OWASP security best practices including bcrypt
password hashing, secure session management, CSRF protection, and rate limiting
against brute force attacks. It integrates seamlessly with the existing PostgreSQL
database and provides extensibility for future enhancements like SSO and 2FA.

## PRD References
- **Authentication Requirements** (`.requirements/PRD.md:120-165`)
  > "The system shall support email/password authentication with strong password
  > requirements (min 8 chars, uppercase, lowercase, number, special char). OAuth
  > 2.0 integration required for Google and GitHub. Password reset via email must
  > complete within 5 minutes. Sessions persist 30 days with automatic renewal."

- **Security Requirements** (`.requirements/PRD.md:230-245`)
  > "All passwords hashed with bcrypt (12+ rounds). JWT tokens for stateless auth
  > with 1-hour expiry and 30-day refresh tokens. Rate limiting: 5 failed login
  > attempts trigger 15-minute lockout. All auth traffic over HTTPS only."

- **User Personas** (`.requirements/PRD.md:45-60`)
  > "Primary users: Individual developers (tech-savvy, prefer OAuth), Team leads
  > (need team management), Enterprise admins (require SSO in future). 80% prefer
  > OAuth over email/password based on user research."

## Architecture References
- **Authentication Service** (`.architecture/ARCHITECTURE.md:180-220`)
  > "Express.js middleware layer with Passport.js handling authentication
  > strategies. JWT-based stateless authentication with httpOnly cookies. Refresh
  > token rotation prevents token theft. Redis stores active sessions for quick
  > revocation."

- **User Database Schema** (`.architecture/ARCHITECTURE.md:340-365`)
  > "users table: id, email, password_hash, email_verified, created_at,
  > last_login, failed_attempts, locked_until. oauth_accounts table: id, user_id,
  > provider, provider_user_id, access_token (encrypted). Foreign key constraints
  > ensure referential integrity."

- **API Endpoints** (`.architecture/ARCHITECTURE.md:420-450`)
  > "POST /auth/register, POST /auth/login, POST /auth/logout, GET /auth/me, POST
  > /auth/refresh, POST /auth/forgot-password, POST /auth/reset-password, GET
  > /auth/oauth/:provider, GET /auth/oauth/:provider/callback. All endpoints
  > return 200 OK with user data or 401 Unauthorized with error details."

- **Security Architecture** (`.architecture/ARCHITECTURE.md:500-530`)
  > "helmet.js for security headers, express-rate-limit for rate limiting (100
  > req/hour per IP on auth endpoints), csurf for CSRF protection, joi for input
  > validation. Sensitive operations (password reset) require email verification."

## Acceptance Criteria
- [ ] Users can register with email/password meeting security requirements
- [ ] Users can log in with email/password
- [ ] Users can log in with Google OAuth 2.0
- [ ] Users can log in with GitHub OAuth 2.0
- [ ] Users can request password reset (email sent within 5 minutes)
- [ ] Users can reset password using valid reset token
- [ ] Reset tokens expire after 24 hours
- [ ] Sessions persist 30 days or until explicit logout
- [ ] Session refresh automatic when user active
- [ ] Failed login attempts (5+) trigger 15-minute lockout
- [ ] All auth endpoints respond < 500ms (p95)
- [ ] Password hashing uses bcrypt with 12 rounds minimum
- [ ] JWT tokens use HS256 with secure secrets
- [ ] All auth traffic over HTTPS enforced
- [ ] Rate limiting active on all auth endpoints
- [ ] CSRF protection active on all state-changing endpoints
- [ ] Unit tests achieve >90% coverage of auth service
- [ ] Integration tests cover all auth flows (happy + error paths)
- [ ] Security penetration test completed with no high/critical issues
- [ ] API documentation complete in Swagger UI
- [ ] Authentication flows work on desktop and mobile browsers

## Business Value
**Users:** Authentication enables personalized experiences (saved preferences,
project history, team collaboration). OAuth integration reduces friction by
allowing users to log in with accounts they already have, eliminating password
fatigue. Users gain confidence knowing their data is secure with industry-standard
practices. Email verification and password reset ensure users never lose access.

**Business:** Authentication is a hard requirement for all paid subscription tiers
and enables critical business functions: user analytics, conversion tracking,
email campaigns, and customer support. It's the foundation for the entire SaaS
business model. OAuth reduces support burden (fewer "forgot password" tickets) and
increases conversion (easier signup). Estimated 25% increase in signup completion
with OAuth vs email/password alone.

**Technical:** This Epic establishes security patterns, middleware, and database
schemas reused by all future features. It provides hooks for planned enhancements:
SSO (for enterprise), 2FA (for security-conscious users), and role-based access
control (for team features). The modular architecture allows adding new OAuth
providers without core changes.

## Technical Scope
This Epic implements authentication using Express.js middleware with Passport.js
managing multiple authentication strategies (local, google-oauth20, github). The
system uses JWT tokens (jsonwebtoken library) for stateless authentication with
httpOnly cookies for web clients. Refresh token rotation (refresh tokens expire
after 30 days or on use) provides security against token theft. PostgreSQL stores
user credentials and OAuth associations with bcrypt (12 rounds) for password
hashing.

OAuth 2.0 integration uses official Google and GitHub OAuth client libraries. The
authentication service exposes RESTful API endpoints for all auth operations
(register, login, logout, refresh, password reset). All endpoints include rate
limiting (express-rate-limit), input validation (joi), CSRF protection (csurf),
and security headers (helmet). Redis caches active sessions for quick lookup and
revocation.

The implementation integrates with the existing Express.js API gateway
(.architecture section 3.2) and PostgreSQL database (.architecture section 4.1).
Email sending for password reset uses the email service defined in .architecture
section 5.3. Future User Stories will break this Epic into specific tasks: local
strategy implementation, Google OAuth integration, GitHub OAuth integration,
password reset flow, session management, security middleware, testing, and
documentation.

## Dependencies
**Required before starting:**
- #42 - [EPIC] Database Layer Setup (users table must exist)
- #48 - [EPIC] Email Service Integration (for password reset emails)
- External: Google OAuth app credentials from Google Cloud Console
- External: GitHub OAuth app credentials from GitHub Settings

**Blocks these Epics:**
- #50 - [EPIC] User Profile Management (requires authenticated users)
- #55 - [EPIC] Team Collaboration (requires user accounts and permissions)
- #60 - [EPIC] Project Management (requires user-owned projects)

**No technical blockers** - Infrastructure (database, Redis, email) ready per
dependencies above.

## Estimated Effort
3 sprints (assuming 2 developers: 1 backend + 1 frontend, 2-week sprints)

Breakdown:
- Sprint 1: Backend auth service (local strategy, JWT, database integration, unit tests)
- Sprint 2: OAuth integration (Google + GitHub strategies, callback handlers, integration tests)
- Sprint 3: Frontend integration (login/register UI, OAuth buttons, session handling), security testing, documentation

Factors:
- OAuth integration adds complexity (callback handling, state management, token exchange)
- Security requirements necessitate thorough testing and review
- Multiple authentication methods require careful testing of all flows
- Email integration for password reset adds external dependency
- Security penetration test may find issues requiring fixes

---
*Generated from PRD and Architecture documentation*
*PRD: `.requirements/PRD.md`*
*Architecture: `.architecture/ARCHITECTURE.md`*
*Generated: 2025-12-02T22:30:00Z*
```

## Usage Notes

When filling this template:
1. Extract information from PRD and Architecture docs
2. Map PRD features to Architecture components
3. Provide specific line number references for traceability
4. Write Epic Goal in business language (not technical)
5. Make Acceptance Criteria specific and testable
6. Explain business value in terms stakeholders understand
7. Keep Technical Scope high-level (details come in User Stories)
8. Identify all dependencies to prevent blocking issues
9. Base effort estimate on Epic sizing criteria (2-6 sprints)
10. Always include footer with source doc paths and timestamp
