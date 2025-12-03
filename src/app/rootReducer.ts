import { combineReducers } from '@reduxjs/toolkit'
import connectionReducer from '@features/connection/connectionSlice'
import repositoriesReducer from '@features/repositories/repositoriesSlice'
import analysisReducer from '@features/analysis/analysisSlice'

export const rootReducer = combineReducers({
  connection: connectionReducer,
  repositories: repositoriesReducer,
  analysis: analysisReducer,
})
