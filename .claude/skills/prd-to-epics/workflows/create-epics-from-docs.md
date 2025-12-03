# Workflow: Create Epics from PRD and Architecture

This workflow converts PRD and architecture documents into SCRUM Epics in GitHub Projects.

## Required Reading

Before starting, load:
- `../references/epic-criteria.md` - How to identify Epics
- `../references/github-epic-creation.md` - GitHub Issue creation process
- `../templates/epic-structure.md` - Epic format and content structure

## Phase 1: Document Discovery

### Step 1.1: Check Command Arguments

```xml
<check_arguments>
If user provided paths as arguments:
  - Validate paths exist
  - Store PRD_PATH and ARCH_PATH
  - Skip to Phase 2

If no arguments provided:
  - Continue to Step 1.2
</check_arguments>
```

### Step 1.2: Auto-Discovery

Search for documents in this order:

**PRD locations** (first match wins):
1. `.requirements/PRD.md`
2. `.requirements/prd.md`
3. `docs/PRD.md`
4. `docs/requirements/PRD.md`

**Architecture locations** (first match wins):
1. `.architecture/ARCHITECTURE.md`
2. `.architecture/architecture.md`
3. `docs/ARCHITECTURE.md`
4. `docs/architecture/ARCHITECTURE.md`

**Use Glob tool to search:**
```bash
# Search for PRD
Glob: pattern=**/{PRD,prd}.md

# Search for Architecture
Glob: pattern=**/{ARCHITECTURE,architecture}.md
```

### Step 1.3: Validate or Prompt

```xml
<validation>
If both documents found:
  - Confirm with user: "Found PRD at X and Architecture at Y. Proceed?"
  - Store paths

If one or both not found:
  - Use AskUserQuestion to get missing paths
  - Validate provided paths exist
  - Error if paths invalid after user input
</validation>
```

## Phase 2: Document Analysis

### Step 2.1: Read Documents

**Read PRD completely:**
```xml
<prd_analysis>
Extract from PRD:
- Project goals and objectives
- Major features (usually in "Features" or "Requirements" section)
- User personas and use cases
- Success criteria
- Priorities (Critical, High, Medium, Low)
- Dependencies and constraints
</prd_analysis>
```

**Read Architecture completely:**
```xml
<architecture_analysis>
Extract from Architecture:
- System components and modules
- Technology stack
- Integration points
- Data models and flows
- Non-functional requirements (performance, security, scalability)
</architecture_analysis>
```

### Step 2.2: Identify Epic Candidates

**Apply Epic criteria** (from references/epic-criteria.md):

1. **Major Features from PRD**
   - Each significant feature section → potential Epic
   - Combine related small features into single Epic
   - Example: "User Authentication", "Payment Processing", "Reporting Dashboard"

2. **System Components from Architecture**
   - Each major component/module → potential Epic
   - Example: "API Gateway", "Database Layer", "Frontend Application"

3. **Cross-cutting Concerns**
   - Security implementation
   - Performance optimization
   - DevOps/Infrastructure setup
   - Testing framework

**Epic Size Check:**
- Too small (< 2 sprints)? Combine with related features
- Too large (> 6 sprints)? Split into multiple Epics
- Just right (2-6 sprints)? Good Epic!

### Step 2.3: Map Epics to Documentation

**Create mapping structure:**
```
For each Epic candidate:
  Epic Title: [from PRD feature or architecture component]
  PRD Sections: [list of relevant sections with line numbers]
  Architecture Components: [list of relevant components with line numbers]
  Priority: [from PRD]
  Estimated Sprints: [rough estimate based on scope]
  Business Value: [from PRD goals]
```

**Cross-reference:**
- Ensure each Epic appears in BOTH PRD and Architecture
- Flag Epics only in PRD (needs architecture design)
- Flag Epics only in Architecture (needs PRD justification)
- Resolve discrepancies before creating Issues

## Phase 3: Epic Creation

### Step 3.1: Prepare Epic Data

For each validated Epic, prepare:

