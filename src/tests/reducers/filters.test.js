import filtersReducer from '../../reducers/filters';
import moment from 'moment'

let state = filtersReducer(undefined, { type: '@@INIT' });
const startDate = moment().add(1, 'day');
const endDate = moment().add(3, 'day');

test('should setup default filter values', () => {
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set sortBy to amount', () => {
    state = filtersReducer(state, { type: 'SORT_BY_AMOUNT'});
    expect(state).toEqual({
        text:'',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month') 
    })
})

test('should set sortBy to date', () => {
    state = filtersReducer(state, { type: 'SORT_BY_DATE'});
    expect(state).toEqual({
        text:'',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month') 
    })
})

test('should set text filter', () => {
    state = filtersReducer(state, { type: 'SET_TEXT_FILTER', text: 'Text filter test'});
    expect(state).toEqual({
        text:'Text filter test',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month') 
    })
})

test('should set start date of filter', () => {
    state = filtersReducer(state, { type: 'SET_START_DATE', startDate });
    expect(state).toEqual({
        text:'Text filter test',
        sortBy: 'date',
        startDate,
        endDate: moment().endOf('month') 
    });
});

test('should set end date of filter', () => {
    state = filtersReducer(state, { type: 'SET_END_DATE', endDate });
    expect(state).toEqual({
        text:'Text filter test',
        sortBy: 'date',
        startDate,
        endDate
    });
});