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
            selectedCurrency: undefined, // Replace it with the default currency
            selectedConversion: undefined,
            perCurrencyBalance: undefined,
            displayCurrency: "Select Currency",
            displayConversion: "Select Currency",
            convertedBalance: 0,
            noTransaction: false,
            quote: []
        }
    };
    componentWillMount () {
        if (this.props.incomes.length === 0 && this.props.expenses.length === 0 ){
            console.log("no transaction1")
            this.setState(()=>({
                noTransaction: true
            }))
        } else {
            this.setState(()=>({
                perCurrencyBalance: getPerCurrencyBalance(this.props.incomes, this.props.expenses)
            }))
        }
        this.quote()
    };
    componentWillReceiveProps (nextProps) {
        if (nextProps.incomes.length === 0 && nextProps.expenses.length ===0 ){
            console.log("no transaction2")
            this.setState(()=>({
                noTransaction: true
            }))
        } else {
            this.setState(()=>({
                perCurrencyBalance: getPerCurrencyBalance(this.props.incomes, this.props.expenses)
            }))
        }
    };
    onConversionChange = (e) => {
        const selectedConversion = e.target.value;
        let convertedBalance = 0
        Object.keys(this.state.perCurrencyBalance).forEach((currency)=>{
                convertedBalance += fx.convert(this.state.perCurrencyBalance[currency], {from: currency, to: selectedConversion})
            })
        this.setState(()=>({
            selectedConversion,
            convertedBalance,
            displayConversion: getFormattedCurrency(this.state.perCurrencyBalance[selectedConversion]/100, selectedConversion)
        }))
    };

    onCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        this.setState(()=>({
            selectedCurrency,
            displayCurrency: getFormattedCurrency(this.state.perCurrencyBalance[selectedCurrency]/100, selectedCurrency)
        }))
    };
    renderCurrencyOptions = (perCurrencyBalance) => { //Update 'THB' to default currency
        if(!!perCurrencyBalance){
        return Object.keys(perCurrencyBalance).map((currency)=>{
            return (<option key={currency}>{currency}</option>)
            })
        }
    };
    quote = () => {
        getQuote().then((quote)=>{
            this.setState(()=>({
                quote
            }))
        })
    }
    getBalance = () => {
        if (this.state.noTransaction) {
            return "No Balance"
        } else if (!this.selectedCurrency) {
            return "Select Currency" 
        } else {
            return getFormattedCurrency(this.state.selectedCurrency/100, this.state.selectedCurrency)
        }
    };
    getConvertedBalance = () => {
        if (this.state.noTransaction) {
            return "No Balance"
        } else if (!this.selectedConversion) {
            return "Select Currency" 
        } else {
            return getFormattedCurrency(this.state.convertedBalance/100, this.state.selectedConversion)
        }
    };
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
                            <h2>Special Quote for you</h2>
                            <div className="dashboard__text">
                                <span>"</span>{this.state.quote[0]}<br />-{this.state.quote[1]}<span>"</span>
                            </div>
                        </div>
                        <div className="dashboard__item">
                            <h2>Converted Total Balance</h2>
                            <select 
                                onChange = {this.onConversionChange} 
                                value={this.state.selectedConversion}
                                className = "select"
                            >   
                                <option defaultValue hidden></option>
                                {this.renderCurrencyOptions(this.state.perCurrencyBalance)}
                            </select>
                            <h1>
                                {this.state.noTransaction?"No Balance":this.state.displayConversion}
                            </h1>
                        </div>
                        <div className="dashboard__item">
                            <h2>Balance Per Currency</h2>
                            <select 
                                onChange = {this.onCurrencyChange} //Whenever value is updated, it is triggered to change state
                                value = {this.state.selectedCurrency} //Starts with default value but updated whenever value is updated
                                className = "select"
                            >
                                <option defaultValue hidden></option>
                                {this.renderCurrencyOptions(this.state.perCurrencyBalance)}
                            </select>
                            <h1>
                                {this.state.noTransaction?"No Balance":this.state.displayCurrency}
                            </h1>
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