```yaml
title: "[EPIC] {Epic Name}"
prd_references:
  - section: "{Section Name}"
    path: "{PRD_PATH}"
    lines: "{start}-{end}"
    content: "{brief excerpt}"
architecture_references:
  - component: "{Component Name}"
    path: "{ARCH_PATH}"
    lines: "{start}-{end}"
    content: "{brief excerpt}"
priority: "{Critical|High|Medium|Low}"
goal: "{What this Epic achieves}"
description: "{Detailed description from PRD}"
acceptance_criteria:
  - "{Criterion 1 from PRD}"
  - "{Criterion 2 from PRD}"
  - "{Criterion 3 from PRD}"
estimated_sprints: "{2-6}"
dependencies: ["{Other Epic titles}"]
```

### Step 3.2: Create GitHub Issues

**For each Epic, execute:**

```bash
gh issue create \
  --title "[EPIC] {Epic Title}" \
  --body "$(cat <<'EPIC_EOF'
## Epic Goal
{Goal statement}

## Description
{Detailed description from PRD}

## PRD References
{For each PRD reference:}
- **{Section Name}** ({PRD_PATH}:{lines})
  {Brief excerpt or summary}

## Architecture References
{For each architecture reference:}
- **{Component Name}** ({ARCH_PATH}:{lines})
  {Brief excerpt or summary}

## Acceptance Criteria
{For each criterion:}
- [ ] {Criterion}

## Business Value
{Why this Epic matters}

## Technical Scope
{High-level technical approach from architecture}

## Dependencies
{List other Epics this depends on}

## Estimated Effort
{X} sprints

---
*Generated from PRD and Architecture documentation*
EPIC_EOF
)" \
  --label "epic" \
  --assignee @me
```

**Capture Issue number:**
```bash
ISSUE_URL=$(gh issue create ... --json url --jq .url)
ISSUE_NUMBER=$(gh issue create ... --json number --jq .number)
```

### Step 3.3: Add to GitHub Project

**For each created Epic:**

```bash
# Add to project
gh project item-add 13 \
  --owner o2alexanderfedin \
  --url $ISSUE_URL

# Get project item ID
ITEM_ID=$(gh project item-list 13 \
  --owner o2alexanderfedin \
  --format json \
  --limit 1000 | \
  jq -r ".items[] | select(.content.number == $ISSUE_NUMBER) | .id")

# Set Type field to "Epic"
# (Use GraphQL mutation - CLI doesn't support field updates directly)
gh api graphql -f query='
mutation {
  updateProjectV2ItemFieldValue(
    input: {
      projectId: "PVT_kwHOBJ7Qkc4BJsRa"
      itemId: "'$ITEM_ID'"
      fieldId: "{TYPE_FIELD_ID}"
      value: {
        singleSelectOptionId: "{EPIC_OPTION_ID}"
      }
    }
  ) {
    projectV2Item {
      id
    }
  }
}'

# Set Priority field
gh api graphql -f query='
mutation {
  updateProjectV2ItemFieldValue(
    input: {
      projectId: "PVT_kwHOBJ7Qkc4BJsRa"
      itemId: "'$ITEM_ID'"
      fieldId: "{PRIORITY_FIELD_ID}"
      value: {
        singleSelectOptionId: "{PRIORITY_OPTION_ID}"
      }
    }
  ) {
    projectV2Item {
      id
    }
  }
}'
```

**Note:** Field IDs need to be fetched once:
```bash
# Get project fields
gh api graphql -f query='
{
  node(id: "PVT_kwHOBJ7Qkc4BJsRa") {
    ... on ProjectV2 {
      fields(first: 20) {
        nodes {
          ... on ProjectV2SingleSelectField {
            id
            name
            options {
              id
              name
            }
          }
        }
      }
    }
  }
}' --jq '.data.node.fields.nodes[] | select(.name == "Type" or .name == "Priority")'
```

## Phase 4: Traceability Documentation

### Step 4.1: Create EPICS.md

**Determine output location:**
- If PRD in `.requirements/` → `.requirements/EPICS.md`
- If PRD in `docs/` → `docs/EPICS.md`
- Otherwise → project root `EPICS.md`

**Write traceability matrix:**

