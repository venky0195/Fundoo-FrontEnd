import React from 'react';
import {
    shallow
} from 'enzyme';
import ResetPassword from '../screens/resetPassword.jsx';
import '../../setupTest'
/**
 * describe what we are testing
 **/
describe('ResetPassword Component', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(shallow( < ResetPassword / > )
                .exists())
            .toBe(true)
    })
    /**
     * within the ResetPassword components describe function
     **/
    it('renders a password input', () => {
        expect(shallow( < ResetPassword / > ).find('#password').length).toEqual(1)
    })
    it('renders a newPassword password input', () => {
        expect(shallow( < ResetPassword / > ).find('#confirmPassword').length).toEqual(1)
    })
    /**
     * within the ResetPassword components describe function
     **/
    describe('Password input', () => {
        it('should respond to change event and change the state of the ResetPassword Component', () => {
            const wrapper = shallow( < ResetPassword / > );
            wrapper.find('#password')
                .simulate('change', {
                    target: {
                        name: 'password',
                        value: '123456'
                    }
                });
            expect(wrapper.state('password')).toEqual('123456');
        })
    })
    describe('newPasswordPassword input', () => {
        it('should respond to change event and change the state of the ResetPassword Component', () => {
            const wrapper = shallow( < ResetPassword / > );
            wrapper.find('#confirmPassword')
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