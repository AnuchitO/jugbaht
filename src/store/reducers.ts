

// actions name
export const UPDATE_AMOUNT = "UPDATE_AMOUNT";

interface UpdateAmountAction {
  type: typeof UPDATE_AMOUNT;
  payload: number;
}

export function updateAmount(amount: number) {
  return {
    type: UPDATE_AMOUNT,
    payload: amount
  };
}

export interface ExpenseState {
  amount: number
}

const initialState: ExpenseState = {
  amount: 0
};

type ExpenseActionsTypes = UpdateAmountAction

export function expenseReducer(
  state = initialState,
  action: ExpenseActionsTypes
): ExpenseState {
  switch (action.type) {
    case UPDATE_AMOUNT: {
      return {
        ...state,
        amount: action.payload
      };
    }
    default:
      return state;
  }
}
