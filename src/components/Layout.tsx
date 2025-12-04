import { type FC, type ReactNode } from 'react'
import { Box } from '@mui/material'
import { Footer } from './Footer'

export interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Footer />
    </Box>
  )
}
