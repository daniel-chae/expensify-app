import React from 'react';
import Header from '../../components/Header';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

//react-test-renderer
//react library created by react team. 
//render our component in regular java script code and we can assert what has been rendered
//What JSX comes back

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});