import React from 'react';
import { connect } from 'react-redux';
import IncomeForm from './IncomeForm';
import { startEditIncome, startRemoveIncome } from '../actions/incomes';

export class EditIncomePage extends React.Component {
  onSubmit = (update) => {
    this.props.startEditIncome(this.props.income.id, update)
    this.props.history.push('/')
  };
  onClick = () => {
    this.props.startRemoveIncome({ id: this.props.income.id })
    this.props.history.push('/')
  };
  render() {
    return (
      <div>
        <div className = 'page-header'>
          <div className = 'content-container'>
            <h1 className = 'page-header__title'>Edit Income</h1>
          </div>
        </div>
        <div className = "content-container">
          <IncomeForm 
          income = {this.props.income}
          onSubmit = {this.onSubmit}
          />       
          <button className = 'button button--secondary' onClick = {this.onClick}>Remove Income</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    income: state.incomes.find((income)=>{
      return income.id === props.match.params.id;
    })
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    startEditIncome: (id, update) => dispatch(startEditIncome(id, update)),
    startRemoveIncome: (data) => dispatch(startRemoveIncome(data))    
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(EditIncomePage);
