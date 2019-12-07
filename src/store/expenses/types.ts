export type MemberID = number
export interface Member {
  checked: boolean
  id: MemberID
  name: string
}

export type RecordID = string
export interface Record {
  id: RecordID
  amount: number
  payer: string
  owes: MemberID[]
  note: string
}

export interface ExpenseState {
  records: Record[]
  payer: string
  members: Member[]
  notes: string[]
  note: string
  amount: number
}

export const UPDATE_AMOUNT = "UPDATE_AMOUNT"
export const UPDATE_NOTE = "UPDATE_NOTE"
export const UPDATE_MEMBER_CHECKED = "UPDATE_MEMBER_CHECKED"
export const ADD_EXPENSE = "ADD_EXPENSE"

interface UpdateAmountAction {
  type: typeof UPDATE_AMOUNT
  payload: number
}

interface UpdateNoteAction {
  type: typeof UPDATE_NOTE
  payload: string
}

interface UpdateMemberChecked {
  type: typeof UPDATE_MEMBER_CHECKED
  payload: MemberID
}

interface AddExpense {
  type: typeof ADD_EXPENSE
  payload: Record
}

export type ExpenseActionsTypes = UpdateAmountAction | UpdateNoteAction | UpdateMemberChecked | AddExpense