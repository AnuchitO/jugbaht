export interface ExpenseState {
  notes: string[]
  note: string
  amount: number
}

export const UPDATE_AMOUNT = "UPDATE_AMOUNT"
export const UPDATE_NOTE = "UPDATE_NOTE"

interface UpdateAmountAction {
  type: typeof UPDATE_AMOUNT
  payload: number
}

interface UpdateNoteAction {
  type: typeof UPDATE_NOTE
  payload: string
}


export type ExpenseActionsTypes = UpdateAmountAction | UpdateNoteAction