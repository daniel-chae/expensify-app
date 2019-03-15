import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (update) => {
    this.props.startEditExpense(this.props.expense.id, update)
    this.props.history.push('/')
  };
  onClick = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id })
    this.props.history.push('/')
  };
  render() {
    return (
      <div>
        <div className = 'page-header'>
          <div className = 'content-container'>
            <h1 className = 'page-header__title'>Edit Expense</h1>
          </div>
        </div>
        <div className = "content-container">
          <ExpenseForm 
          expense = {this.props.expense}
          categories = {this.props.categories}
          onSubmit = {this.onSubmit}
          />       
          <button className = 'button button--bottom button--secondary' onClick = {this.onClick}>Remove Expense</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense)=>{
      return expense.id === props.match.params.id;
    }),
    categories: state.settings.categories
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    startEditExpense: (id, update) => dispatch(startEditExpense(id, update)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))    
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(EditExpensePage);
