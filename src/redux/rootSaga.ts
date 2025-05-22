import { all, fork } from 'redux-saga/effects';
import placesSaga from './places/placesSaga';
import historySaga from './history/historySaga';

export default function* rootSaga() {
  yield all([fork(placesSaga), fork(historySaga)]);
}