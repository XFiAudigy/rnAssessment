import { combineReducers } from '@reduxjs/toolkit';
import placesReducer from './places/placesSlice';
import historyReducer from './history/historySlice';

const rootReducer = combineReducers({
  places: placesReducer,
  history: historyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;