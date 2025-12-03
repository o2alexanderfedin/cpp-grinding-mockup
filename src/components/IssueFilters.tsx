import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
  selectSeverityFilter,
  selectSortBy,
  selectSearchQuery,
  setSeverityFilter,
  setSortBy,
  setSearchQuery,
} from '@features/analysis/analysisSlice'
import type { IssueSeverity } from '../types/issue'

export function IssueFilters() {
  const dispatch = useAppDispatch()
  const severityFilter = useAppSelector(selectSeverityFilter)
  const sortBy = useAppSelector(selectSortBy)
  const searchQuery = useAppSelector(selectSearchQuery)

  return (
    <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        size="small"
        label="Search"
        value={searchQuery}
        onChange={e => dispatch(setSearchQuery(e.target.value))}
        sx={{ flexGrow: 1, minWidth: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Severity</InputLabel>
        <Select
          value={severityFilter}
          label="Severity"
          onChange={e => dispatch(setSeverityFilter(e.target.value as IssueSeverity | 'all'))}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortBy}
          label="Sort by"
          onChange={e => dispatch(setSortBy(e.target.value as 'severity' | 'line' | 'category'))}
        >
          <MenuItem value="severity">Severity</MenuItem>
          <MenuItem value="line">Line Number</MenuItem>
          <MenuItem value="category">Category</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
