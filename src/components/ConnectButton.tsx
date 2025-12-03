import { type FC } from 'react'
import { Button, CircularProgress, Box, Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import GitHubIcon from '@mui/icons-material/GitHub'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export interface ConnectButtonProps {
  onConnect: () => Promise<void>
  isConnecting: boolean
  isConnected: boolean
  error: string | null
}

export const ConnectButton: FC<ConnectButtonProps> = ({
  onConnect,
  isConnecting,
  isConnected,
  error,
}) => {
  const getButtonContent = () => {
    if (isConnected) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckCircleIcon sx={{ mr: 1 }} />
          Connected! Redirecting...
        </motion.div>
      )
    }

    if (isConnecting) {
      return (
        <>
          <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
          Connecting...
        </>
      )
    }

    return (
      <>
        <GitHubIcon sx={{ mr: 1 }} />
        Connect to GitHub
      </>
    )
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button
        variant="contained"
        size="large"
        onClick={onConnect}
        disabled={isConnecting || isConnected}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1.125rem',
          fontWeight: 500,
        }}
      >
        {getButtonContent()}
      </Button>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Box sx={{ mt: 2, color: 'error.main' }}>
              <Typography variant="body2">{error}</Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
