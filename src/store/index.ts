import { createStore, combineReducers } from "redux";
import { expenseReducer } from './reducers'

const rootReducer = combineReducers({
  expenses: expenseReducer
});

const configureStore = () => {
  const store = createStore(rootReducer)
  return store
}

export type AppState = ReturnType<typeof rootReducer>
export default configureStore