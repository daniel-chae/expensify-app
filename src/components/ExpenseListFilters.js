import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates'; //https://github.com/airbnb/react-dates

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }
    onSortChange = (e) => {
        switch (e.target.value) {
            case 'date':
            return this.props.sortByDate()
            case 'amount':
            return this.props.sortByAmount()
        }
    };
    onTextChange = (e) => { 
        this.props.setTextFilter(e.target.value)
    };
    onFocusChange = (calendarFocused) => {
        this.setState({ calendarFocused })
    };
    render() {
        return (
            <div className='content-container'>
                <div className='input-group'>
                    <div className='input-group__item'>
                        <input 
                        className='text-input'
                        type='text' 
                        placeholder='Search Expenses'
                        value={ this.props.filters.text } //In class-based component this.props is used to access props
                        onChange={ this.onTextChange } //When value changes onChange is called with event argument
                        />
                    </div>
                    <div className='input-group__item'>
                        <select
                        className='select'
                        value={ this.props.filters.sortBy } 
                        onChange= { this.onSortChange }
                        >
                            <option value='date'>Date</option>
                            <option value='amount'>Amount</option>
                        </select>
                    </div>
                    <div className='input-group__item'>
                        <DateRangePicker
                        startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                        endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={ this.onFocusChange } // PropTypes.func.isRequired,
                        numberOfMonths = {1}
                        isOutsideRange ={ ()=> false}
                        showClearDates = {true}
                        />
                    </div>
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
        filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => {dispatch(setTextFilter(text))},
    sortByDate: () => {dispatch(sortByDate())},
    sortByAmount: () => {dispatch(sortByAmount())},
    setStartDate: (startDate) => {dispatch(setStartDate(startDate))},
    setEndDate: (endDate) => {dispatch(setEndDate(endDate))}
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);