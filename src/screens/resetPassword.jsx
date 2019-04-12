/********************************************************************************
 *  @Purpose        : To create a login page for registered users.
 *  @file           : login.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 15-03-2019
 *********************************************************************************/
import React, { Component } from "react";
import "../App";
import "../App.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, IconButton } from "@material-ui/core";
import { resetPassword } from "/home/admin1/Fundoo/client/src/services/userServices.js";

export default class resetpassword extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      fields: {},
      errors: {},
      snackBarMessage: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * @description: To take user email and password
   * @param {event} e
   */
  handleChange(e) {
    try {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({ fields });
      this.setState({ [e.target.name]: e.target.value });
    } catch (err) {
      console.log("error in login handleChange");
    }
  }
  /**
   * @description: To fetch the details from the database and push user to dashboard if user details are valid
   */
  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let current_url = window.location.pathname;
      let verify_user_token = current_url.substr(15);
      console.log(verify_user_token);
      console.log("current ", current_url);
      let fields = {};
      fields["password"] = this.state.fields.password;
      this.setState({ fields: fields });
      var data = {
        password: this.state.fields.password
      };
      console.log("Pass is ");

      resetPassword(data, verify_user_token)
        .then(response => {
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Success"
          });
          this.props.history.push("/login");
        })
        .catch(err => {
          console.log(err);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Failed"
          });
        });
    }
  }
  /**
   *@description: To display/hide the password to the user
   */
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  /**
   *@description: To close the snack bar
   */
  handleSnackClose = () => {
    try {
      this.setState({
        openSnackBar: false
      });
    } catch (err) {
      console.log("error at handleSnackClose in login");
    }
  };

  /**
   * @description: To perform validations
   */
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter the password.";
    }
    if (!fields["confirmPassword"]) {
      formIsValid = false;
      errors["password"] = "*Please enter the password.";
    }
    if (fields["confirmPassword"] !== fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Passwords doesn't match";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{6,}).*$/)) {
        formIsValid = false;
        errors["password"] = "*Password must contain minimum six characters.";
      }
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div>
        <Card className="Card">
          <div className="content">
            <div>
              <img
                className="logo"
                src={require("../assets/Fundoo.png")}
                alt="Fundoo"
              />
            </div>

            <div id="info1">Reset your password</div>

            <div id="info2">Continue to Fundoo</div>

            <form onSubmit={this.handleSubmit}>
              <div className="password">
                <TextField
                  className="outlined-adornment-passwords"
                  variant="outlined"
                  id="password"
                  name="password"
                  value={this.state.fields.password}
                  onChange={this.handleChange}
                  type={this.state.showPassword ? "text" : "password"}
                  label="Password"
                />
              </div>
              <div className="confirmPass">
                <TextField
                  className="outlined-adornment-passwords"
                  variant="outlined"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={this.state.fields.confirmPassword}
                  onChange={this.handleChange}
                  type={this.state.showPassword ? "text" : "password"}
                  label="Confirm Password"
                />
              </div>
              <div className="toggleF">
                <IconButton
                  id="toggleF"
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
              <div className="errorMsgF">{this.state.errors.password}</div>
              <div id="loginbutt">
                <Button type="submit" id="button2" title="Submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={this.state.openSnackBar}
          autoHideDuration={6000}
          onClose={this.handleSnackClose}
          variant="error"
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id"> {this.state.snackBarMessage} </span>}
          action={[
            <div>
              <IconButton
                key="close"
                aria-label="Close"
                onClick={this.handleSnackClose}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ]}
        />
      </div>
    );
  }
}
