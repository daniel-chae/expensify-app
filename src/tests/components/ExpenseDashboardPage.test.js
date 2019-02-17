import React from 'react';
import { shallow } from 'enzyme';
import ExportDashboardPage from '../../components/ExpenseDashboardPage';

test('should render ExpenseDashboardPage correctly', () => {
    const wrapper = shallow(<ExportDashboardPage />);
    expect(wrapper).toMatchSnapshot();
})