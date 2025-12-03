<objective>
Analyze all User Stories within each Epic to determine optimal implementation order based on technical dependencies, complexity, and architectural sequencing. Create a prioritized sequence for User Stories within each Epic to ensure efficient development flow and minimize rework.

This prioritization will guide developers on which User Stories to implement first within each Epic, ensuring foundational components are built before dependent features.
</objective>

<context>
You are working with GitHub Project #13 (C++ Grinding Mockup) containing 7 Epics. Some Epics have been broken down into User Stories (e.g., Epic #7 has User Stories #39-44), while others may still need User Story creation.

The project uses:
- GitHub Projects for tracking
- User Stories with Type="User Story" field
- Parent-child linking (User Stories linked to Epics via GraphQL)
- Technical dependencies documented in User Story descriptions
- Story points for effort estimation

Review the CLAUDE.md file for any project-specific prioritization criteria.
</context>

<analysis_requirements>
Perform User Story prioritization by:

1. **Fetch all Epics and their User Stories:**
   ```bash
   # Get all Epics
   gh issue list --label epic --json number,title --limit 100

   # For each Epic, get linked User Stories
   gh api graphql -f query='{
     repository(owner:"OWNER", name:"REPO") {
       issue(number:EPIC_NUM) {
         trackedIssues(first:50) {
           nodes {
             number
             title
             body
             labels { nodes { name } }
           }
         }
       }
     }
   }'
   ```

2. **Analyze each User Story within its Epic:**
   - Extract technical dependencies (requires components, shared state, etc.)
   - Identify story points or complexity indicators
   - Note acceptance criteria count
   - Check for architectural layer (data models, UI components, state management, integration)
   - Identify reusable components vs specific features

3. **Apply vertical slice analysis:**
   - **Foundation layer** (data models, types, interfaces) must come first
   - **State management** (Redux slices, selectors) depends on data models
   - **Presentation components** (UI without state) can run parallel to state work
   - **Container components** (state + UI) depend on both state and presentation
   - **Integration** (connecting systems) comes after all pieces exist

4. **Identify within-Epic dependencies:**
   - User Story A → User Story B (explicit dependency in description)
   - Component reuse (Story X creates component, Story Y uses it)
   - Shared state (Story X defines state shape, Story Y consumes it)
   - Technical prerequisites (Story X sets up infrastructure, Story Y uses it)

5. **Consider development workflow:**
   - Build from bottom-up (utilities → components → features)
   - Implement happy path before edge cases
   - Create mocks/data before UI that displays it
   - Verify integration points work before building on them

6. **Check for parallelization opportunities:**
   - Independent UI components can be built simultaneously
   - Frontend and backend User Stories with clear interfaces can run parallel
   - Different sections of the same feature (if properly isolated)
</analysis_requirements>

<prioritization_criteria>
Rank User Stories within each Epic using these factors:

1. **Technical Dependencies (Highest Priority):**
   - User Stories that other stories depend on must be first
   - Foundation work (types, interfaces, mock data) comes before features
   - Shared components before components that use them

2. **Architectural Layers (Bottom-Up):**
   - Data models and types (layer 1)
   - State management and Redux (layer 2)
   - Presentation components (layer 3 - can parallel with layer 2)
   - Container components (layer 4)
   - Integration and workflows (layer 5)

3. **Complexity vs Risk:**
   - High-risk technical unknowns → earlier (validate feasibility)
   - High complexity with many dependencies → break down further or sequence carefully
   - Low complexity with no dependencies → flexible positioning

4. **Story Points and Velocity:**
   - Mix high-point and low-point stories for steady progress
   - Don't stack all complex stories at the beginning or end
   - Aim for deliverable value incrementally

5. **Acceptance Criteria Completeness:**
   - Stories with complete, testable acceptance criteria → earlier
   - Stories needing clarification → flag for refinement before prioritizing

6. **Incremental Value Delivery:**
   - Prioritize stories that deliver visible progress
   - Balance technical foundation with user-visible features
   - Enable early testing and feedback
</prioritization_criteria>

<output>
Generate a comprehensive prioritization report:

1. **For each Epic, create a sequenced User Story list:**
   ```
   Epic #7: AI Agent Integration & Export (6 User Stories)

   Priority 1 (Foundation):
     1. #40: JSON Serialization (2 SP) - Creates export data structure
        Dependencies: None
        Blocks: #39 (needs JSON format), #41 (needs data to copy)
        Rationale: Defines data structure used by all other stories

   Priority 2 (Core Features):
     2. #43: Redux Selector (1 SP) - Provides data for metrics
        Dependencies: #40 (needs data structure)
        Blocks: #42 (needs count data)
        Rationale: State access needed by UI components

     3. #39: Export Button Component (3 SP) [PARALLEL A]
        Dependencies: #40 (needs JSON format)
        Rationale: UI can be built once data structure exists

     4. #42: Dashboard Metrics Card (3 SP) [PARALLEL B]
        Dependencies: #43 (needs selector)
        Rationale: Independent UI component, can run parallel to #39

   Priority 3 (Enhancement):
     5. #41: Copy to Clipboard (2 SP)
        Dependencies: #39 (integrates with export modal)
        Rationale: Enhances export feature after core exists

     6. #44: AI Firewall Messaging (1 SP)
        Dependencies: #39, #42 (adds messaging to both features)
        Rationale: Polish layer, depends on all UI components existing

   Total Sequence: #40 → #43 → [#39 || #42] → #41 → #44
   Critical Path: 12 story points
   With Parallelization: 9 story points of sequential work
   ```

