
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Record, AddExpense, DELETE_EXPENSE } from '../expenses/types'
import { LOAD_EXPENSE_RECORDS, INIT_EXPENSE_RECORDS, ADD_EXPENSE } from '../expenses/types';
import { async } from 'q';

const key = "records"
const urlApi = 'https://jugbaht-api.herokuapp.com/records';
// const urlApi = 'http://localhost:8080/records';
const optionsDelete = {
  method: 'DELETE',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

type DeleteTypes = {
  success: { "_id": string }[]
  fails: any
  error: any
}

const deleteAll = async (urls: string[]): Promise<DeleteTypes> => {
  try {
    const resps = await Promise.all(urls.map(_url => fetch(_url, optionsDelete)))
    const success = await Promise.all(resps.filter(r => r.ok).map(r => r.json()))
    const fails = await Promise.all(resps.filter(r => !r.ok).map(r => r.json()))

    return {
      success: success || [],
      fails: fails || [],
      error: null
    }
  } catch (e) {
    console.log(`delete all error:`)
    console.log(e)
    return { success: [], fails: [], error: e }
  }
}

type CreateTypes = {
  success: Record[],
  error: any
}

const createAll = async (records: Record[]): Promise<CreateTypes> => {
  try {
    const resps = await Promise.all(records.map(record => {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(record)
      }
      return fetch(urlApi, options);
    }))

    const success = await Promise.all(resps.filter(r => r.ok).map(r => r.json()))
    return { success, error: null }
  } catch (e) {
    return { success: [], error: e }
  }
}

type GetAllRecordsType = {
  records: Record[]
  error: any
}

const getAllRecords = async (): Promise<GetAllRecordsType> => {
  try {
    const response = await fetch(urlApi)
    const records = await response.json()
    console.log(`records: ${records}`)
    return { records, error: null }
  } catch (e) {
    return { records: [], error: e }
  }
}

export function* initExpenseRecords() {
  const recoredRaw: string = localStorage.getItem(key) || "[]";
  let records: Record[] = JSON.parse(recoredRaw)

  // DELETE alll
  const markAsDeletes = records
    .filter((r: Record) => r.makeAsDelete && !!r._id)
    .map((r: Record) => `${urlApi}/${r._id}`)
  console.log(`markAsDeletes: ${JSON.stringify(markAsDeletes, null, 2)}`)

  const deletedRecords: DeleteTypes = yield deleteAll(markAsDeletes)
  console.log(`deletedIDs: ${JSON.stringify(deletedRecords, null, 2)}`)
  const deletedIDs = deletedRecords.success.map(r => r._id)

  // clear all deteled
  records = records.filter(r => !deletedIDs.includes(r._id || ""))
  records = records.filter(r => !r.makeAsDelete)

  // CREATE ALL
  const waitForCreate = records.filter((r: Record) => !r._id)
  console.log(`waitForCreate: ${JSON.stringify(waitForCreate, null, 2)}`)
  const createdRecords = yield createAll(waitForCreate)
  console.log(`createdRecords: ${JSON.stringify(createdRecords, null, 2)}`)

  const createdIDs = createdRecords.success.map((r: Record) => r.id)
  records = records.filter(r => !createdIDs.includes(r.id))

  records = records.filter(r => !r._id)

  // GET ALL
  const allRecords = yield getAllRecords()
  const _records = [...allRecords.records, ...records]

  const dataString = JSON.stringify(_records);
  yield localStorage.setItem(key, dataString);
  yield put({ type: INIT_EXPENSE_RECORDS, payload: _records });
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
    const response = yield call(fetch, urlApi, options);
    if (response.ok) {
      const record_response = yield call([response, 'json']);
      record._id = record_response._id
    }
  } catch (e) {
    console.log(`error: ${e} `)
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

  try {
    const response = yield call(fetch, `${urlApi}/${record._id}`, optionsDelete);
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