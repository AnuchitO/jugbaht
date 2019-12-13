export type MemberID = number
export interface Member {
  id: MemberID
  name: string
}

export type RecordID = string
export interface Record {
  _id?: string
  makeAsDelete?: boolean
  id: RecordID
  amount: number
  payer: Member
  owes: Member[]
  note: string
}

export interface ExpenseState {
  amount: number | string
  members: Member[]
  note: string
  notes: string[]
  owes: Member[]
  payer: Member
  records: Record[]
}

// sagas
export const LOAD_EXPENSE_RECORDS = "LOAD_EXPENSE_RECORDS"
export const INIT_EXPENSE_RECORDS = "INIT_EXPENSE_RECORDS"


interface LoadExpenseRecords {
  type: typeof LOAD_EXPENSE_RECORDS
  payload: Record[]
}

interface InitExpenseRecords {
  type: typeof INIT_EXPENSE_RECORDS
  payload: Record[]
}

// redux
export const UPDATE_AMOUNT = "UPDATE_AMOUNT"
export const UPDATE_NOTE = "UPDATE_NOTE"
export const UPDATE_OWES = "UPDATE_OWES"
export const ADD_EXPENSE = "ADD_EXPENSE"
export const DELETE_EXPENSE = "DELETE_EXPENSE"
export const CHANGE_PAYER = "CHANGE_PAYER"

interface UpdateAmountAction {
  type: typeof UPDATE_AMOUNT
  payload: number
}

interface UpdateNoteAction {
  type: typeof UPDATE_NOTE
  payload: string
}

interface UpdateOwes {
  type: typeof UPDATE_OWES
  payload: Member[]
}

export interface AddExpense {
  type: typeof ADD_EXPENSE
  payload: Record
}

export interface DeleteExpense {
  type: typeof DELETE_EXPENSE
  payload: Record
}

interface ChangePayer {
  type: typeof CHANGE_PAYER
  payload: Member
}

export type ExpenseActionsTypes = UpdateAmountAction | UpdateNoteAction | UpdateOwes | AddExpense | DeleteExpense | ChangePayer | InitExpenseRecords | LoadExpenseRecords