# GitHub Project Setup - C++ Grinding Mockup

## Project Information
- **Project Name**: C++ Grinding Mockup
- **Project Number**: 13
- **Project ID**: PVT_kwHOBJ7Qkc4BJsRa
- **Project URL**: https://github.com/users/o2alexanderfedin/projects/13
- **Repository**: o2alexanderfedin/cpp-grinding-mockup

## Custom Fields

### Priority
**Type**: Single Select
**Options**:
- Critical - Urgent issues requiring immediate attention
- High - Important features/fixes for current sprint
- Medium - Standard priority items
- Low - Nice-to-have features or minor improvements

### Effort
**Type**: Single Select
**Options**:
- XS - Less than 2 hours
- S - 2-4 hours
- M - 4-8 hours (half day to full day)
- L - 1-2 days
- XL - 2+ days

### Sprint
**Type**: Text
**Format**: Sprint-YYYY-WW (e.g., Sprint-2025-01)
**Purpose**: Track which sprint an item belongs to

### Type
**Type**: Single Select
**Options**:
- Epic - Large feature or initiative spanning multiple sprints
- User Story - User-facing feature from user perspective
- Task - Technical work item or subtask
- Bug - Defect or issue to fix
- Spike - Research or investigation task

## Issue Hierarchy

```
Epic (Type: Epic, Priority: High/Critical)
├── User Story (Type: User Story, Priority: Medium/High)
│   ├── Task (Type: Task, Effort: S/M/L)
│   └── Task (Type: Task, Effort: S/M/L)
└── User Story (Type: User Story, Priority: Medium/High)
    ├── Task (Type: Task, Effort: XS/S)
    └── Bug (Type: Bug, Priority: Critical/High)
```

## Workflow States

The project uses the default GitHub Project status field with these states:
- **Backlog** - Items not yet planned for a sprint
- **Todo** - Items planned for current sprint, not started
- **In Progress** - Actively being worked on
- **In Review** - Code review or testing phase
- **Done** - Completed and merged

## Recommended Views

### 1. Kanban Board (Default)
- **Layout**: Board
- **Group by**: Status
- **Sort by**: Priority (descending), then Updated (descending)
- **Filter**: Current sprint items
- **Purpose**: Daily standup and sprint progress tracking

### 2. Sprint Board
- **Layout**: Board
- **Group by**: Status
- **Filter**: Sprint = "Sprint-YYYY-WW"
- **Sort by**: Priority (descending)
- **Purpose**: Focus on current sprint items only

### 3. Backlog View
- **Layout**: Table
- **Columns**: Title, Type, Priority, Effort, Sprint, Assignees
- **Filter**: Status = "Backlog"
- **Sort by**: Priority (descending), Type (Epic > Story > Task)
- **Purpose**: Sprint planning and backlog refinement

### 4. Roadmap View
- **Layout**: Board
- **Group by**: Sprint
- **Filter**: Type = "Epic" OR Type = "User Story"
- **Sort by**: Priority (descending)
- **Purpose**: High-level planning and epic tracking

### 5. Bug Tracker
- **Layout**: Table
- **Filter**: Type = "Bug"
- **Sort by**: Priority (descending), Created (descending)
- **Purpose**: Track and prioritize bugs

## Automated Workflows

### Workflow 1: Auto-add Issues
**Trigger**: Issue opened in repository
**Action**: Add to project with Status = "Backlog"

### Workflow 2: Auto-archive Closed
**Trigger**: Issue/PR closed
**Action**: Set Status = "Done" and archive after 7 days

### Workflow 3: Move to In Review
**Trigger**: PR created from issue
**Action**: Update issue Status = "In Review"

### Workflow 4: Auto-assign Sprint
**Trigger**: Status changes to "Todo"
**Action**: If Sprint is empty, set to current sprint

## Best Practices

### Creating Issues

1. **Epics** - Large initiatives
   ```
   Title: [EPIC] User Authentication System
   Type: Epic
   Priority: High
   Description: Comprehensive auth system with OAuth, JWT, etc.
   ```

