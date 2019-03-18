/********************************************************************************
 *  @Purpose        : To create registration page for new users.
 *  @file           : login.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 15-03-2019
 *********************************************************************************/
import React, { Component } from "react";
import "../App.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, IconButton } from "@material-ui/core";
import { userRegister } from "../services/userServices";

export default class Register extends Component {
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
   * @description: To take details of the user
   * @param {event} e
   */
  handleChange(e) {
    try {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({ fields });
    } catch (err) {
      console.log("error in login handleChange");
    }
  }
  /**
   * @description: To send all the details of the user to database, if it's valid
   */
  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["firstName"] = this.state.fields.firstName;
      fields["lastName"] = this.state.fields.lastName;
      fields["email"] = this.state.fields.email;
      fields["password"] = this.state.fields.password;
      this.setState({ fields: fields });
      var data = {
        firstName: this.state.fields.firstName,
        lastName: this.state.fields.lastName,
        email: this.state.fields.email,
        password: this.state.fields.password
      };

      userRegister(data)
        .then(response => {
          this.props.history.push("/login");
        })
        .catch(err => {
          console.log(err);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Registration failed"
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
   * @description:To redirect user to login page
   */
  loginclick = event => {
    try {
      event.preventDefault();
      this.props.history.push("/login");
    } catch (err) {
      console.log("error at login click in registration");
    }
  };

  /**
   * @description: To perform validations
   */
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (!fields["lastName"]) {
      formIsValid = false;
      errors["name"] = "*LastName cant'be empty.";
    }
    if (!fields["firstName"]) {
      formIsValid = false;
      errors["name"] = "*FirstName cant'be empty.";
    }
    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^.*(?=.{3,}).*$/)) {
        formIsValid = false;
        errors["name"] = "*FirstName must contain minimum three characters.";
      }
    }

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
        <Card className="CardR">
          <div>
            <img
              className="logoR"
              src={require("../assets/Fundoo.png")}
              alt="Fundoo"
            />
          </div>
          <div id="headingR">
            <div id="info1">Create your Fundoo account</div>

            <div id="info2">Continue to Fundoo</div>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="fname">
              <TextField
                type="text"
                label="First Name"
                name="firstName"
                className="outlined-names"
                margin="normal"
                variant="outlined"
                value={this.state.fields.firstName}
                onChange={this.handleChange}
              />
            </div>
            <div className="lname">
              <TextField
                type="text"
                label="Last Name"
                name="lastName"
                className="outlined-names"
                margin="normal"
                variant="outlined"
                value={this.state.fields.lastName}
                onChange={this.handleChange}
              />
            </div>
            <div className="errorMsgF">{this.state.errors.name}</div>
            <div className="emailField">
              <TextField
                type="email"
                label="Email"
                name="email"
                className="outlined-email"
                margin="normal"
                variant="outlined"
                value={this.state.fields.email}
                onChange={this.handleChange}
              />
              <div className="errorMsgF">{this.state.errors.email}</div>
            </div>
            <div className="password">
              <TextField
                className="outlined-adornment-passwords"
                variant="outlined"
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
                name="confirmPassword"
                value={this.state.fields.confirmPassword}
                onChange={this.handleChange}
                type={this.state.showPassword ? "text" : "password"}
                label="Confirm Password"
              />
            </div>
            <div className="toggle">
              <IconButton
                id="toggle"
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
              >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>
            <div className="errorMsgF">{this.state.errors.password}</div>

            <div className="loginbuttR">
              <Button type="submit" id="button12" title="Sign-up">
                Sign-up
              </Button>
            </div>
          </form>
          <div>
            <Button
              color="primary"
              id="LinkButton"
              title="Sign-in"
              onClick={this.loginclick}
            >
              Sign in instead
            </Button>
          </div>
          <br />
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
