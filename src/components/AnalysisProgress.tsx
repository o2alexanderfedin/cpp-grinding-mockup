import { Box, LinearProgress, Typography } from '@mui/material'

interface AnalysisProgressProps {
  progress: number
  stage: string
}

export function AnalysisProgress({ progress, stage }: AnalysisProgressProps) {
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {stage}
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {progress}%
      </Typography>
    </Box>
  )
}
