import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import incomesReducer from '../reducers/incomes';

const composeEnhanders = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      incomes: incomesReducer,
      filters: filtersReducer,
      auth: authReducer
    }),
    composeEnhanders(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
