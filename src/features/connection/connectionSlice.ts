import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import type { ConnectionState } from '../../types/connection'

// Initial State
const initialState: ConnectionState = {
  status: 'disconnected',
}

// Async Thunks
export const connectToGitHub = createAsyncThunk('connection/connect', async () => {
  // Simulate connection delay (1.5 seconds)
  await new Promise(resolve => setTimeout(resolve, 1500))
  return undefined
})

// Slice
const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    disconnect: state => {
      state.status = 'disconnected'
    },
  },
  extraReducers: builder => {
    builder
      .addCase(connectToGitHub.pending, state => {
        state.status = 'connecting'
      })
      .addCase(connectToGitHub.fulfilled, state => {
        state.status = 'connected'
      })
  },
})

// Actions
export const { disconnect } = connectionSlice.actions

// Selectors
export const selectConnectionStatus = (state: RootState) => state.connection.status
export const selectIsConnected = (state: RootState) => state.connection.status === 'connected'

// Reducer
export default connectionSlice.reducer
