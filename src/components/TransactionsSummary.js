import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { totalPerCurrency } from '../selectors/transactions-total';
import { formattedCurrency } from '../currency/currency';
var fx = require('../currency/moneyorigin');

export class TransactionsSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCurrency: 'THB', // Replace it with the default currency
            totalPerCurrency: undefined,
            selectedConversion: 'THB',
            convertedAmount: 0
        }
    };
    componentWillMount () {
        if (this.props.incomes.length === 0 && this.props.expenses.length ===0 ){
            this.setState(()=>({
                totalPerCurrency: undefined,
                convertedAmount: 0
            }))
        } else {
            let convertedAmount = 0
            let total = totalPerCurrency(this.props.incomes, this.props.expenses)
            Object.keys(total).forEach((currency)=>{
                convertedAmount += fx.convert(total[currency], {from: currency, to: this.state.selectedConversion})
            })
            this.setState(()=>({
                totalPerCurrency: total,
                convertedAmount
            }))
        }
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.incomes.length === 0 && nextProps.expenses.length ===0 ){
            this.setState(()=>({
                totalPerCurrency: undefined,
                convertedAmount: 0
            }))
        } else {
            let convertedAmount = 0
            let total = totalPerCurrency(nextProps.incomes, nextProps.expenses)
            Object.keys(total).forEach((currency)=>{
                convertedAmount += fx.convert(total[currency], {from: currency, to: this.state.selectedConversion})
            })
            this.setState(()=>({
                totalPerCurrency: total,
                convertedAmount
            }))
        }
    } 
    onCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        this.setState(()=>({
            selectedCurrency
        }))
    }
    onConversionChange = (e) => {
        const selectedConversion = e.target.value;
        let convertedAmount = 0
        Object.keys(this.state.totalPerCurrency).forEach((currency)=>{
                convertedAmount += fx.convert(this.state.totalPerCurrency[currency], {from: currency, to: selectedConversion})
            })
        this.setState(()=>({
            selectedConversion,
            convertedAmount
        }))
    }

    renderTotalPerCurrency = (totalAssets={THB: 0}) => {
        return Object.keys(totalAssets).map((asset)=>{
            return (<option key={asset}>{asset}</option>)
        })
    };
    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    <div className="page-header__dashboard">
                        <div className="page-header__dashboard-Item">
                            <h2>Converted Total Balance</h2>
                            <select 
                                onChange = {this.onConversionChange} 
                                value={this.state.selectedConversion}
                                className = "select"
                            >
                                {this.renderTotalPerCurrency(this.state.totalPerCurrency)}
                            </select>
                            <h1>{formattedCurrency(this.state.convertedAmount/100, this.state.selectedConversion)}</h1>
                        </div>
                        <div className="page-header__dashboard-Item">
                            <h2>Balance Per Currency</h2>
                            <select 
                                onChange = {this.onCurrencyChange} 
                                value = {this.state.selectedCurrency}
                                className = "select"
                            >
                                {this.renderTotalPerCurrency(this.state.totalPerCurrency)}
                            </select>
                            <h1>
                                {!!this.state.totalPerCurrency?
                                    formattedCurrency(this.state.totalPerCurrency[this.state.selectedCurrency]/100, this.state.selectedCurrency):
                                    formattedCurrency(0, this.state.selectedCurrency)
                                }
                            </h1>
                        </div>
                    </div>
                        <div className="page-header__actions">
                            <Link className="button button--income" to="/income/create">Add Income</Link>
                            <Link className="button button--expense button--twobuttons" to="/expense/create">Add Expense</Link>
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    expenses: state.expenses,
    incomes: state.incomes,
    filters: state.filters,
    rates: state.settings.rates
})

export default connect(mapStateToProps)(TransactionsSummary)