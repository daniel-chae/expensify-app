import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);


test('should setup remove expense action object', ()=>{
    const action = removeExpense({ id: '123' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123'
    });
}); 

test('should setup edit expense action object', ()=>{
    const action = editExpense('1234', { description: 'updated description' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '1234',
        updates: { description: 'updated description'}
    });
});

test('should setup add expense action object with data', ()=>{
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
        }
    );
});

//Asynchronous test, Jest doens't wait
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();;
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const defaultExpense = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    store.dispatch(startAddExpense()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpense
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(defaultExpense);
            done();;
    });
});

// test('should setup add expense action object without data', ()=>{
//     const action = startAddExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//           description: '',
//           note: '',
//           amount: 0,
//           createdAt: 0,
//           id: expect.any(String)
//         }
//     })
// })