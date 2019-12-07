import {
  UPDATE_AMOUNT,
  UPDATE_NOTE,
  UPDATE_MEMBER_CHECKED,
  MemberID
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