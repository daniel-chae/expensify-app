import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { connect } from 'react-redux';

//Component that we render with React router comes with bunch of methods
export class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount /100).toString() : '',
            category: props.expense ? props.expense.category : 'Food',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            errorState: ''
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(()=>({ description }))
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(()=>({ note }))
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        console.log(this.props)
        if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
            this.setState(()=>({ amount })); 
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt){
            this.setState(()=>({ createdAt }));
        }
    }
    onFocusChange=({focused})=>{
        this.setState(()=>({
            calendarFocused: focused
        }))
    }
    onCategoryChange = (e) => {
        const category = e.target.value;
        this.setState(()=>({ category }))
    }
    onSubmit = ((e) => {
        e.preventDefault(); //To prevent full page refresh
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({
                errorState: 'Please provide Description and amount'
            }))
        } else {
            this.setState(()=>({
                errorState: ''
            }))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, //to turn string into float, similarto parseInt
                createdAt: this.state.createdAt.valueOf(), //https://momentjs.com/docs/#/displaying/unix-timestamp-milliseconds/
                category: this.state.category,
                note: this.state.note
            });
        }
    })
    render() {
        return (
            <div>
                <form
                    className = "form"
                    onSubmit = {this.onSubmit}
                >
                    <p className = "form__error">{!!this.state.errorState && this.state.errorState}</p>
                    <input 
                        className='text-input'
                        type = 'text'
                        placeholder = 'Description'
                        autoFocus
                        value = {this.state.description}
                        onChange = {this.onDescriptionChange}
                    />
                    <input
                        className='text-input'
                        type = 'text'
                        placeholder = 'Amount'
                        value = {this.state.amount}
                        onChange = {this.onAmountChange}
                    />
                    <SingleDatePicker
                        date = {this.state.createdAt} //To display value from the state
                        onDateChange = {this.onDateChange} //To update value in the state
                        focused = {this.state.calendarFocused} //To control the date picker visibility.
                        onFocusChange = {this.onFocusChange} //When focus comes in and off this will be fired.
                        numberOfMonths = {1} // To control how many month to be shown in date picker
                        isOutsideRange = {() => false} // To allow the past date selection 
                    />
                    <select 
                        className = "select"
                        value = {this.state.category}
                        onChange = { this.onCategoryChange }
                    >
                        {this.props.categories.map((category)=>(<option key={category} value={category}>{category}</option>))}
                    </select>
                    <textarea
                        className='text-area'
                        placeholder='Add a note for your expense (optional)'
                        value = {this.state.note}
                        onChange = {this.onNoteChange}
                    >
                    </textarea>
                    <div>
                        <button className = 'button'>{this.props.expense? "Update Expense": "Add Expense"}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ExpenseForm