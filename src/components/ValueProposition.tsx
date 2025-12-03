import { type FC } from 'react'
import { Box, Grid, Card, CardContent, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import BugReportIcon from '@mui/icons-material/BugReport'
import VerifiedIcon from '@mui/icons-material/Verified'
import PsychologyIcon from '@mui/icons-material/Psychology'

export interface Benefit {
  title: string
  description: string
}

export interface ValuePropositionProps {
  benefits: Benefit[]
}

const defaultIcons = [
  <BugReportIcon key="bug" sx={{ fontSize: 48, color: 'primary.main' }} />,
  <VerifiedIcon key="verified" sx={{ fontSize: 48, color: 'primary.main' }} />,
  <PsychologyIcon key="ai" sx={{ fontSize: 48, color: 'primary.main' }} />,
]

export const ValueProposition: FC<ValuePropositionProps> = ({ benefits }) => {
  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      <Grid container spacing={3}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} md={4} key={benefit.title}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{defaultIcons[index] || defaultIcons[0]}</Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
