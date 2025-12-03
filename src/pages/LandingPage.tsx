import { type FC } from 'react'
import { Box, Typography, Container } from '@mui/material'

export const LandingPage: FC = () => {
  return (
    <Container>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Hupyy C++ Formal Verification
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          AI Firewall for Code Verification
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Landing Page - To be implemented in Epic 2
        </Typography>
      </Box>
    </Container>
  )
}
