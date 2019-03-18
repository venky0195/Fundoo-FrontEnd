/******************************************************************************
 *  @Purpose        : To create user services that will send the incoming data 
                    to server and save that data to database and at login, reset
                    password, forgotpassword time fetching correct information 
                    from database.
 *  @file           : userServices.js        
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 16-03-2019
 ******************************************************************************/
import axios from 'axios';

/**
 * @description:creating services for login
 * @param {*send login data to server} data 
 */
export function userLogin(data) {
    return axios.post('/login', data);
}
/**
 * @description:creating services for registration
 * @param {*used to send registered data to server} data 
 */
export function userRegister(data) {
    return axios.post('/register', data);
}