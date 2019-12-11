
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Record } from '../expenses/types'
import { LOAD_EXPENSE_RECORDS, INIT_EXPENSE_RECORDS } from '../expenses/types';

const key = "records"

export function* initExpenseRecords() {
  const recoredRaw: string = localStorage.getItem(key) || '[]';
  const records: Record[] = JSON.parse(recoredRaw)
  yield put({ type: INIT_EXPENSE_RECORDS, payload: records });
}

export function* loadExpenseRecords() {
  yield takeLatest(LOAD_EXPENSE_RECORDS, initExpenseRecords);
}

export default function* rootSaga() {
  yield all([loadExpenseRecords()]);
}