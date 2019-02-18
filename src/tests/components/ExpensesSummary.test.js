import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';
import { filters, altFilters, testFilters } from '../fixtures/filters';

test('should match the snapshot for ExpensesSummary with filter variation 1', () => {
    const wrapper = shallow(<ExpensesSummary expenses = {expenses} filters = {filters}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should match the snapshot for ExpensesSummary with filter variation 2', () => {
    const wrapper = shallow(<ExpensesSummary expenses = {expenses} filters = {testFilters}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should match the snapshot for ExpensesSummary with filter variation 3', () => {
    const wrapper = shallow(<ExpensesSummary expenses = {expenses} filters = {altFilters}/>);
    expect(wrapper).toMatchSnapshot();
});