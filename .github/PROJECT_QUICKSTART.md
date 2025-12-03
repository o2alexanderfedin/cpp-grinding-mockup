# GitHub Project Quick Start Guide

## Access Your Project
🔗 **Project URL**: https://github.com/users/o2alexanderfedin/projects/13

## Quick Actions

### Create New Issue
```bash
# Create an Epic
gh issue create --title "[EPIC] Feature Name" --body "Epic description" --label "epic"

# Create a User Story
gh issue create --title "As a user, I can..." --body "Story description" --label "user-story"

# Create a Task
gh issue create --title "Task: Do something" --body "Task description" --label "task"

# Create a Bug
gh issue create --title "Bug: Something broken" --body "Bug description" --label "bug"
```

### Add Issue to Project
```bash
# Automatically adds with "Backlog" status
gh issue create --title "..." --body "..." --project "C++ Grinding Mockup"

# Or add existing issue
gh project item-add 13 --owner o2alexanderfedin --url https://github.com/o2alexanderfedin/cpp-grinding-mockup/issues/ISSUE_NUMBER
```

### View Project
```bash
# Open in browser
gh project view 13 --owner o2alexanderfedin --web

# List items in terminal
gh project item-list 13 --owner o2alexanderfedin --format json | jq
```

## Field Values

### Priority
- `Critical` - Production down, security issue
- `High` - Important for current sprint
- `Medium` - Standard priority
- `Low` - Nice to have

### Effort
- `XS` - < 2 hours
- `S` - 2-4 hours
- `M` - 4-8 hours
- `L` - 1-2 days
- `XL` - 2+ days (break it down!)

### Type
- `Epic` - Large initiative
- `User Story` - User-facing feature
- `Task` - Technical work
- `Bug` - Something broken
- `Spike` - Research/investigation

### Sprint Format
- `Sprint-2025-01` (Year-Week)
- `Sprint-2025-48`
- Current week: `Sprint-$(date +%Y-%V)`

## Workflow

### 1. Planning Phase
```bash
# Create epic
gh issue create --title "[EPIC] Authentication System" --label "epic"

# Create user stories under epic
gh issue create --title "As a user, I can login with OAuth" --label "user-story"

# Break down into tasks
gh issue create --title "Task: Implement OAuth callback" --label "task"
```

### 2. Sprint Start
1. Open project: https://github.com/users/o2alexanderfedin/projects/13
2. Go to Backlog view
3. Drag high-priority items to "Todo" column
4. Set Sprint field to current sprint
5. Assign yourself

### 3. During Development
```bash
# Start working on issue #42
# 1. Move to "In Progress" in project board
# 2. Create feature branch
git flow feature start feature-name

# 3. Work on feature, commit with issue reference
git commit -m "feat: implement feature (#42)"

# 4. Finish feature
git flow feature finish feature-name
```

### 4. Code Review
```bash
# If you need review, create PR
gh pr create --title "feat: Feature name" --body "Closes #42"

# Issue automatically moves to "In Review"
```

### 5. Completion
```bash
# Merge PR or close issue
gh pr merge --squash

# Issue automatically moves to "Done"
```

## Daily Workflow

### Morning Standup
1. Open Kanban Board: https://github.com/users/o2alexanderfedin/projects/13
2. Filter by current sprint
3. Review "In Progress" items
4. Update statuses
5. Move blocked items if needed

### During Day
- Update issue status as you work
- Add comments for progress updates
- Link related issues/PRs
- Update effort estimates if needed

### End of Day
- Move completed items to "Done"
- Add notes for next day
- Update blocked items

## Sprint Planning Template

### Week Before Sprint
1. **Backlog Refinement**
   - Review all backlog items
   - Assign priorities
   - Estimate effort
   - Break down large items

2. **Sprint Goal Setting**
   - Identify sprint theme
   - Select high-priority items
   - Calculate capacity (consider velocity)

### Sprint Start (Monday)
```bash
# Set current sprint variable
CURRENT_SPRINT="Sprint-$(date +%Y-%V)"

# Move planned items to current sprint
# (Do this in web UI by filtering and bulk editing)
```

1. Assign sprint to selected items
2. Move to "Todo" status
3. Self-assign items
4. Set realistic goals

### During Sprint
- Daily standup using Kanban Board
- Update status continuously
- Add blockers as they arise
- Don't add new items mid-sprint (unless critical)

### Sprint End (Friday)
1. **Review**
   - Demo completed features
   - Move incomplete items to next sprint
   - Archive done items

2. **Retrospective**
   - What went well?
   - What can improve?
   - Action items for next sprint

## Tips & Tricks

### Bulk Operations
Use the web UI for bulk operations:
- Select multiple items (Shift+Click)
- Edit sprint, priority, or assignee for all at once

### Keyboard Shortcuts (in web UI)
- `C` - Create new item
- `E` - Edit selected item
- `/` - Focus search
- `?` - Show all shortcuts

### Labels for Additional Context
```bash
# Add custom labels
gh label create "frontend" --color "0366d6"
gh label create "backend" --color "d73a4a"
gh label create "database" --color "0e8a16"
gh label create "documentation" --color "fbca04"

# Use in issues
gh issue create --title "..." --label "frontend,high-priority"
```

### Templates for Issues
Create issue templates in `.github/ISSUE_TEMPLATE/`:
- `epic.md` - For epics
- `user-story.md` - For user stories
- `bug.md` - For bug reports
- `task.md` - For tasks

### Linking Issues
```markdown
# In issue body or comments
- Blocks #123
- Blocked by #456
- Related to #789
- Part of #42 (link to epic)
```

### Automation with Git Flow
```bash
# When creating feature branch, reference issue
git flow feature start implement-oauth-#42

# Commits automatically reference issue
git commit -m "feat(auth): add OAuth provider (#42)"

# PR description automatically closes issue
gh pr create --title "feat: OAuth login" --body "Closes #42"
```

## Common Scenarios

### Scenario 1: Bug Found in Production
```bash
# 1. Create critical bug
gh issue create \
  --title "Bug: Users cannot login" \
  --body "Description..." \
  --label "bug,critical"

# 2. Add to project (auto-added)
# 3. Move to current sprint
# 4. Set Priority = Critical
# 5. Assign yourself
# 6. Move to "In Progress"
# 7. Fix and close
```

### Scenario 2: Planning New Epic
```bash
# 1. Create epic
gh issue create \
  --title "[EPIC] Payment Integration" \
  --body "Epic description with goals" \
  --label "epic"

# 2. Create user stories
gh issue create \
  --title "As a user, I can add payment method" \
  --body "Story description\n\nEpic: #EPIC_NUMBER" \
  --label "user-story"

# 3. Break down into tasks
# 4. Estimate effort for each
# 5. Plan across sprints
```

### Scenario 3: Mid-Sprint Adjustments
```bash
# Something urgent came up
# 1. Add new critical item to current sprint
# 2. Move lower priority item back to backlog
# 3. Update team
# 4. Adjust sprint goal if needed
```

## Troubleshooting

### Issue Not Showing in Project
```bash
# Add manually
gh project item-add 13 --owner o2alexanderfedin --url ISSUE_URL
```

### Wrong Sprint Assigned
- Edit in web UI: Click item → Edit → Change Sprint field

### Can't Find Item
- Use project search: Filter by title, assignee, or field values

---

**Need Help?**
- Full documentation: `.github/PROJECT_SETUP.md`
- GitHub Projects docs: https://docs.github.com/en/issues/planning-and-tracking-with-projects
