# GitHub Epic Creation Reference

This reference covers the technical process of creating Epics as GitHub Issues and adding them to GitHub Projects.

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- Repository access (o2alexanderfedin/cpp-grinding-mockup)
- GitHub Project #13 exists and is linked to repository
- Epic issue template exists (`.github/ISSUE_TEMPLATE/epic.yml`)

## Verify Prerequisites

```bash
# Check gh is installed
gh --version

# Check authentication
gh auth status

# Check repository access
gh repo view o2alexanderfedin/cpp-grinding-mockup

# Verify project exists
gh project view 13 --owner o2alexanderfedin
```

## Create Epic Issue

### Method 1: Using Template (Recommended)

```bash
gh issue create \
  --repo o2alexanderfedin/cpp-grinding-mockup \
  --title "[EPIC] Epic Title Here" \
  --template epic.yml \
  --web
```

This opens browser for user to fill epic template interactively.

### Method 2: Programmatic Creation

```bash
EPIC_BODY=$(cat <<'EOF'
## Epic Goal
Clear statement of what this Epic achieves.

## Description
Detailed description from PRD covering:
- What features are included
- What problem this solves
- What business value this provides

## PRD References
- **Feature Name** (`.requirements/PRD.md:120-145`)
  > Brief excerpt showing this feature in PRD

- **User Requirements** (`.requirements/PRD.md:200-215`)
  > Additional context from PRD

## Architecture References
- **System Component** (`.architecture/ARCHITECTURE.md:50-80`)
  > Architectural approach for this Epic

- **Data Model** (`.architecture/ARCHITECTURE.md:120-140`)
  > Data structures and persistence

## Acceptance Criteria
- [ ] Criterion 1 from PRD
- [ ] Criterion 2 from PRD
- [ ] Criterion 3 with specific metrics
- [ ] All integration tests passing
- [ ] Documentation complete
- [ ] Security review approved

## Business Value
Why this Epic matters to the business and users.

## Technical Scope
High-level technical approach:
- Technologies used
- Major components involved
- Integration points
- Key technical decisions

## Dependencies
This Epic depends on:
- #123 - [EPIC] Foundation System

This Epic is blocked by:
- External API access from vendor

## Estimated Effort
3 sprints (assumes team of 2 developers)

---
*Generated from PRD and Architecture documentation*
*PRD: `.requirements/PRD.md`*
*Architecture: `.architecture/ARCHITECTURE.md`*
EOF
)

gh issue create \
  --repo o2alexanderfedin/cpp-grinding-mockup \
  --title "[EPIC] Epic Title Here" \
  --body "$EPIC_BODY" \
  --label "epic" \
  --assignee @me
```

### Capture Issue Details

```bash
# Create and capture URL and number
ISSUE_JSON=$(gh issue create \
  --repo o2alexanderfedin/cpp-grinding-mockup \
  --title "[EPIC] Epic Title" \
  --body "$EPIC_BODY" \
  --label "epic" \
  --json url,number)

ISSUE_URL=$(echo "$ISSUE_JSON" | jq -r '.url')
ISSUE_NUMBER=$(echo "$ISSUE_JSON" | jq -r '.number')

echo "Created Epic: $ISSUE_URL"
```

## Add Epic to GitHub Project

### Step 1: Add Issue to Project

```bash
gh project item-add 13 \
  --owner o2alexanderfedin \
  --url "$ISSUE_URL"
```

### Step 2: Get Project Item ID

The Issue has a different ID within the Project context:

```bash
ITEM_ID=$(gh project item-list 13 \
  --owner o2alexanderfedin \
  --format json \
  --limit 1000 | \
  jq -r ".items[] | select(.content.number == $ISSUE_NUMBER) | .id")

echo "Project Item ID: $ITEM_ID"
```

## Set Project Fields

GitHub Projects v2 uses GraphQL API for field updates. First, get field and option IDs.

### Get Field IDs (One-Time Setup)

