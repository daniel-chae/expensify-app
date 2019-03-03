import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

//Component that we render with React router comes with bunch of methods
class IncomeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.income ? props.income.description : '',
            note: props.income ? props.income.note : '',
            amount: props.income ? (props.income.amount /100).toString() : '',
            createdAt: props.income ? moment(props.income.createdAt) : moment(),
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
                    <textarea
                        className='text-area'
                        placeholder='Add a note for your income (optional)'
                        value = {this.state.note}
                        onChange = {this.onNoteChange}
                    >
                    </textarea>
                    <div>
                        <button className = 'button'>{this.props.income? "Update Income": "Add Income"}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default IncomeForm