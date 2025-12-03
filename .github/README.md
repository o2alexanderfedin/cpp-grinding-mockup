# GitHub Project Management

This directory contains all configuration and documentation for the GitHub Project board.

## Quick Links

- **[View Project Board](https://github.com/users/o2alexanderfedin/projects/13)** - Main project board
- **[Quick Start Guide](PROJECT_QUICKSTART.md)** - Get started quickly
- **[Full Documentation](PROJECT_SETUP.md)** - Complete setup and usage guide

## What's Included

### Project Setup
- **Project Name**: OilField Development
- **Project Number**: 13
- **Custom Fields**: Priority, Effort, Sprint, Type
- **Linked Repository**: cpp-grinding-mockup

### Issue Templates
Located in `.github/ISSUE_TEMPLATE/`:
- `epic.yml` - For large initiatives
- `user-story.yml` - For user-facing features
- `task.yml` - For technical work items
- `bug.yml` - For bug reports
- `spike.yml` - For research/investigation tasks

### Documentation
- `PROJECT_SETUP.md` - Comprehensive setup guide with:
  - Custom field definitions
  - Workflow states
  - Recommended views
  - Best practices
  - Automation details

- `PROJECT_QUICKSTART.md` - Quick reference with:
  - Common commands
  - Daily workflow
  - Sprint planning template
  - Tips & tricks

### Automation
- `workflows/project-automation.yml` - GitHub Actions for:
  - Auto-adding new issues to project
  - Status updates on PR events
  - Archiving completed items

## Getting Started

1. **Access the project**: https://github.com/users/o2alexanderfedin/projects/13

2. **Create your first issue**:
   ```bash
   gh issue create --title "[EPIC] Your First Epic" --template epic.yml
   ```

3. **View in project**:
   ```bash
   gh project view 13 --owner o2alexanderfedin --web
   ```

4. **Read the quick start**:
   ```bash
   cat .github/PROJECT_QUICKSTART.md
   ```

## Project Structure

```
Epic (Large initiative)
├── User Story (User-facing feature)
│   ├── Task (Implementation work)
│   ├── Task (Testing work)
│   └── Bug (Issues found during development)
└── Spike (Research needed for next user story)
```

## Workflow Overview

1. **Planning** → Create epics and user stories in Backlog
2. **Sprint Start** → Move items to Todo with current sprint
3. **Development** → Move to In Progress while working
4. **Review** → Move to In Review when PR created
5. **Done** → Automatically moved when issue closed

## Support

- **Issues with setup**: See `PROJECT_SETUP.md`
- **Daily usage help**: See `PROJECT_QUICKSTART.md`
- **GitHub Projects docs**: https://docs.github.com/en/issues/planning-and-tracking-with-projects

---

**Last Updated**: 2025-12-02
**Setup Version**: 1.0