```bash
gh api graphql -f query='
{
  node(id: "PVT_kwHOBJ7Qkc4BJsRa") {
    ... on ProjectV2 {
      fields(first: 20) {
        nodes {
          ... on ProjectV2Field {
            id
            name
          }
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
}' > project-fields.json

# Extract Type field
TYPE_FIELD_ID=$(jq -r '.data.node.fields.nodes[] | select(.name == "Type") | .id' project-fields.json)
EPIC_OPTION_ID=$(jq -r '.data.node.fields.nodes[] | select(.name == "Type") | .options[] | select(.name == "Epic") | .id' project-fields.json)

# Extract Priority field
PRIORITY_FIELD_ID=$(jq -r '.data.node.fields.nodes[] | select(.name == "Priority") | .id' project-fields.json)
CRITICAL_ID=$(jq -r '.data.node.fields.nodes[] | select(.name == "Priority") | .options[] | select(.name == "Critical") | .id' project-fields.json)
HIGH_ID=$(jq -r '.data.node.fields.nodes[] | select(.name == "Priority") | .options[] | select(.name == "High") | .id' project-fields.json)
MEDIUM_ID=$(jq -r '.data.node.fields.nodes[] | select(.name == "Priority") | .options[] | select(.name == "Medium") | .id' project-fields.json)
LOW_ID=$(jq -r '.data.node.fields.nodes[] | select(.name == "Priority") | .options[] | select(.name == "Low") | .id' project-fields.json)

# Extract Status field
STATUS_FIELD_ID=$(jq -r '.data.node.fields.nodes[] | select(.name == "Status") | .id' project-fields.json)
BACKLOG_ID=$(jq -r '.data.node.fields.nodes[] | select(.name == "Status") | .options[] | select(.name == "Backlog") | .id' project-fields.json)
```

### Set Type Field to "Epic"

```bash
gh api graphql -f query='
mutation {
  updateProjectV2ItemFieldValue(
    input: {
      projectId: "PVT_kwHOBJ7Qkc4BJsRa"
      itemId: "'"$ITEM_ID"'"
      fieldId: "'"$TYPE_FIELD_ID"'"
      value: {
        singleSelectOptionId: "'"$EPIC_OPTION_ID"'"
      }
    }
  ) {
    projectV2Item {
      id
    }
  }
}'
```

### Set Priority Field

```bash
# Determine priority option ID based on Epic priority
case "$EPIC_PRIORITY" in
  "Critical")
    PRIORITY_OPTION_ID="$CRITICAL_ID"
    ;;
  "High")
    PRIORITY_OPTION_ID="$HIGH_ID"
    ;;
  "Medium")
    PRIORITY_OPTION_ID="$MEDIUM_ID"
    ;;
  "Low")
    PRIORITY_OPTION_ID="$LOW_ID"
    ;;
  *)
    PRIORITY_OPTION_ID="$MEDIUM_ID"  # Default
    ;;
esac

gh api graphql -f query='
mutation {
  updateProjectV2ItemFieldValue(
    input: {
      projectId: "PVT_kwHOBJ7Qkc4BJsRa"
      itemId: "'"$ITEM_ID"'"
      fieldId: "'"$PRIORITY_FIELD_ID"'"
      value: {
        singleSelectOptionId: "'"$PRIORITY_OPTION_ID"'"
      }
    }
  ) {
    projectV2Item {
      id
    }
  }
}'
```

### Set Status to "Backlog"

```bash
gh api graphql -f query='
mutation {
  updateProjectV2ItemFieldValue(
    input: {
      projectId: "PVT_kwHOBJ7Qkc4BJsRa"
      itemId: "'"$ITEM_ID"'"
      fieldId: "'"$STATUS_FIELD_ID"'"
      value: {
        singleSelectOptionId: "'"$BACKLOG_ID"'"
      }
    }
  ) {
    projectV2Item {
      id
    }
  }
}'
```

## Complete Epic Creation Function

Here's a complete function that creates an Epic with all fields:

