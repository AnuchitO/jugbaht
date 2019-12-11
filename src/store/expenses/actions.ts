import {
  LOAD_EXPENSE_RECORDS,
  ADD_EXPENSE,
  Member,
  Record,
  UPDATE_AMOUNT,
  UPDATE_NOTE,
  UPDATE_OWES,
  CHANGE_PAYER
} from './types'

export const updateAmount = (amount: number | string) => ({
  type: UPDATE_AMOUNT,
  payload: amount
})

export const updateNote = (note: string) => ({
  type: UPDATE_NOTE,
  payload: note
})

export const addExpense = (record: Record) => ({
  type: ADD_EXPENSE,
  payload: record
})

export const updateOwes = (owes: Member[]) => ({
  type: UPDATE_OWES,
  payload: owes
})

export const changePayer = (payer: Member) => ({
  type: CHANGE_PAYER,
  payload: payer
})

export const loadExpenseRecords = () => ({
  type: LOAD_EXPENSE_RECORDS
})