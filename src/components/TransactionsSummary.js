import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectTransactions from '../selectors/transactions';
import getTotalAmount from '../selectors/transactions-total';
import numeral from 'numeral'; //http://numeraljs.com/
import "numeral/locales/th";

numeral.locale('th');
export const TransactionsSummary = (props) => {
    const sumTransactions = getTotalAmount(props.incomes)-getTotalAmount(props.expenses);
    const formattedTotal = numeral(sumTransactions/100).format('$0,0.00')
    return (
        <div className="page-header">
            <div className="content-container">
                    <h1 className="page-header__title">
                    Your current account balance is {formattedTotal}
                    </h1>
                    <div className="page-header__actions">
                        <Link className="button button--income" to="/income/create">Add Income</Link>
                        <Link className="button button--expense button--twobuttons" to="/expense/create">Add Expense</Link>
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    expenses: state.expenses,
    incomes: state.incomes,
    filters: state.filters
})

export default connect(mapStateToProps)(TransactionsSummary)