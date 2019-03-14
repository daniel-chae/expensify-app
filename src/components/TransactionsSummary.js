import React from 'react';
import { connect } from 'react-redux';
import { getPerCurrencyBalance } from '../selectors/transactions-total';
import { getFormattedCurrency } from '../currency/currency';
import { getQuote } from '../helpers/quote';
var fx = require('../currency/moneyorigin');

export class TransactionsSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCurrency: 'THB', // Replace it with the default currency
            perCurrencyBalance: undefined,
            selectedConversion: 'THB',
            convertedAmount: 0,
            quote: ""
        }
    };
    componentWillMount () {
        if (this.props.incomes.length === 0 && this.props.expenses.length ===0 ){
            this.setState(()=>({
                perCurrencyBalance: undefined,
                convertedAmount: 0
            }))
        } else {
            let convertedAmount = 0
            let perCurrencyBalance = getPerCurrencyBalance(this.props.incomes, this.props.expenses)
            Object.keys(perCurrencyBalance).forEach((currency)=>{
                convertedAmount += fx.convert(perCurrencyBalance[currency], {from: currency, to: this.state.selectedConversion})
            })
            this.setState(()=>({
                perCurrencyBalance,
                convertedAmount
            }))
        }
        this.quote()
    };
    componentWillReceiveProps (nextProps) {
        if (nextProps.incomes.length === 0 && nextProps.expenses.length ===0 ){
            this.setState(()=>({
                perCurrencyBalance: undefined,
                convertedAmount: 0
            }))
        } else {
            let convertedAmount = 0
            let perCurrencyBalance = getPerCurrencyBalance(nextProps.incomes, nextProps.expenses)
            Object.keys(perCurrencyBalance).forEach((currency)=>{
                convertedAmount += fx.convert(perCurrencyBalance[currency], {from: currency, to: this.state.selectedConversion})
            })
            this.setState(()=>({
                perCurrencyBalance,
                convertedAmount
            }))
        }
    } 
    onConversionChange = (e) => {
        const selectedConversion = e.target.value;
        let convertedAmount = 0
        Object.keys(this.state.perCurrencyBalance).forEach((currency)=>{
                convertedAmount += fx.convert(this.state.perCurrencyBalance[currency], {from: currency, to: selectedConversion})
            })
        this.setState(()=>({
            selectedConversion,
            convertedAmount
        }))
    }
    onCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        this.setState(()=>({
            selectedCurrency
        }))
    }
    renderCurrencyOptions = (perCurrencyBalance = {'THB': 0}) => { //Update 'THB' to default currency
        return Object.keys(perCurrencyBalance).map((currency)=>{
            return (<option key={currency}>{currency}</option>)
        })
    };
    quote = () => {
        getQuote().then((quote)=>{
            console.log(quote)
            this.setState(()=>({
                quote
            }))
        })
    }

    render() {
        return (
                <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1>Finance Dashboard</h1>
                    </div>
                </div>

                <div className="content-container">
                    <div className="dashboard">
                        <div className="dashboard__item">
                            <h2>Converted Total Balance</h2>
                            <select 
                                onChange = {this.onConversionChange} 
                                value={this.state.selectedConversion}
                                className = "select"
                            >
                                {this.renderCurrencyOptions(this.state.perCurrencyBalance)}
                            </select>
                            <h1>{getFormattedCurrency(this.state.convertedAmount/100, this.state.selectedConversion)}</h1>
                        </div>
                        <div className="dashboard__item">
                            <h2>Balance Per Currency</h2>
                            <select 
                                onChange = {this.onCurrencyChange} //Whenever value is updated, it is triggered to change state
                                value = {this.state.selectedCurrency} //Starts with default value but updated whenever value is updated
                                className = "select"
                            >
                                {this.renderCurrencyOptions(this.state.perCurrencyBalance)}
                            </select>
                            <h1>
                                {!!this.state.perCurrencyBalance? //If there is balance
                                    getFormattedCurrency(this.state.perCurrencyBalance[this.state.selectedCurrency]/100, this.state.selectedCurrency): //render it with formatted Currency
                                    getFormattedCurrency(0, this.state.selectedCurrency) 
                                }
                            </h1>
                        </div>
                        <div className="dashboard__item">
                            <h2>
                                <span>"</span>{this.state.quote}<span>"</span>
                            </h2>
                        </div>
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
    rates: state.settings.rates,
    categories: state.settings.categories
})

export default connect(mapStateToProps)(TransactionsSummary)