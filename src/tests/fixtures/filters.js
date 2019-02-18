import moment from 'moment';

export const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

export const altFilters = {
    text: 'bills',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days')
};

export const testFilters = {
    text: 're',
    sortBy: 'amount',
    startDate: moment(0).subtract(5, 'days').valueOf() ,
    endDate: moment(0).add(3, 'days')
};