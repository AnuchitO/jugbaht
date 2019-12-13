
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Record, AddExpense, DELETE_EXPENSE } from '../expenses/types'
import { LOAD_EXPENSE_RECORDS, INIT_EXPENSE_RECORDS, ADD_EXPENSE } from '../expenses/types';

const key = "records"
const url = 'https://jugbaht-api.herokuapp.com/records';

export function* initExpenseRecords() {
  const recoredRaw: string = localStorage.getItem(key) || '[]';
  const records: Record[] = JSON.parse(recoredRaw)
  yield put({ type: INIT_EXPENSE_RECORDS, payload: records });
}

export function* addExpenseRecord(action: AddExpense) {
  const record = action.payload

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(record)
  };

  try {
    const response = yield call(fetch, url, options);
    if (response.ok) {
      const record_response = yield call([response, 'json']);
      record._id = record_response._id
    }
  } catch (e) {
    console.log(`error: ${e}`)
  } finally {
    const recoredRaw: string = localStorage.getItem(key) || "[]";
    const records: Record[] = JSON.parse(recoredRaw)
    records.push(record)
    const dataString = JSON.stringify(records);
    yield localStorage.setItem(key, dataString);
  }
}

export function* deleteExpenseRecord(action: AddExpense) {
  const record = action.payload
  const recoredRaw: string = localStorage.getItem(key) || "[]";
  const records: Record[] = JSON.parse(recoredRaw)

  if (!!!record._id) {
    const dataString = JSON.stringify(records.filter(r => r.id !== record.id));
    yield localStorage.setItem(key, dataString);
    return
  }

  const options = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }

  try {
    const response = yield call(fetch, `${url}/${record._id}`, options);
    if (response.ok) {
      const dataString = JSON.stringify(records.filter(r => r.id !== record.id));
      yield localStorage.setItem(key, dataString);
    } else {
      const dataString = JSON.stringify(records.map(r => {
        if (r.id === record.id) {
          r.makeAsDelete = true
        }

        return r
      }))
      yield localStorage.setItem(key, dataString);
    }
  } catch (e) {
    console.log(`error: ${e}`)
    const dataString = JSON.stringify(records.map(r => {
      if (r.id === record.id) {
        r.makeAsDelete = true
      }

      return r
    }))
    yield localStorage.setItem(key, dataString);
  }
}

export function* expensesSagas() {
  yield takeLatest(LOAD_EXPENSE_RECORDS, initExpenseRecords);
  yield takeEvery(ADD_EXPENSE, addExpenseRecord)
  yield takeLatest(DELETE_EXPENSE, deleteExpenseRecord)
}

export default function* rootSaga() {
  yield all([expensesSagas()]);
}