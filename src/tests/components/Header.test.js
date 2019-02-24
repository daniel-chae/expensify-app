import React from 'react';
import { Header } from '../../components/Header';
import { shallow } from 'enzyme';

//react-test-renderer
//react library created by react team. 
//render our component in regular java script code and we can assert what has been rendered
//What JSX comes back

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={()=>{}} />);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogout when clicked', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled()
})