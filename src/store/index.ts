import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { expenseReducer } from './expenses/reducers'

import createSagaMiddleware from 'redux-saga';
import { loadExpenseRecords } from '../store/expenses/actions'
import rootSaga from './sagas'


const sagaMiddleware = createSagaMiddleware();


const rootReducer = combineReducers({
  expenses: expenseReducer
})

const configureStore = () => {
  const middlewares = [thunkMiddleware, sagaMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer))

  sagaMiddleware.run(rootSaga);

  store.dispatch(loadExpenseRecords())

  return store
}

export type AppState = ReturnType<typeof rootReducer>
export default configureStore