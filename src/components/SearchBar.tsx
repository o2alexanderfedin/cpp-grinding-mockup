import { type FC } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export interface SearchBarProps {
  value: string
  onChange: (query: string) => void
  placeholder?: string
}

export const SearchBar: FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder || 'Search repositories...'}
      value={value}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}
