import { takeLatest, put, call, select, all } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {
  loadHistorySuccess,
  loadHistoryFailure,
  saveHistorySuccess,
  saveHistoryFailure,
  addToHistory,
} from './historySlice';
import { SearchedPlace } from './types';
import { RootState } from '../store';

const STORAGE_KEY = 'searchHistory';

const loadHistoryFromStorage = async (): Promise<SearchedPlace[]> => {
  try {
    const history = await AsyncStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    throw error;
  }
};

const saveHistoryToStorage = async (history: SearchedPlace[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history:', error);
    throw error;
  }
};

function* loadHistory() {
  try {
    const history: SearchedPlace[] = yield call(loadHistoryFromStorage);
    yield put(loadHistorySuccess(history));
  } catch (error: any) {
    yield put(loadHistoryFailure(error.message));
  }
}

function* saveHistory() {
  const history: SearchedPlace[] = yield select((state: RootState) => state.history.history);
  try {
    yield call(saveHistoryToStorage, history);
    yield put(saveHistorySuccess());
  } catch (error: any) {
    yield put(saveHistoryFailure(error.message));
  }
}

function* watchLoadHistory() {
  yield takeLatest('history/loadHistoryRequest', loadHistory);
}

function* watchAddToHistory() {
  yield takeLatest(addToHistory.type, saveHistory);
}

export default function* historySaga() {
  yield all([call(watchLoadHistory), call(watchAddToHistory)]);
}