2. **User Stories** - Feature requests
   ```
   Title: As a user, I can log in with GitHub OAuth
   Type: User Story
   Priority: High
   Effort: L
   Sprint: Sprint-2025-01
   Epic: Link to parent epic
   ```

3. **Tasks** - Implementation work
   ```
   Title: Implement OAuth callback handler
   Type: Task
   Priority: Medium
   Effort: M
   Sprint: Sprint-2025-01
   User Story: Link to parent story
   ```

4. **Bugs** - Defects
   ```
   Title: Login button unresponsive on mobile
   Type: Bug
   Priority: Critical
   Effort: S
   Sprint: Sprint-2025-01
   ```

### Sprint Planning Process

1. **Backlog Refinement** (Before sprint start)
   - Review Backlog view
   - Assign Priority and Effort to items
   - Break down Epics into User Stories
   - Break down User Stories into Tasks

2. **Sprint Planning** (Sprint start)
   - Filter by Priority = High/Critical
   - Assign Sprint field to selected items
   - Move items to "Todo" status
   - Assign team members

3. **Daily Standup** (During sprint)
   - Use Kanban Board view filtered by current sprint
   - Review "In Progress" items
   - Identify blockers
   - Update status as needed

4. **Sprint Review** (Sprint end)
   - Review items in "Done" status
   - Move incomplete items to next sprint or back to backlog
   - Archive completed items

### Effort Estimation Guidelines

- **XS (< 2h)**: Simple bug fixes, config changes, minor updates
- **S (2-4h)**: Small features, moderate bug fixes, simple tests
- **M (4-8h)**: Medium features, complex bugs, integration work
- **L (1-2d)**: Large features, major refactoring, comprehensive tests
- **XL (2+d)**: Very large features (consider breaking down into smaller stories)

### Priority Guidelines

- **Critical**: Production issues, security vulnerabilities, blocking bugs
- **High**: Important features for current sprint, high-impact bugs
- **Medium**: Standard features, minor bugs, improvements
- **Low**: Nice-to-have features, technical debt, optimizations

## Quick Commands

### View Project
```bash
gh project view 13 --owner o2alexanderfedin --web
```

### List All Items
```bash
gh project item-list 13 --owner o2alexanderfedin --format json
```

### Add Issue to Project
```bash
gh project item-add 13 --owner o2alexanderfedin --url https://github.com/o2alexanderfedin/cpp-grinding-mockup/issues/[NUMBER]
```

### Update Item Field
```bash
# Set Priority
gh project item-edit --id [ITEM_ID] --project-id PVT_kwHOBJ7Qkc4BJsRa --field-id [FIELD_ID] --single-select-option-id [OPTION_ID]
```

## Integration with Git Flow

When using git flow with this project:

1. **Feature Branch Created**
   - Create User Story or Task issue
   - Link to Epic if applicable
   - Set Sprint and Priority

2. **Development**
   - Move issue to "In Progress"
   - Reference issue in commits: `feat: implement login (#123)`

3. **Pull Request**
   - Issue automatically moves to "In Review"
   - Link PR to issue using keywords: `Closes #123`

4. **Merge to Develop**
   - Issue automatically moves to "Done"
   - Issue archived after 7 days

5. **Release**
   - Group all "Done" items by sprint
   - Generate release notes from closed issues

## Maintenance

### Weekly Tasks
- Archive completed items older than 7 days
- Review and update priorities in backlog
- Assign upcoming items to next sprint

### Monthly Tasks
- Review epic progress
- Update roadmap view
- Clean up stale items (no activity > 60 days)

### Quarterly Tasks
- Review workflow automation effectiveness
- Adjust field options based on team feedback
- Update documentation with lessons learned

## Support

For issues with project setup or workflows:
1. Check GitHub Projects documentation: https://docs.github.com/en/issues/planning-and-tracking-with-projects
2. Review this setup guide
3. Consult with team on best practices

---

**Last Updated**: 2025-12-02
**Created by**: Claude Code
**Project Setup Version**: 1.0
