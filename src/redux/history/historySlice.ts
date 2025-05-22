import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryState, SearchedPlace } from './types';

const initialState: HistoryState = {
  history: [],
  loadingHistory: false,
  savingHistory: false,
  error: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    loadHistoryRequest: (state) => {
      state.loadingHistory = true;
      state.error = null;
    },
    loadHistorySuccess: (state, action: PayloadAction<SearchedPlace[]>) => {
      state.history = action.payload;
      state.loadingHistory = false;
    },
    loadHistoryFailure: (state, action: PayloadAction<string>) => {
      state.loadingHistory = false;
      state.error = action.payload;
    },
    addToHistory: (state, action: PayloadAction<SearchedPlace>) => {
      const newHistory = [
        action.payload,
        ...state.history.filter((item) => item.place_id !== action.payload.place_id),
      ].slice(0, 10);
      state.history = newHistory;
    },
    saveHistoryRequest: (state) => {
      state.savingHistory = true;
    },
    saveHistorySuccess: (state) => {
      state.savingHistory = false;
    },
    saveHistoryFailure: (state, action: PayloadAction<string>) => {
      state.savingHistory = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadHistoryRequest,
  loadHistorySuccess,
  loadHistoryFailure,
  addToHistory,
  saveHistoryRequest,
  saveHistorySuccess,
  saveHistoryFailure,
} = historySlice.actions;

export const selectHistory = (state: { history: HistoryState }) => state.history.history;

export default historySlice.reducer;