```bash
create_epic() {
  local title="$1"
  local body="$2"
  local priority="$3"  # Critical, High, Medium, Low

  # Create issue
  local issue_json=$(gh issue create \
    --repo o2alexanderfedin/cpp-grinding-mockup \
    --title "$title" \
    --body "$body" \
    --label "epic" \
    --json url,number)

  local issue_url=$(echo "$issue_json" | jq -r '.url')
  local issue_number=$(echo "$issue_json" | jq -r '.number')

  echo "✓ Created Epic #$issue_number: $issue_url"

  # Add to project
  gh project item-add 13 \
    --owner o2alexanderfedin \
    --url "$issue_url" >/dev/null 2>&1

  echo "✓ Added to GitHub Project"

  # Get item ID
  local item_id=$(gh project item-list 13 \
    --owner o2alexanderfedin \
    --format json \
    --limit 1000 | \
    jq -r ".items[] | select(.content.number == $issue_number) | .id")

  # Set Type = Epic
  gh api graphql -f query='
  mutation {
    updateProjectV2ItemFieldValue(
      input: {
        projectId: "PVT_kwHOBJ7Qkc4BJsRa"
        itemId: "'"$item_id"'"
        fieldId: "'"$TYPE_FIELD_ID"'"
        value: {
          singleSelectOptionId: "'"$EPIC_OPTION_ID"'"
        }
      }
    ) {
      projectV2Item { id }
    }
  }' >/dev/null 2>&1

  echo "✓ Set Type = Epic"

  # Set Priority
  local priority_id
  case "$priority" in
    "Critical") priority_id="$CRITICAL_ID" ;;
    "High") priority_id="$HIGH_ID" ;;
    "Medium") priority_id="$MEDIUM_ID" ;;
    "Low") priority_id="$LOW_ID" ;;
    *) priority_id="$MEDIUM_ID" ;;
  esac

  gh api graphql -f query='
  mutation {
    updateProjectV2ItemFieldValue(
      input: {
        projectId: "PVT_kwHOBJ7Qkc4BJsRa"
        itemId: "'"$item_id"'"
        fieldId: "'"$PRIORITY_FIELD_ID"'"
        value: {
          singleSelectOptionId: "'"$priority_id"'"
        }
      }
    ) {
      projectV2Item { id }
    }
  }' >/dev/null 2>&1

  echo "✓ Set Priority = $priority"

  # Set Status = Backlog
  gh api graphql -f query='
  mutation {
    updateProjectV2ItemFieldValue(
      input: {
        projectId: "PVT_kwHOBJ7Qkc4BJsRa"
        itemId: "'"$item_id"'"
        fieldId: "'"$STATUS_FIELD_ID"'"
        value: {
          singleSelectOptionId: "'"$BACKLOG_ID"'"
        }
      }
    ) {
      projectV2Item { id }
    }
  }' >/dev/null 2>&1

  echo "✓ Set Status = Backlog"
  echo

  # Return issue number for reference
  echo "$issue_number"
}

# Usage
EPIC_NUM=$(create_epic \
  "[EPIC] User Authentication System" \
  "$EPIC_BODY" \
  "Critical")
```

## Error Handling

### GitHub CLI Not Authenticated

```bash
if ! gh auth status >/dev/null 2>&1; then
  echo "❌ ERROR: GitHub CLI not authenticated"
  echo "Run: gh auth login"
  exit 1
fi
```

### Repository Access Denied

```bash
if ! gh repo view o2alexanderfedin/cpp-grinding-mockup >/dev/null 2>&1; then
  echo "❌ ERROR: Cannot access repository"
  echo "Check repository name and permissions"
  exit 1
fi
```

### Project Not Found

```bash
if ! gh project view 13 --owner o2alexanderfedin >/dev/null 2>&1; then
  echo "❌ ERROR: GitHub Project #13 not found"
  echo "Verify project exists: gh project list --owner o2alexanderfedin"
  exit 1
fi
```

### GraphQL Errors

