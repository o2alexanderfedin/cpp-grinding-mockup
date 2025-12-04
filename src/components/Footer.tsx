import { type FC } from 'react'
import { Box, Typography, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

export const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Hupyy - AI Firewall for Code Verification
        </Typography>
        <Typography variant="body2" color="text.secondary">
          •
        </Typography>
        <Link
          href="https://github.com/o2alexanderfedin/cpp-grinding-mockup"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            textDecoration: 'none',
            color: 'primary.main',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <GitHubIcon fontSize="small" />
          <Typography variant="body2">View on GitHub</Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 1,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Production-ready mockup demonstrating formal verification concepts
        </Typography>
      </Box>
    </Box>
  )
}
