export type MemberID = number
export interface Member {
  checked: boolean
  id: MemberID
  name: string
}

export interface ExpenseState {
  members: Member[]
  notes: string[]
  note: string
  amount: number
}

export const UPDATE_AMOUNT = "UPDATE_AMOUNT"
export const UPDATE_NOTE = "UPDATE_NOTE"
export const UPDATE_MEMBER_CHECKED = "UPDATE_MEMBER_CHECKED"

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


export type ExpenseActionsTypes = UpdateAmountAction | UpdateNoteAction | UpdateMemberChecked