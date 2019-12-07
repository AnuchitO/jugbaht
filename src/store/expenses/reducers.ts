import {
  ExpenseState,
  ExpenseActionsTypes,
  UPDATE_AMOUNT,
  UPDATE_NOTE,
  UPDATE_MEMBER_CHECKED,
  ADD_EXPENSE
} from './types'

const initialState: ExpenseState = {
  records: [],
  payer: { id: 1, name: "AnuchitO", checked: true },
  amount: 0,
  note: "Snack",
  notes: [
    "Food",
    "Drink",
    "Snack",
    "Coffee",
    "Fuel"
  ],
  members: [
    { checked: true, id: 1, name: "AnuchitO" },
    { checked: true, id: 2, name: "Kob" },
    { checked: true, id: 3, name: "Tom" },
    { checked: true, id: 4, name: "Offlane" }
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
    case UPDATE_MEMBER_CHECKED:
      return {
        ...state,
        members: state.members.map(m => {
          if (m.id === action.payload) {
            return { ...m, checked: !m.checked }
          }
          return m
        })
      }
    case ADD_EXPENSE:
      return {
        ...state,
        records: [...state.records, action.payload]
      }
    default:
      return state;
  }
}
