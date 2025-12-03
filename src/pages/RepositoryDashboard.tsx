import { type FC } from 'react'
import { Box, Typography, Container } from '@mui/material'

export const RepositoryDashboard: FC = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Repository Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Repository Selection - To be implemented in Epic 3
        </Typography>
      </Box>
    </Container>
  )
}
