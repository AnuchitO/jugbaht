import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { expenseReducer } from './expenses/reducers'

const rootReducer = combineReducers({
  expenses: expenseReducer
});

const configureStore = () => {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer))
  return store
}

export type AppState = ReturnType<typeof rootReducer>
export default configureStore