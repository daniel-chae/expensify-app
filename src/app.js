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
import { initializeCategory, initializeRates } from './actions/category';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faBars } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faMinus,faBars)

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

firebase.auth().onAuthStateChanged(async (user)=>{
    if (user) {
        store.dispatch(login(user.uid));
        await store.dispatch(startSetIncomes());
        await store.dispatch(startSetExpenses());
        await initializeCategory(user.uid, store);
        await initializeRates(store);
        renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});