import { UPDATE_AMOUNT, UPDATE_NOTE } from './types'

export const updateAmount = (amount: number) => ({
  type: UPDATE_AMOUNT,
  payload: amount
})

export const updateNote = (note: string) => ({
  type: UPDATE_NOTE,
  payload: note
})