import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Container } from '@mui/material'

export const RepositoryView: FC = () => {
  const { repoId } = useParams<{ repoId: string }>()

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Repository: {repoId}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          File Tree & Analysis - To be implemented in Epics 4-7
        </Typography>
      </Box>
    </Container>
  )
}