2. **Create dependency visualization for each Epic:**
   Use ASCII diagrams to show relationships:
   ```
   #40 (JSON) ──┬──> #39 (Export UI) ──> #41 (Clipboard)
                │                              ↓
                └──> #43 (Selector) ──> #42 (Metrics) ──> #44 (Messaging)
   ```

3. **Identify parallelization opportunities:**
   - List User Stories that can be worked on simultaneously
   - Group by parallel stream (Stream A, Stream B, etc.)
   - Calculate time savings from parallel work

4. **Flag User Stories needing attention:**
   - Missing dependencies or unclear prerequisites
   - High complexity stories that may need breakdown
   - Stories with incomplete acceptance criteria
   - Technical risks or unknowns to address

5. **Update GitHub Project Priority field:**
   Set priority for each User Story using gh CLI:
   ```bash
   # For each User Story, set Priority field (1-5)
   # Based on within-Epic priority analysis
   ```

6. **Save detailed analysis:**
   Create `./analyses/user-story-prioritization.md` with:
   - Epic-by-Epic breakdown with sequenced User Stories
   - Dependency graphs for each Epic
   - Parallelization recommendations
   - Risk assessment and mitigation
   - Story point distribution analysis
   - Estimated timeline per Epic

7. **Provide Epic-level implementation guidance:**
   For each Epic:
   - List first 2-3 User Stories to start immediately
   - Identify which stories can run in parallel
   - Highlight critical path stories
   - Note any blockers or prerequisites
</output>

<implementation_steps>
1. Fetch all Epics from GitHub Project
2. For each Epic, fetch linked User Stories via GraphQL
3. Read each User Story's body to extract:
   - Technical requirements
   - Component dependencies
   - Acceptance criteria
   - Story points (if present)
4. Map dependencies within each Epic
5. Apply architectural layering principles (data → state → UI → integration)
6. Identify parallel work opportunities
7. Sequence User Stories respecting dependencies
8. Calculate critical path and parallelization savings
9. Generate dependency visualizations
10. Update GitHub Project Priority field for all User Stories
11. Save comprehensive analysis to ./analyses/user-story-prioritization.md
12. Present Epic-by-Epic summary with immediate next steps
</implementation_steps>

<success_criteria>
Before declaring complete, verify:

- [ ] All Epics analyzed (including those without User Stories yet)
- [ ] All User Stories within each Epic have been prioritized
- [ ] Dependencies within each Epic are accurately mapped
- [ ] No circular dependencies exist
- [ ] Architectural layering principles applied (foundation → features)
- [ ] Parallel work opportunities identified for each Epic
- [ ] Priority field updated in GitHub Project for all User Stories
- [ ] Analysis file saved to ./analyses/user-story-prioritization.md
- [ ] For each Epic, clear guidance on which User Stories to start first
- [ ] Story point distribution analyzed for balanced workload
- [ ] Critical path identified for each Epic

The prioritization should enable developers to start the first User Story of any Epic immediately, with confidence that dependencies are satisfied.
</success_criteria>

<constraints>
- Never prioritize a User Story before its technical dependencies
- Foundation work (data models, types, shared components) always comes before features that use them
- State management comes after data models, before UI that consumes state
- Integration work comes after individual components exist
- Respect architectural layers: data → state → presentation → container → integration
- Use actual GitHub Project fields (Priority, Effort) - don't invent fields
- If a User Story has unclear dependencies, flag it for refinement rather than guessing
</constraints>

<special_considerations>
**For Epics without User Stories yet:**
- Note in the analysis that User Stories need to be created
- Reference the epic-to-user-stories skill for breaking down these Epics
- Skip prioritization for these Epics until User Stories exist

**For Epic #5 (Formal Verification Analysis):**
- This Epic already has User Stories (#26-32 per the analysis)
- Ensure these are included in the prioritization

**For Epic #7 (AI Integration):**
- User Stories #39-44 already exist and are properly linked
- Use these as the reference example for prioritization quality
</special_considerations>

<verification>
After completing the prioritization:

1. Trace through each Epic's User Story sequence - can each story actually start when scheduled?
2. Verify no User Story is prioritized before its dependencies
3. Check that Priority field updates were successful in GitHub Project
4. Confirm parallel work opportunities are genuinely independent (no shared files/components)
5. Validate that the first User Story in each Epic is truly unblocked
6. Review story point distribution for balanced workload
7. Ensure critical paths are correctly identified
</verification>

<example_output>
For Epic #7, the analysis should show:

**Sequence**: #40 → #43 → [#39 || #42] → #41 → #44

**Rationale**:
- #40 first: Defines JSON structure needed by #39 and #41
- #43 second: Provides selector needed by #42
- #39 and #42 parallel: Independent UI components once their data dependencies exist
- #41 third: Enhances #39 after export UI exists
- #44 last: Polish layer that touches both #39 and #42

**Parallelization**: Stories #39 and #42 can be developed simultaneously (save 3 story points of time)

**Critical Path**: #40 → #43 → #42 → #44 (9 story points)
</example_output>
