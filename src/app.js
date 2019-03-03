import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import database, { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { startSetIncomes } from './actions/incomes';
import { initializeCategory } from './actions/category';
import { PersistGate } from 'redux-persist/integration/react';

const store = configureStore();

const jsx = (
    <Provider store = { store }>
            <AppRouter />
    </Provider>
)
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;        
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
        store.dispatch(login(user.uid));
        const categoryPromise = new Promise((resolve) => {
            initializeCategory(user.uid, store)
            resolve();
        })
        categoryPromise.then(()=>{
            store.dispatch(startSetIncomes());     
            store.dispatch(startSetExpenses()).then(() => {
                renderApp();
                if (history.location.pathname === '/') {
                    history.push('/dashboard')
                }
            });       
        })
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});