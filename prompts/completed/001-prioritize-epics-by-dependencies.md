<objective>
Analyze all GitHub Epics to determine optimal implementation order based on dependencies, precedence, and complexity. Create a prioritized development roadmap by identifying which epics must be completed before others, which can run in parallel, and update the GitHub Project with priority ordering.

This prioritization will guide the development team's work sequence and ensure foundational features are built before dependent features.
</objective>

<context>
You are working with a GitHub Project containing multiple Epics. Each Epic represents a major feature or capability, and many have dependencies on other epics being completed first.

The project uses:
- GitHub Projects for tracking (Project #13: C++ Grinding Mockup)
- Epics with Type="Epic" field
- Dependencies documented in Epic descriptions
- PRD and Architecture documents that may reference implementation order

Review the CLAUDE.md file for any project-specific prioritization criteria.
</context>

<analysis_requirements>
Perform dependency analysis by:

1. **Fetch all Epics from GitHub Project:**
   ```bash
   gh issue list --label epic --json number,title,body,labels --limit 100
   ```

2. **Extract dependency information from each Epic:**
   - Look for "Dependencies" sections in Epic body
   - Identify references to other Epics (e.g., "depends on Epic #1")
   - Note any "must be completed before" or "requires" language
   - Check Architecture references for implementation phase order

3. **Analyze complexity indicators:**
   - Estimated Complexity field (High/Medium/Low)
   - Number of acceptance criteria
   - Number of User Stories already created
   - Technical Requirements complexity

4. **Identify dependency chains:**
   - Which Epics have NO dependencies (can start immediately)
   - Which Epics block other Epics (high priority)
   - Which Epics can run in parallel (independent work streams)
   - Which Epics form sequential chains (must be done in order)

5. **Consider architectural phases:**
   - Infrastructure/foundation first (PWA, database, auth)
   - Core features second (data models, primary workflows)
   - Enhancement features third (export, AI integration, polish)

6. **Create dependency graph:**
   - Map relationships: Epic A → Epic B → Epic C
   - Identify critical path (longest dependency chain)
   - Highlight parallel work opportunities
</analysis_requirements>

<prioritization_criteria>
Rank Epics using these factors (in order of importance):

1. **Blocking Dependencies (Highest Priority):**
   - Epics that other epics depend on must be done first
   - Infrastructure/foundation epics typically come first

2. **Must-Have Priority:**
   - Epics marked as "Must-Have" in their priority field
   - Core value proposition features

3. **Complexity vs Value:**
   - High-value, low-complexity → earlier
   - High-value, high-complexity → balance against dependencies
   - Low-value, high-complexity → later (unless blocking)

4. **Parallelization Opportunities:**
   - Group independent epics that can be worked simultaneously
   - Identify separate work streams (e.g., frontend + backend)

5. **Risk Mitigation:**
   - Technical unknowns or experiments → earlier (to validate feasibility)
   - Well-understood patterns → can come later
</prioritization_criteria>

<output>
Generate a prioritization report and update GitHub Project with:

1. **Create dependency visualization:**
   ```
   Phase 1 (Foundation - No dependencies):
     ├─ Epic #1: PWA Installation & Launch
     └─ Epic #2: Landing Page & GitHub Connection

   Phase 2 (Core Features - Depends on Phase 1):
     ├─ Epic #3: Repository Selection (requires Epic #2)
     └─ Epic #4: File Tree Visualization (requires Epic #3)

   Phase 3 (Advanced Features):
     ├─ Epic #5: Formal Verification (requires Epic #4) [PARALLEL STREAM A]
     └─ Epic #6: Issue Investigation (requires Epic #5) [PARALLEL STREAM A]
     └─ Epic #7: AI Integration (requires Epic #6) [PARALLEL STREAM B]
   ```

2. **Create prioritized list with rationale:**
   For each Epic in priority order:
   - Epic number and title
   - Priority tier (1-5, where 1 is highest)
   - Dependencies (list of prerequisite Epics)
   - Parallelization group (if applicable)
   - Rationale for this position
   - Estimated start date (relative: "Phase 1", "After Epic #X", etc.)

3. **Update GitHub Project Priority field:**
   For each Epic, set the Priority field using gh CLI:
   ```bash
   # Get project item ID for Epic
   # Set Priority field to 1-5 based on analysis
   ```

4. **Save detailed analysis:**
   Create `./analyses/epic-prioritization.md` with:
   - Full dependency graph
   - Critical path analysis
   - Parallel work stream recommendations
   - Risk factors and mitigation strategies
   - Recommended implementation timeline

5. **Provide actionable next steps:**
   - List the next 2-3 Epics to start immediately
   - Suggest team allocation if multiple parallel streams identified
   - Highlight any blockers that need resolution before starting
</output>

<implementation_steps>
1. Fetch all Epics from GitHub using gh CLI
2. Read each Epic's body to extract dependencies
3. Check .requirements/PRD.md and .architecture/ARCHITECTURE.md for implementation phase guidance
4. Build dependency graph (use a simple data structure or list)
5. Perform topological sort to identify valid execution orders
6. Apply prioritization criteria to rank within each tier
7. Identify parallel work streams where dependencies allow
8. Generate the priority visualization and analysis
9. Update GitHub Project Priority field for each Epic
10. Save detailed analysis to ./analyses/epic-prioritization.md
11. Present summary with immediate next steps
</implementation_steps>

<success_criteria>
Before declaring complete, verify:

- [ ] All Epics from GitHub Project have been analyzed
- [ ] Dependency relationships are accurately mapped
- [ ] No circular dependencies exist in the plan
- [ ] Priority ordering respects all dependency constraints
- [ ] Parallel work opportunities are identified
- [ ] GitHub Project Priority field is updated for all Epics
- [ ] Analysis file is saved to ./analyses/epic-prioritization.md
- [ ] Actionable next steps are provided (which Epic(s) to start)
- [ ] Critical path and potential bottlenecks are identified

The prioritization should be immediately usable by the development team to begin work on the highest-priority, unblocked Epic(s).
</success_criteria>

<constraints>
- Never recommend starting an Epic that has unmet dependencies
- If two Epics have equal priority, prefer the one that unblocks more subsequent work
- Infrastructure and foundation work always comes before features that depend on it
- Clearly distinguish between "must be sequential" and "could be parallel" relationships
- Use the actual GitHub Project fields and structure (don't invent fields that don't exist)
</constraints>

<verification>
After completing the prioritization:

1. Trace through the priority order manually - can each Epic actually start when scheduled given its dependencies?
2. Check that no Epic is scheduled before its dependencies
3. Verify that the Priority field updates were successful in GitHub Project
4. Confirm the analysis file was created and contains actionable information
5. Validate that immediate next steps are clear and unblocked
</verification>
