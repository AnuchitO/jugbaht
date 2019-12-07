import {
  UPDATE_AMOUNT,
  UPDATE_NOTE,
  UPDATE_MEMBER_CHECKED,
  MemberID,
  Record,
  ADD_EXPENSE
} from './types'

export const updateAmount = (amount: number) => ({
  type: UPDATE_AMOUNT,
  payload: amount
})

export const updateNote = (note: string) => ({
  type: UPDATE_NOTE,
  payload: note
})

export const updateMemberChecked = (id: MemberID) => ({
  type: UPDATE_MEMBER_CHECKED,
  payload: id
})

export const addExpense = (record: Record) => ({
  type: ADD_EXPENSE,
  payload: record
})