import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(()=> {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters = {filters} 
            setTextFilter = {setTextFilter}
            sortByDate = {sortByDate}
            sortByAmount = {sortByAmount}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate}
        />
    );
});

test('should renderExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should renderExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    }) 
    //When we have to change props of a component 
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const event = {
        target: {
            value: 'rent'
        }
    } 
    wrapper.find('input').simulate('change', event);
    expect(setTextFilter).toHaveBeenLastCalledWith(event.target.value);
});

test('should handle sort change by amount', () => {
    const event = {
        target: {
            value: 'amount'
        }
    };
    wrapper.find('select').simulate('change', event);
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle sort change by date', () => {
    const event = {
        target: {
            value: 'date'
        }
    };
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', event);
    expect(sortByDate).toHaveBeenCalled();
});

test('should handle date change', () => {
    const date = { 
        startDate: moment(0).add(5, 'days'),
        endDate: moment(0).add(10, 'days')
    }
    wrapper.find('DateRangePicker').prop('onDatesChange')(date)
    expect(setStartDate).toHaveBeenLastCalledWith(date.startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(date.endDate);
});

test('should handle date focus change', () => {
    const calendarFocused = 'startDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
})

