import React from 'react';
import IncomeForm from './IncomeForm';
import { connect } from 'react-redux';
import { startAddIncome } from '../actions/incomes';

export class AddIncomePage extends React.Component {
    onSubmit = (income) => {
        this.props.startAddIncome(income)
        this.props.history.push('/transaction'); //our component rendered thorugh react router comes with bunch of methods
      };
      render() {
        return (
          <div>
            <div className='page-header'>
              <div className = 'content-container'>
                <h1 className = 'page-header__title'>Add Income</h1>
              </div>
            </div>
            <div className = 'content-container'>
              <IncomeForm //What to do with added value is decided on parent component, we share the same expenseForm for adding and editing
              onSubmit={this.onSubmit}
              />       
            </div>
          </div>
        )
      }
    }

const mapDispatchToProps = (dispatch) => {
  return {
    startAddIncome: (income) => dispatch(startAddIncome(income))
  };
};
    
export default connect(undefined, mapDispatchToProps)(AddIncomePage);