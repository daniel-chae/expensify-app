import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/expenses-total';
import numeral from 'numeral'; //http://numeraljs.com/

export const ExpensesSummary = (props) => {
    const filteredExpenses = selectExpenses(props.expenses, props.filters);
    const lengthFilteredExpenses = filteredExpenses.length
    const sumFilteredExpenses = getTotalExpenses(filteredExpenses);
    const formattedExpensesTotal = numeral(sumFilteredExpenses/100).format('$0,0.00')
    return (
        <div className="page-header">
            <div className="content-container">
                {lengthFilteredExpenses==0?(<h1 className="page-header__title">There is no expense.</h1>):
                    (<h1 className="page-header__title">
                    Viewing <span>{lengthFilteredExpenses}</span> expense totalling <span>{formattedExpensesTotal}</span>
                    </h1>)
                }
                    <div className="page-header__actions">
                        <Link className="button" to="/create">Add Expense</Link>
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    expenses: state.expenses,
    filters: state.filters
})

export default connect(mapStateToProps)(ExpensesSummary)