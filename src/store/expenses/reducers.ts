import {
  ExpenseState,
  ExpenseActionsTypes,
  UPDATE_AMOUNT,
  UPDATE_NOTE,
  ADD_EXPENSE,
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
  records: [
    {
      id: 'e1e8e3d2-1fa6-4e88-9dae-103c8289011a',
      amount: 100,
      payer: {
        id: 4,
        name: 'Sao'
      },
      owes: [
        {
          id: 1,
          name: 'AnuchitO'
        },
        {
          id: 2,
          name: 'Kob'
        },
        {
          id: 3,
          name: 'Tom'
        },
        {
          id: 4,
          name: 'Sao'
        },
        {
          id: 5,
          name: 'Pan'
        }
      ],
      note: 'Snack'
    },
    {
      id: '441282cb-5eb0-4ee8-ba4a-41d574444487',
      amount: 800,
      payer: {
        id: 4,
        name: 'Sao'
      },
      owes: [
        {
          id: 1,
          name: 'AnuchitO'
        },
        {
          id: 2,
          name: 'Kob'
        },
        {
          id: 3,
          name: 'Tom'
        },
        {
          id: 4,
          name: 'Sao'
        },
        {
          id: 5,
          name: 'Pan'
        }
      ],
      note: 'Fuel'
    }
  ], // TODO: localstorage
  owes: allMembers,
  payer: { id: 4, name: "Sao" },
  amount: "",
  note: "Snack",
  notes: [
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
    default:
      return state;
  }
}