```bash
# Capture GraphQL response
response=$(gh api graphql -f query='...' 2>&1)

# Check for errors
if echo "$response" | jq -e '.errors' >/dev/null 2>&1; then
  echo "❌ ERROR: GraphQL mutation failed"
  echo "$response" | jq '.errors'
  echo
  echo "Note: Epic Issue #$issue_number was created but fields not updated."
  echo "Update manually in GitHub Project UI."
fi
```

## Batch Epic Creation

For creating multiple Epics efficiently:

```bash
# Array of Epic data
declare -a EPICS=(
  "[EPIC] User Authentication System|Critical|$AUTH_BODY"
  "[EPIC] Project Dashboard|High|$DASHBOARD_BODY"
  "[EPIC] File Management|Medium|$FILES_BODY"
)

# Create all Epics
declare -a EPIC_NUMBERS=()

for epic_data in "${EPICS[@]}"; do
  IFS='|' read -r title priority body <<< "$epic_data"

  echo "Creating: $title"
  epic_num=$(create_epic "$title" "$body" "$priority")
  EPIC_NUMBERS+=("$epic_num")

  # Rate limiting - wait 1 second between creates
  sleep 1
done

echo
echo "Created ${#EPIC_NUMBERS[@]} Epics: ${EPIC_NUMBERS[*]}"
```

## Verification

After creating Epics, verify:

```bash
# Check Epic appears in project
gh project item-list 13 \
  --owner o2alexanderfedin \
  --format json | \
  jq -r '.items[] | select(.content.number == '$ISSUE_NUMBER') | {number: .content.number, title: .content.title, type: .type}'

# Check Epic has correct labels
gh issue view $ISSUE_NUMBER \
  --repo o2alexanderfedin/cpp-grinding-mockup \
  --json labels | \
  jq -r '.labels[] | .name'

# Open Epic in browser
gh issue view $ISSUE_NUMBER \
  --repo o2alexanderfedin/cpp-grinding-mockup \
  --web
```

## Best Practices

1. **Always use "[EPIC]" prefix** in title for easy filtering
2. **Always add "epic" label** for GitHub search
3. **Set Status = "Backlog"** initially (moved to Todo during sprint planning)
4. **Link to source docs** in Epic body (PRD and Architecture)
5. **Use consistent formatting** for traceability
6. **Verify field updates** succeeded before continuing
7. **Rate limit** API calls (1 second between creates)
8. **Handle errors gracefully** (partial success is OK)
9. **Log created Epics** for traceability document
10. **Provide user feedback** for each Epic created

## Common Issues

### Issue Created But Not in Project

**Cause:** `gh project item-add` failed silently

**Solution:**
```bash
# Manually add
gh project item-add 13 \
  --owner o2alexanderfedin \
  --url https://github.com/o2alexanderfedin/cpp-grinding-mockup/issues/$ISSUE_NUMBER
```

### Fields Not Updated

**Cause:** GraphQL mutation failed (permissions, field ID mismatch)

**Solution:** Update manually in GitHub Project UI or provide user instructions

### Rate Limiting

**Cause:** Too many API calls too quickly

**Solution:** Add `sleep 1` between Epic creates

### Field IDs Changed

**Cause:** Project fields were recreated or modified

**Solution:** Re-fetch field IDs with the GraphQL query shown above

## Summary

**To create an Epic:**
1. Prepare Epic body with PRD/Architecture links
2. Create GitHub Issue with `gh issue create`
3. Add to Project with `gh project item-add`
4. Get Project Item ID with `gh project item-list`
5. Set Type = "Epic" with GraphQL mutation
6. Set Priority with GraphQL mutation
7. Set Status = "Backlog" with GraphQL mutation
8. Verify creation and return Issue number

**Key Files:**
- Epic template: `.github/ISSUE_TEMPLATE/epic.yml`
- Project ID: `PVT_kwHOBJ7Qkc4BJsRa`
- Project number: `13`
- Owner: `o2alexanderfedin`
- Repo: `cpp-grinding-mockup`
