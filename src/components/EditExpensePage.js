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
        Editing the expense with id of {this.props.expense.id}
        <ExpenseForm 
          expense = {this.props.expense}
          onSubmit = {this.onSubmit}
        />
        <button onClick = {this.onClick}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense)=>{
      return expense.id === props.match.params.id;
    })
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    startEditExpense: (id, update) => dispatch(startEditExpense(id, update)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))    
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(EditExpensePage);
