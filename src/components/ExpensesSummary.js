import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const filteredExpenses = selectExpenses(props.expenses, props.filters);
    const lengthFilteredExpenses = filteredExpenses.length
    const sumFilteredExpenses = getTotalExpenses(filteredExpenses);
    const formattedExpensesTotal = numeral(sumFilteredExpenses/100).format('$0,0.00')
    return (
        <div>
            {lengthFilteredExpenses!==0&&
                <h1>
                Viewing {lengthFilteredExpenses} expense totalling {formattedExpensesTotal}
                </h1>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    expenses: state.expenses,
    filters: state.filters
})

export default connect(mapStateToProps)(ExpensesSummary)