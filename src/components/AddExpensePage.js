import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense)
    this.props.history.push('/'); //our component rendered thorugh react router comes with bunch of methods
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm //What to do with added value is decided on parent component, we share the same expenseForm for adding and editing
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
  };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);

//mapStateToProps, mapDispatchToProps
//in props.dispatch(addExpense(expense)) addExpense(expense) function is not
//passed as a prop. Thus, testing it with spy becomes trickier.
//If we use mapDispatchToProps, the function becomes the part of prop and
//normal spy can be used