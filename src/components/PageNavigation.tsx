import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export interface PageNavigationProps {
  showBack?: boolean
  showHome?: boolean
}

export const PageNavigation: FC<PageNavigationProps> = ({ showBack = true, showHome = true }) => {
  const navigate = useNavigate()

  const handleBack = (): void => {
    navigate(-1)
  }

  const handleHome = (): void => {
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
      {showBack && (
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          aria-label="Go back"
        >
          Back
        </Button>
      )}
      {showHome && (
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={handleHome}
          aria-label="Go to home"
        >
          Home
        </Button>
      )}
    </Box>
  )
}
