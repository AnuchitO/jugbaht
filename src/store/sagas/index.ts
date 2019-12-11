
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Record } from '../expenses/types'
import { LOAD_EXPENSE_RECORDS, INIT_EXPENSE_RECORDS } from '../expenses/types';

const key = "records"

export function* initExpenseRecords() {
  console.log("Helloooo")
  const recoredRaw: string = localStorage.getItem(key) || '[]';
  const records: Record[] = JSON.parse(recoredRaw)
  yield put({ type: INIT_EXPENSE_RECORDS, payload: records });
}

export function* loadExpenseRecords() {
  yield takeEvery(LOAD_EXPENSE_RECORDS, initExpenseRecords);
}

export default function* rootSaga() {
  yield all([loadExpenseRecords()]);
}