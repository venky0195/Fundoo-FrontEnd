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
import axios from "axios";

/**
 * @description:creating services for login
 * @param {*send login data to server} data
 */
export function userLogin(data) {
  return axios.post("/login", data);
}
/**
 * @description:creating services for registration
 * @param {*used to send registered data to server} data
 */
export function userRegister(data) {
  return axios.post("/register", data);
}
/**
 * @description:creating services for forgotpassword
 * @param {*send forgotPassword data to server} data
 */
export function forgotPassword(data) {
  return axios.post("/forgotPassword", data);
}
/**
 * @description:creating services for resetpassword
 * @param {*send password data to server} Password
 * @param {*used to generate token and that data is encrypted} token
 */
export function resetPassword(password, token) {
  return axios.post(`/resetPassword/${token}`, password, {
    headers: {
      token: token
    }
  });
}
/**
 * @description:Upload profile pic for profile
 * @param {*send profile pic data to server} data
 */
export function uploadProfilePic(data) {
  var headers = {
      "token": localStorage.getItem("token")
  }
  return axios.put('/setProfilePic',
      data, {
          headers: headers
      }
  )
}