
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Record, AddExpense } from '../expenses/types'
import { LOAD_EXPENSE_RECORDS, INIT_EXPENSE_RECORDS, ADD_EXPENSE } from '../expenses/types';

const key = "records"

export function* initExpenseRecords() {
  const recoredRaw: string = localStorage.getItem(key) || '[]';
  const records: Record[] = JSON.parse(recoredRaw)
  yield put({ type: INIT_EXPENSE_RECORDS, payload: records });
}

export function* addExpenseRecord(action: AddExpense) {
  const record = action.payload
  const recoredRaw: string = localStorage.getItem(key) || "[]";
  const records: Record[] = JSON.parse(recoredRaw)
  records.push(record)
  const dataString = JSON.stringify(records);
  localStorage.setItem(key, dataString);
}

export function* expensesSagas() {
  yield takeLatest(LOAD_EXPENSE_RECORDS, initExpenseRecords);
  yield takeEvery(ADD_EXPENSE, addExpenseRecord)
}

export default function* rootSaga() {
  yield all([expensesSagas()]);
}