import React from 'react';
import {
  shallow
} from 'enzyme';
import Login from '/home/admin1/Fundoo/client/src/screens/login.jsx';
import '/home/admin1/Fundoo/client/setupTest.js'
/**
 * describe what we are testing
 **/
describe('Login Component', () => {
  /**
   * make our assertion and what we expect to happen 
   **/
  it('should render without throwing an error', () => {
    expect(shallow( < Login / > ).exists()).toBe(true)
  })
  /**
   * within the Login components describe function
   **/
  it('renders a email input', () => {
    expect(shallow( < Login / > ).find('#email').length).toEqual(1)
  })
  it('renders a password input', () => {
    expect(shallow( < Login / > ).find('#outlined-adornment-password1').length).toEqual(1)
  })
  /**
   * within the Login components describe function
   **/
  describe('Email input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login / > );
      wrapper.find('#email').simulate('change', {
        target: {
          name: 'email',
          value: 'abcd@gmail.com'
        }
      });
      expect(wrapper.state('email')).toEqual('abcd@gmail.com');
    })
  })
  describe('Password input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login / > );
      wrapper.find('#outlined-adornment-password1')
        .simulate('change', {
          target: {
            name: 'password',
            value: '123456'
          }
        });
      expect(wrapper.state('password')).toEqual('123456');
    })
  })
})
