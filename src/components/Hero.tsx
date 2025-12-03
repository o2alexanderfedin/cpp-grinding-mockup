import { type FC } from 'react'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import SecurityIcon from '@mui/icons-material/Security'

export interface HeroProps {
  appName: string
  tagline: string
  subtitle: string
}

export const Hero: FC<HeroProps> = ({ appName, tagline, subtitle }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        mb: 6,
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        <SecurityIcon
          sx={{
            fontSize: 80,
            color: 'primary.main',
            mb: 2,
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '2.5rem', md: '3rem' },
            mb: 2,
          }}
        >
          {appName}
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
            fontSize: { xs: '1.5rem', md: '2rem' },
            color: 'primary.main',
            mb: 2,
          }}
        >
          {tagline}
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.125rem',
            color: 'text.secondary',
            maxWidth: '600px',
          }}
        >
          {subtitle}
        </Typography>
      </motion.div>
    </Box>
  )
}