```markdown
# Epic Traceability Matrix

**Generated:** {timestamp}
**Project:** C++ Grinding Mockup
**GitHub Project:** https://github.com/users/o2alexanderfedin/projects/13
**PRD:** {PRD_PATH}
**Architecture:** {ARCH_PATH}

## Summary

Total Epics Created: {count}
- Critical Priority: {count}
- High Priority: {count}
- Medium Priority: {count}
- Low Priority: {count}

## Epics Overview

| Epic | Issue | Priority | Est. Sprints | PRD Section | Architecture Component |
|------|-------|----------|--------------|-------------|------------------------|
{For each Epic:}
| [{Title}](#{issue}) | #{number} | {priority} | {sprints} | {section} | {component} |

## Detailed Mapping

{For each Epic:}

### Epic {n}: {Title}

**GitHub Issue:** [#{number}]({url})
**Priority:** {priority}
**Status:** Backlog
**Estimated Effort:** {X} sprints

**PRD References:**
{For each PRD reference:}
- **{Section Name}** (`{PRD_PATH}:{lines}`)
  > {Brief excerpt}

**Architecture References:**
{For each arch reference:}
- **{Component Name}** (`{ARCH_PATH}:{lines}`)
  > {Brief excerpt}

**Goal:**
{Epic goal}

**Acceptance Criteria:**
{For each criterion:}
- [ ] {Criterion}

**Dependencies:**
{List of other Epic issues this depends on}

---
```

### Step 4.2: Validate Traceability

**Check completeness:**
- [ ] Every Epic has at least one PRD reference
- [ ] Every Epic has at least one Architecture reference
- [ ] All PRD major features have corresponding Epics
- [ ] All Architecture major components have corresponding Epics
- [ ] Dependencies between Epics are documented
- [ ] Priority alignment between PRD and Epics

## Phase 5: Summary and Next Steps

### Step 5.1: Generate Summary Report

**Output to user:**

```
✅ Epic Creation Complete!

Created {count} Epics from PRD and Architecture documentation.

📊 Summary:
- Critical: {count} Epics
- High: {count} Epics
- Medium: {count} Epics
- Low: {count} Epics

📋 Epics Created:
{For each Epic:}
{n}. [{Title}]({url}) - {priority} priority

📁 Documentation:
- Traceability Matrix: {EPICS_PATH}
- View in GitHub Project: https://github.com/users/o2alexanderfedin/projects/13

🎯 Next Steps:
1. Review Epics in GitHub Project
2. Adjust priorities if needed
3. Break down Epics into User Stories (when ready to start sprint planning)
4. Assign Epics to sprints in roadmap view

💡 Commands:
- View project: gh project view 13 --owner o2alexanderfedin --web
- Edit Epic: gh issue edit {number}
- View traceability: cat {EPICS_PATH}
```

### Step 5.2: Open Project in Browser (Optional)

```bash
gh project view 13 --owner o2alexanderfedin --web
```

## Error Recovery

### Document Not Found
```xml
<error_recovery>
If document not found after user input:
  - Provide clear error message
  - Show searched locations
  - Suggest creating PRD/Architecture first
  - Exit gracefully
</error_recovery>
```

### GitHub CLI Errors
```xml
<error_recovery>
If `gh` command fails:
  - Check if gh is installed: `gh --version`
  - Check if authenticated: `gh auth status`
  - Check repository access: `gh repo view`
  - Provide specific error and resolution steps
  - Don't create partial Epics (all or nothing per Epic)
</error_recovery>
```

### Project Field Errors
```xml
<error_recovery>
If GraphQL field updates fail:
  - Epic Issue is still created (partial success)
  - Note which Epics need manual field updates
  - Provide manual steps in summary
  - Continue with remaining Epics
</error_recovery>
```

## Quality Checks

Before completing, verify:

- [ ] All Epics use epic.yml template format
- [ ] All Epics have "[EPIC]" prefix in title
- [ ] All Epics have both PRD and Architecture links
- [ ] All Epics have clear goals and acceptance criteria
- [ ] All Epics are in GitHub Project
- [ ] All Epics have Type="Epic" field set (or noted as needing manual update)
- [ ] All Epics have Priority field set
- [ ] EPICS.md traceability document created
- [ ] Summary report provided to user
- [ ] No User Stories or Tasks were created (EPICS ONLY)

## Success Criteria

Workflow is complete when:
1. All Epic-worthy features/components identified
2. All Epics created as GitHub Issues
3. All Epics added to GitHub Project #13
4. All Epics have proper fields configured
5. Traceability matrix (EPICS.md) created
6. Summary provided to user
7. User can view Epics in project board
