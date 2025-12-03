import { type FC, useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { connectToGitHub, selectConnectionStatus } from '@features/connection/connectionSlice'
import { Hero } from '@components/Hero'
import { ValueProposition, type Benefit } from '@components/ValueProposition'
import { ConnectButton } from '@components/ConnectButton'

const benefits: Benefit[] = [
  {
    title: 'Detect Bugs Early',
    description: 'Find issues before code review',
  },
  {
    title: 'Formal Verification',
    description: 'Mathematical proof of correctness',
  },
  {
    title: 'AI-Powered',
    description: 'Smart analysis and suggestions',
  },
]

export const LandingPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const connectionStatus = useAppSelector(selectConnectionStatus)

  // Redirect to dashboard when connected
  useEffect(() => {
    if (connectionStatus === 'connected') {
      const timer = setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
      return () => {
        clearTimeout(timer)
      }
    }
    return undefined
  }, [connectionStatus, navigate])

  const handleConnect = async () => {
    await dispatch(connectToGitHub())
  }

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <Hero
            appName="Hupyy"
            tagline="AI Firewall for Code Verification"
            subtitle="Formal verification linter that detects bugs before they reach production"
          />
          <ValueProposition benefits={benefits} />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ConnectButton
              onConnect={handleConnect}
              isConnecting={connectionStatus === 'connecting'}
              isConnected={connectionStatus === 'connected'}
              error={null}
            />
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  )
}
