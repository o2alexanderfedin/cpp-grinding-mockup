---
name: prd-to-epics
description: Convert PRD and technical architecture documents into SCRUM Epics in GitHub Projects. Creates epics with links to source documentation. Use after requirements and architecture are complete.
---

<essential_principles>
## Core Principles

1. **Epics Only**: Create ONLY SCRUM Epics. No User Stories, Tasks, or other issue types.
2. **Traceability**: Every Epic MUST link to specific sections in PRD and architecture docs.
3. **GitHub Native**: Create Epics directly as GitHub Issues using the epic template.
4. **Project Integration**: Automatically add Epics to the linked GitHub Project.
5. **High-Level Focus**: Epics represent large initiatives spanning multiple sprints.

## Epic Identification Criteria

An Epic is a large body of work that:
- Represents a major feature or system component
- Spans multiple sprints (typically 2-6 sprints)
- Can be broken down into multiple User Stories (done separately)
- Has clear business value
- Aligns with architecture components

## What This Skill Does

Analyzes PRD and architecture documents to:
1. Identify major features and system components
2. Extract Epic-worthy initiatives
3. Map each Epic to source documentation
4. Create GitHub Issues with Epic template
5. Add to GitHub Project with proper fields
6. Generate traceability matrix
</essential_principles>

<intake>
## Input Processing

Accept PRD/architecture paths via:
1. **Command arguments**: Explicit paths provided by user
2. **Auto-discovery**: Search standard locations (.requirements/, .architecture/, docs/)
3. **Interactive**: Ask user to specify if not found

**Standard locations:**
- PRD: `.requirements/PRD.md` or `docs/PRD.md`
- Architecture: `.architecture/ARCHITECTURE.md` or `docs/ARCHITECTURE.md`
</intake>

<routing>
## Workflow Selection

**Primary workflow:** `workflows/create-epics-from-docs.md`

This workflow handles:
- Document discovery or path validation
- PRD/architecture analysis
- Epic extraction and validation
- GitHub Issue creation with epic template
- Project field configuration
- Traceability documentation

**No alternative workflows** - this is a single-purpose skill.
</routing>

<process>
## Execution Flow

1. **Discover Documents**
   - Check command arguments for paths
   - Search standard locations if not provided
   - Validate files exist and are readable

2. **Analyze Documents**
   - Read PRD to identify major features
   - Read architecture to identify system components
   - Cross-reference to ensure alignment

3. **Extract Epics**
   - Identify Epic-worthy initiatives (see references/epic-criteria.md)
   - Map each Epic to PRD sections and architecture components
   - Generate Epic descriptions with context

4. **Create GitHub Issues**
   - Use epic.yml template for each Epic
   - Set Priority based on PRD priorities
   - Add links to source documentation
   - Include acceptance criteria from PRD

5. **Configure Project Fields**
   - Add to GitHub Project #13
   - Set Type = "Epic"
   - Set Priority from PRD
   - Set initial status = "Backlog"

6. **Generate Traceability**
   - Create EPICS.md mapping document
   - Link Epics to PRD sections
   - Link Epics to architecture components
   - Output summary for user

**Load workflow for detailed steps:** `workflows/create-epics-from-docs.md`
</process>

<required_tools>
## Tools Used

- **Read**: Read PRD and architecture documents
- **Grep/Glob**: Search for documents if paths not provided
- **Bash**: Execute `gh issue create` and `gh project` commands
- **Write**: Create EPICS.md traceability document
- **TodoWrite**: Track progress through workflow
</required_tools>

<success_criteria>
## Completion Checklist

- [ ] PRD and architecture documents located and read
- [ ] Epics identified (typically 5-15 per project)
- [ ] Each Epic has clear description and goal
- [ ] Each Epic links to specific PRD sections
- [ ] Each Epic links to architecture components
- [ ] All Epics created as GitHub Issues with epic template
- [ ] All Epics added to GitHub Project #13
- [ ] All Epics have Type="Epic" field set
- [ ] All Epics have Priority field set
- [ ] Traceability matrix created (EPICS.md)
- [ ] Summary provided to user with Epic URLs

**Epic Quality Checks:**
- Epic describes WHAT and WHY, not HOW
- Epic is large enough (2+ sprints of work)
- Epic has clear acceptance criteria
- Epic has business value statement
- Epic can be broken into User Stories later
</success_criteria>

<output_format>
## Deliverables

1. **GitHub Issues**: One per Epic, using epic.yml template
2. **Traceability Document**: `.requirements/EPICS.md` or `docs/EPICS.md`
3. **Summary Report**: Console output with Epic list and URLs

**EPICS.md Structure:**
```markdown
# Epic Traceability Matrix

Generated: [timestamp]
Project: [project-name]
GitHub Project: [project-url]

## Epics Overview

| Epic | GitHub Issue | Priority | PRD Section | Architecture Component |
|------|--------------|----------|-------------|------------------------|
| [Title] | #123 | High | Section X | Component Y |

## Detailed Mapping

### Epic 1: [Title]
- **GitHub Issue**: #123
- **Priority**: High
- **PRD References**:
  - Section X: [description]
  - Section Y: [description]
- **Architecture References**:
  - Component A: [description]
  - Component B: [description]
- **Goal**: [epic goal]
- **Acceptance Criteria**: [from PRD]
```
</output_format>

<error_handling>
## Common Issues

**Documents not found:**
- Search standard locations
- Ask user for paths
- Provide clear error if still not found

**No Epics identified:**
- Review Epic criteria (see references/epic-criteria.md)
- Check if features are too small (combine into Epics)
- Verify PRD has sufficient detail

**GitHub CLI errors:**
- Verify `gh` is authenticated
- Check repository and project access
- Validate epic.yml template exists

**Project field errors:**
- Verify Project #13 exists and is linked
- Check custom fields are configured
- Use GraphQL API if CLI fails
</error_handling>

<examples>
## Usage Examples

**Example 1: Auto-discovery**
```
User: /prd-to-epics
Skill: Searches .requirements/ and .architecture/, finds documents, creates Epics
```

**Example 2: Explicit paths**
```
User: /prd-to-epics docs/PRD.md docs/ARCHITECTURE.md
Skill: Uses provided paths, creates Epics
```

**Example 3: Interactive**
```
User: /prd-to-epics
Skill: Documents not found, asks for paths
User: Provides paths
Skill: Creates Epics
```
</examples>
