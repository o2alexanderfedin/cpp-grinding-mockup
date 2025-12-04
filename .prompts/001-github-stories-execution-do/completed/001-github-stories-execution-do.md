# Execute GitHub User Stories with TDD and Engineering Excellence

<objective>
Systematically execute all user stories from the "C++ Grinding Mockup" GitHub Project (#13) with surgical precision, following priority order: epics first, then user stories within each epic.

Purpose: Transform GitHub project backlog into production-ready code through disciplined TDD and pair programming practices
Output: Fully tested, type-safe implementation of all user stories with comprehensive test coverage
</objective>

<context>
Project repository: /Users/alexanderfedin/Projects/hapyy/mockups/cpp-grinding-mockup
GitHub Project: "C++ Grinding Mockup" (Project #13)
Project board: https://github.com/users/[owner]/projects/13

Current state:
- Git branch: develop
- Database: PostgreSQL on localhost:5434 (oilfield/oilfield_dev)
- No prior prompts (this is the first execution prompt)

Project instructions: @/Users/alexanderfedin/Projects/hapyy/CLAUDE.md
</context>

<execution_workflow>

## Phase 0: Discovery and Planning

### Fetch GitHub Project Structure
1. List all epics from GitHub Project #13, ordered by priority
2. For each epic, list all child user stories ordered by priority
3. Create execution roadmap: `.prompts/001-github-stories-execution-do/ROADMAP.md`
   - Epic hierarchy with priorities
   - User story list per epic
   - Execution order (epic priority → story priority)
   - Estimated scope per story (T-shirt sizing: S/M/L/XL)

### Map Codebase Architecture
4. Explore existing codebase structure to understand:
   - Technology stack (languages, frameworks)
   - Directory structure and conventions
   - Existing test patterns (unit/integration)
   - Build and linting tooling
   - Git workflow configuration

5. Document in `.prompts/001-github-stories-execution-do/CODEBASE.md`:
   - Tech stack summary
   - Directory conventions
   - Test framework and patterns
   - Linting/type-checking commands
   - Database schema status (DO NOT MODIFY unless story explicitly requires it)

## Phase 1: User Story Execution Loop

For each user story in priority order:

### Step 1: Story Analysis (Pair Programming - Navigator)
1. Read user story from GitHub (title, description, acceptance criteria)
2. Analyze requirements:
   - Functional requirements (what must it do?)
   - Non-functional requirements (performance, security, maintainability)
   - Integration points (what existing code does this touch?)
   - Database changes (CRITICAL: verify if schema changes needed - default is NO)

3. Identify applicable design patterns:
   - Creational: Factory, Builder, Singleton, Prototype, Abstract Factory
   - Structural: Adapter, Bridge, Composite, Decorator, Facade, Proxy
   - Behavioral: Strategy, Observer, Command, Iterator, Template Method, Chain of Responsibility

4. Check for existing libraries (npm/pypi/crates.io):
   - Search for battle-tested solutions
   - Verify active maintenance
   - Check TypeScript definitions availability
   - Prefer libraries over custom implementations (DRY principle)

5. Apply TRIZ principles:
   - Ideal Final Result: Can this be solved with platform capabilities?
   - Contradictions: Identify and resolve (performance vs flexibility, etc.)
   - Evolution: Consider architectural evolution path

6. Document analysis in story-specific file: `.prompts/001-github-stories-execution-do/stories/{epic-name}/{story-id}-analysis.md`

### Step 2: Test Planning (TDD - Red Phase Preparation)
7. Design test cases BEFORE implementation:
   - Unit tests: What functions/classes need testing?
   - Integration tests: What system interactions need verification?
   - Edge cases: What could go wrong?
   - Test data: What fixtures/mocks are needed?

8. Document test plan in: `.prompts/001-github-stories-execution-do/stories/{epic-name}/{story-id}-tests.md`

### Step 3: Red Phase - Write Failing Tests
9. Create test files following project conventions
10. Write minimal failing tests that describe desired behavior
11. Run tests to confirm they fail: `npm test` (or equivalent)
12. Commit failing tests: `git add . && git commit -m "test: Add failing tests for {story-id} - {story-title}"`

### Step 4: Green Phase - Minimal Implementation (Pair Programming - Driver)
13. Implement MINIMAL code to make tests pass:
    - Follow SOLID principles (especially Single Responsibility)
    - Use strong typing (explicit types, avoid 'any', leverage inference)
    - Apply KISS (simplest solution first)
    - Respect YAGNI (only implement what's needed NOW)
    - Use dependency injection for testability

14. Focus on type safety:
    - Explicit return types and parameter types
    - No 'any' types - use 'unknown' with type guards
    - No type assertions - validate and narrow properly
    - No non-null assertions - use proper null checks
    - Define interfaces/types for all data structures
    - Enable strict TypeScript flags (including noUncheckedIndexedAccess)
    - Validate external data with runtime type checking (zod, io-ts)
    - Use Result<T, E> or Option<T> types instead of exceptions
    - Use discriminated unions for result handling
    - Use algebraic data types (ADTs) for domain logic

15. Run tests continuously: watch for green
16. When tests pass, verify type safety: `tsc --noEmit` (or equivalent)

### Step 5: Refactor Phase - Optimize While Green
17. Improve code structure while keeping tests green:
    - Extract common functionality (DRY)
    - Apply identified design patterns
    - Improve naming and clarity (Program by Intent)
    - Ensure immutability (const, readonly)
    - Add meaningful constants for magic numbers

18. Verify after each refactor:
    - Tests still pass
    - Type checking passes
    - Linting passes

### Step 6: Integration and Verification
19. Run full verification suite:
    - All tests: `npm test` (or equivalent)
    - Type checking: `tsc --noEmit`
    - Linting: `npm run lint` or equivalent
    - Format checking: `npm run format` or equivalent

20. Manual verification:
    - Test the feature manually if applicable
    - Verify acceptance criteria from GitHub story
    - Check edge cases
    - Security review (input validation, output encoding, SQL injection, XSS)

### Step 7: Documentation and Commit
21. Add inline documentation ONLY where logic isn't self-evident
22. Update relevant README or docs if needed
23. Commit implementation:
    ```bash
    git add .
    git commit -m "{type}: {story-title}

    Implements user story #{story-id}

    - {Key implementation detail 1}
    - {Key implementation detail 2}
    - {Test coverage details}

    🤖 Generated with [Claude Code](https://claude.com/claude-code)

    Co-Authored-By: Claude <noreply@anthropic.com>"
    ```

24. Push to remote: `git push`

### Step 8: Story Completion
25. Update GitHub story status (if API allows)
26. Document completion in: `.prompts/001-github-stories-execution-do/PROGRESS.md`
    - Story ID and title
    - Files created/modified
    - Test coverage
    - Blockers encountered (if any)
    - Next story

27. If significant milestone reached (epic completed), create git release:
    ```bash
    git flow release start {epic-name}-v{version}
    git flow release finish {epic-name}-v{version}
    git push --all && git push --tags
    ```

## Phase 2: Epic Completion

After all stories in an epic are complete:

1. Epic-level integration testing
2. Review epic as a whole (does it deliver value?)
3. Create git release for the epic
4. Update GitHub epic status
5. Document epic completion in PROGRESS.md

## Phase 3: Project Completion

After all epics are complete:

1. Final integration test suite
2. Performance testing
3. Security audit
4. Documentation review
5. Final git release
6. Update GitHub project status

</execution_workflow>

<critical_constraints>

## Database Rules (CRITICAL)
- **NEVER modify database schema unless user story explicitly requires it**
- **NEVER modify, delete, or re-insert existing data unless explicitly required**
- **ALWAYS verify what data exists before any database operations**
- Database connection: postgresql://oilfield:oilfield_dev@localhost:5434/oilfield
- If schema changes needed, create migration files only (don't run unless story requires)

## Git Workflow (CRITICAL)
- Use git flow for all operations
- NO pull requests (solo development)
- Commit after every completed story
- Push after every commit
- Create release after each epic completion
- Never skip pre-commit hooks
- Never use --no-verify or --force

## Type Safety (CRITICAL)
- Treat all code as strongly typed
- Enable strict mode in TypeScript/type checkers
- Never use 'any' type
- Always validate external data
- Use algebraic data types for domain logic
- Complete interface implementations (no partial mocks)

## Testing (CRITICAL)
- TDD is MANDATORY (red → green → refactor)
- Both unit and integration tests required
- Tests must pass before commit
- 100% coverage of business logic
- Edge cases must be tested

## Linting (CRITICAL)
- Run all linters before every commit
- Fix all warnings (not just errors)
- Use project's linting configuration
- No commits with linting failures

## Parallelization (CRITICAL)
- Maximum parallel tasks = CPU cores
- Use Task tool with parallel execution for independent stories
- Use map-reduce approach for large epics
- Each subtask must report back progress

</critical_constraints>

<efficiency_guidelines>

## Parallel Execution
For maximum efficiency, execute independent operations simultaneously:
- Read multiple files in parallel
- Run multiple searches in parallel
- Execute independent user stories in parallel (within CPU limits)
- Use multiple Task tool invocations in a single message

## Context Optimization
- Use Task tool extensively to optimize context usage
- Spawn subtasks for research and experiments
- Each task reports: what was done, what remains
- On problems, spawn research subtasks to resolve

## Map-Reduce Approach
For large epics:
1. Map: Spawn parallel tasks for independent stories
2. Reduce: Collect results, integrate, verify
3. Report: Aggregate findings and next steps

</efficiency_guidelines>

<output_structure>

Create in `.prompts/001-github-stories-execution-do/`:

### Initial Setup Files
- `ROADMAP.md` - Epic and story hierarchy with priorities
- `CODEBASE.md` - Architecture and conventions documentation
- `PROGRESS.md` - Story completion tracker (updated after each story)

### Story-Specific Files (per story)
- `stories/{epic-name}/{story-id}-analysis.md` - Requirements and design analysis
- `stories/{epic-name}/{story-id}-tests.md` - Test plan and coverage

### Implementation Files
- Production code files in appropriate project directories
- Test files following project test conventions
- Migration files if database changes required (rare)

</output_structure>

<verification_checklist>

Before marking any story complete:

- [ ] All tests passing (unit + integration)
- [ ] Type checking passes with strict mode
- [ ] All linters pass with no warnings
- [ ] Format checking passes
- [ ] Acceptance criteria met (from GitHub story)
- [ ] Edge cases tested
- [ ] Security review completed (OWASP top 10)
- [ ] Documentation updated (if needed)
- [ ] Code follows SOLID, KISS, DRY, YAGNI principles
- [ ] Appropriate design patterns applied
- [ ] Strong typing throughout (no 'any', proper validation)
- [ ] Immutability by default (const, readonly)
- [ ] Error handling comprehensive
- [ ] Committed and pushed to git
- [ ] GitHub story status updated

Before marking any epic complete:

- [ ] All stories in epic completed
- [ ] Epic-level integration tests passing
- [ ] Git release created
- [ ] GitHub epic status updated
- [ ] PROGRESS.md updated

</verification_checklist>

<pair_programming_mindset>

Approach this as a pair programming session:

**Navigator Role (Planning):**
- Analyze requirements thoroughly
- Identify patterns and libraries
- Design test cases
- Review code structure
- Suggest refactorings

**Driver Role (Implementation):**
- Write failing tests first
- Implement minimal code
- Refactor while keeping tests green
- Run verification continuously
- Commit and document

**Switch between roles** as you work through each story. Explain your reasoning as if programming with a partner. Question assumptions. Validate design decisions.

</pair_programming_mindset>

<success_criteria>

- All epics from GitHub Project #13 completed in priority order
- All user stories within each epic completed in priority order
- 100% test coverage of business logic
- All code passes type checking with strict mode
- All code passes linting with no warnings
- All commits follow git flow
- Git releases created for each epic
- Database schema unchanged unless explicitly required by stories
- No data loss or corruption
- All acceptance criteria met
- SOLID, KISS, DRY, YAGNI, TRIZ principles followed
- Strong typing throughout codebase
- Comprehensive error handling
- Security best practices applied
- ROADMAP.md, CODEBASE.md, PROGRESS.md created and maintained
- Story analysis and test plans documented
- SUMMARY.md created (see below)

</success_criteria>

<summary_requirements>

Create `.prompts/001-github-stories-execution-do/SUMMARY.md` after completion.

Structure:
```markdown
# GitHub Stories Execution Summary

**Executed {N} user stories across {M} epics with TDD and engineering excellence**

## Version
v1

## Key Findings
- {Epic 1}: {X stories} completed - {key outcome}
- {Epic 2}: {Y stories} completed - {key outcome}
- {Epic 3}: {Z stories} completed - {key outcome}
- Test coverage: {percentage}%
- Type safety: {strict mode enabled/all types explicit}
- Design patterns applied: {list patterns used}

## Files Created
- `.prompts/001-github-stories-execution-do/ROADMAP.md` - Project structure
- `.prompts/001-github-stories-execution-do/CODEBASE.md` - Architecture docs
- `.prompts/001-github-stories-execution-do/PROGRESS.md` - Completion tracker
- `{list production code files created}`
- `{list test files created}`

## Decisions Needed
{List any architectural decisions that need user approval, or "None"}

## Blockers
{List any external blockers encountered, or "None"}

## Next Step
{What should happen next? More stories? Deploy? Review?}

---
*Confidence: High*
*Stories completed: {N}*
*Epics completed: {M}*
*Full progress: PROGRESS.md*
```

</summary_requirements>

<emergency_protocols>

## If Story Blocked
1. Document blocker in PROGRESS.md
2. Mark story as blocked in GitHub (if API allows)
3. Spawn research subtask to investigate resolution
4. If unresolvable, skip to next story and report blocker
5. Return to blocked stories after completing others

## If Test Failures
1. NEVER commit failing tests (except in Red phase)
2. Debug systematically: isolate failure, identify cause, fix
3. If complex, spawn debugging subtask
4. Document resolution in story analysis file

## If Type Errors
1. NEVER use 'any' to fix type errors
2. Understand the type mismatch
3. Add proper type guards and validation
4. Create type definitions if needed
5. Ensure strict mode compatibility

## If Linting Failures
1. Fix ALL warnings (not just errors)
2. Follow project conventions
3. If rule conflicts with best practices, document and discuss
4. NEVER disable linting rules without justification

## If Database Issues
1. STOP immediately
2. Verify if story requires database changes
3. If not required, DO NOT PROCEED with schema changes
4. Document issue and ask for clarification
5. Never modify existing data without explicit requirement

</emergency_protocols>
