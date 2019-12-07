import {
  ExpenseState,
  ExpenseActionsTypes,
  UPDATE_AMOUNT,
  UPDATE_NOTE
} from './types'

const initialState: ExpenseState = {
  amount: 0,
  note: "Snack",
  notes: [
    "Food",
    "Drink",
    "Snack",
    "Coffee",
    "Fuel"
  ]
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
      };
    case UPDATE_NOTE:
      return {
        ...state,
        note: action.payload
      }
    default:
      return state;
  }
}
