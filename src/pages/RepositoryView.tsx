import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography, Grid, Paper, Box, Button, Chip } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  selectAllRepositories,
  selectSelectedFilePath,
  selectFile as selectFileInRepo,
} from '../features/repositories/repositoriesSlice'
import {
  selectAnalysisStatus,
  selectAnalysisProgress,
  selectAnalysisStage,
  selectFilteredIssues,
  selectSelectedIssueId,
  selectSelectedIssue,
  selectFile,
  selectIssue,
  runAnalysis,
  updateIssueStatus,
} from '../features/analysis/analysisSlice'
import type { IssueStatus } from '../types/issue'
import { FileTree } from '../components/FileTree'
import { IssueList } from '../components/IssueList'
import { IssueDetail } from '../components/IssueDetail'
import { IssueFilters } from '../components/IssueFilters'
import { AnalysisProgress } from '../components/AnalysisProgress'
import { ExportMenu } from '../components/ExportMenu'

export const RepositoryView: FC = () => {
  const { repoId } = useParams<{ repoId: string }>()
  const dispatch = useAppDispatch()

  const repositories = useAppSelector(selectAllRepositories)
  const repository = repositories.find(r => r.id === repoId)
  const selectedFilePath = useAppSelector(selectSelectedFilePath)
  const analysisStatus = useAppSelector(selectAnalysisStatus)
  const analysisProgress = useAppSelector(selectAnalysisProgress)
  const analysisStage = useAppSelector(selectAnalysisStage)
  const filteredIssues = useAppSelector(selectFilteredIssues)
  const selectedIssueId = useAppSelector(selectSelectedIssueId)
  const selectedIssue = useAppSelector(selectSelectedIssue)

  const handleSelectFile = (filePath: string) => {
    dispatch(selectFileInRepo(filePath))
    dispatch(selectFile(filePath))
  }

  const handleAnalyze = () => {
    if (repoId) {
      dispatch(runAnalysis(repoId))
    }
  }

  const handleStatusChange = (status: IssueStatus) => {
    if (selectedIssueId) {
      dispatch(
        updateIssueStatus({
          issueId: selectedIssueId,
          status,
          acknowledgedBy: 'demo-user',
        })
      )
    }
  }

  if (!repository) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4">Repository not found</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4">
            {repository.owner}/{repository.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip label={`${repository.issueCount} issues`} color="primary" size="small" />
            <Chip
              label={`${repository.criticalIssues} critical`}
              color="error"
              size="small"
              variant="outlined"
            />
            <Chip
              label={`${repository.highIssues} high`}
              color="warning"
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={handleAnalyze}
          disabled={analysisStatus === 'analyzing'}
        >
          {analysisStatus === 'analyzing' ? 'Analyzing...' : 'Run Analysis'}
        </Button>
      </Box>

      {analysisStatus === 'analyzing' && (
        <Paper sx={{ mb: 3 }}>
          <AnalysisProgress progress={analysisProgress} stage={analysisStage} />
        </Paper>
      )}

      <Grid container spacing={3}>
        {/* File Tree Column */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '70vh', overflow: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              File Tree
            </Typography>
            {repository.fileTree.map(rootNode => (
              <FileTree
                key={rootNode.id}
                rootNode={rootNode}
                selectedFilePath={selectedFilePath}
                onSelectFile={handleSelectFile}
              />
            ))}
          </Paper>
        </Grid>

        {/* Issue List Column */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '70vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Issues</Typography>
              <ExportMenu issues={filteredIssues} repositoryName={repository.name} />
            </Box>

            {analysisStatus === 'complete' && selectedFilePath && (
              <>
                <IssueFilters />
                <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                  <IssueList
                    issues={filteredIssues}
                    selectedIssueId={selectedIssueId}
                    onSelectIssue={id => dispatch(selectIssue(id))}
                  />
                </Box>
              </>
            )}

            {analysisStatus !== 'complete' && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography color="text.secondary">
                  {analysisStatus === 'analyzing'
                    ? 'Analysis in progress...'
                    : 'Click "Run Analysis" to start'}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Issue Detail Column */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, height: '70vh', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Issue Details
            </Typography>

            {selectedIssue ? (
              <IssueDetail
                issue={selectedIssue}
                allIssues={filteredIssues}
                onSelectIssue={id => dispatch(selectIssue(id))}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
                <Typography color="text.secondary">Select an issue to view details</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
