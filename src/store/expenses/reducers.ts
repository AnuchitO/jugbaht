import {
  ExpenseState,
  ExpenseActionsTypes,
  INIT_EXPENSE_RECORDS,
  UPDATE_AMOUNT,
  UPDATE_NOTE,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_OWES,
  CHANGE_PAYER
} from './types'

const allMembers = [
  { id: 1, name: "AnuchitO" },
  { id: 2, name: "Kob" },
  { id: 3, name: "Tom" },
  { id: 4, name: "Sao" },
  { id: 5, name: "Pan" }
] // TODO: make sure initialize owes and members as the same

const initialState: ExpenseState = {
  records: [],
  owes: allMembers,
  payer: { id: 4, name: "Sao" },
  amount: "",
  note: "Snack",
  notes: [
    "อื่นๆ",
    "Food",
    "Drink",
    "Snack",
    "Coffee",
    "Fuel"
  ],
  members: allMembers
};

export function expenseReducer(
  state = initialState,
  action: ExpenseActionsTypes
): ExpenseState {
  switch (action.type) {
    case UPDATE_AMOUNT:
      return {
        ...state,
        amount: action.payload
      }
    case UPDATE_NOTE:
      return {
        ...state,
        note: action.payload
      }
    case ADD_EXPENSE:
      return {
        ...state,
        records: [...state.records, action.payload]
      }
    case DELETE_EXPENSE:
      return {
        ...state,
        records: state.records.filter(r => r.id !== action.payload.id)
      }
    case UPDATE_OWES:
      return {
        ...state,
        owes: action.payload
      }
    case CHANGE_PAYER:
      return {
        ...state,
        payer: action.payload
      }
    case INIT_EXPENSE_RECORDS:
      return {
        ...state,
        records: action.payload
      }
    default:
      return state;
  }
}
