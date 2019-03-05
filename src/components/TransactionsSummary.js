import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectTransactions from '../selectors/transactions';
import { totalPerCurrency } from '../selectors/transactions-total';
import { formattedCurrency } from '../currency/currency';

export const TransactionsSummary = (props) => {
    const renderTotalPerCurrency = (totalAssets) => {
        return Object.keys(totalAssets).map((asset)=>{
            return (<span key={asset}>{formattedCurrency(totalAssets[asset]/100, asset)}</span>)
        })
    }
    return (
        <div className="page-header">
            <div className="content-container">
                    <h1 className="page-header__title">
                        {renderTotalPerCurrency(totalPerCurrency(props.incomes, props.expenses))}
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