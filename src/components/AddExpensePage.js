import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense)
    this.props.history.push('/transaction'); //our component rendered thorugh react router comes with bunch of methods
  };
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className = 'content-container'>
            <h1 className = 'page-header__title'>Add Expense</h1>
          </div>
        </div>
        <div className = 'content-container'>
          <ExpenseForm //What to do with added value is decided on parent component, we share the same expenseForm for adding and editing
          onSubmit={this.onSubmit}
          categories={this.props.categories}
          />       
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({categories: state.settings.categories})

const mapDispatchToProps = (dispatch) => {
  return {
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);

//mapStateToProps, mapDispatchToProps
//in props.dispatch(addExpense(expense)) addExpense(expense) function is not
//passed as a prop. Thus, testing it with spy becomes trickier.
//If we use mapDispatchToProps, the function becomes the part of prop and
//normal spy can be used