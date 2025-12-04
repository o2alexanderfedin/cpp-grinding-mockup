import { type FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { macosTheme } from '@theme/macosTheme'
import { Layout } from '@components/Layout'
import { LandingPage } from '@pages/LandingPage'
import { RepositoryDashboard } from '@pages/RepositoryDashboard'
import { RepositoryView } from '@pages/RepositoryView'

export const App: FC = () => {
  return (
    <ThemeProvider theme={macosTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<RepositoryDashboard />} />
            <Route path="/repo/:repoId" element={<RepositoryView />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}
