import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

beforeEach(()=>{
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

// Jest life cycle method to avoid repeating the same code block again and again.
// the above will run before each test case.

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit correctly', () => {
    const expense = {
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
    };
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(startAddExpense).toHaveBeenLastCalledWith(expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
})  