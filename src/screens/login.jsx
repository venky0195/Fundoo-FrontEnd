/********************************************************************************
 *  @Purpose        : To create a login page for registered users.
 *  @file           : login.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 15-03-2019
 *********************************************************************************/
import React, { Component } from "react";
import "../scss/login.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { userLogin } from "../services/userServices.js";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      fields: {
        email: "",
        password: ""
      },
      errors: {},
      snackBarMessage: "",
      openSnackBar: false,
      status: false
    };
  }
  /**
   * @description: To take user email and password
   * @param {event} e
   */
  handleChange = e => {
    try {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({ fields });
      this.setState({ [e.target.name]: e.target.value });
    } catch (err) {
      console.log("error in login handleChange");
    }
  };
  /**
   * @description: To fetch the details from the database and push user to dashboard if user details are valid
   */

  handleSubmit = e => {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["email"] = this.state.fields.email;
      fields["password"] = this.state.fields.password;
      this.setState({ fields: fields });
      var data = {
        email: this.state.fields.email,
        password: this.state.fields.password
      };
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Login Successful"
      });
      userLogin(data)
        .then(response => {
          console.log("Response in frontEnd---->", response);
          localStorage.clear();
          localStorage.setItem("email", this.state.fields.email);
          localStorage.setItem("token", response.data.token.token);
          localStorage.setItem("firstName", response.data.result.firstName);
          localStorage.setItem("user_id", response.data.result._id);
          localStorage.setItem("profilePic", response.data.result.profilePic);

          setTimeout(() => {
            this.RedirectUser();
          }, 500);
        })
        .catch(err => {
          console.log(err);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Login failed"
          });
        });
    }
  };

  RedirectUser = () => {
    this.props.history.push("/dashBoard");
  };
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
   * @description: Redirect user to register page
   */
  registerclick = e => {
    try {
      e.preventDefault();
      this.props.history.push("/register");
    } catch (err) {
      console.log("error at registrationclick in login");
    }
  };
  /**
   * @description: Redirect user to register page
   */
  forgotPasswordClick = e => {
    try {
      e.preventDefault();
      this.props.history.push("/forgotPassword");
    } catch (err) {
      console.log("error at forgotPasswordClick in login");
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

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
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

            <div id="info1">Sign in</div>

            <div id="info2">Continue to Fundoo</div>

            <form onSubmit={this.handleSubmit}>
              <TextField
                type="email"
                label="Email"
                id="email"
                name="email"
                margin="normal"
                variant="outlined"
                value={this.state.fields.email}
                onChange={this.handleChange}
                style={{ width: "75%" }}
              />
              <div className="errorMsg">{this.state.errors.email}</div>

              <TextField
                id="outlined-adornment-password1"
                variant="outlined"
                name="password"
                value={this.state.fields.password}
                onChange={this.handleChange}
                type={this.state.showPassword ? "text" : "password"}
                style={{ width: "75%", marginTop: "3%" }}
                label="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <div className="errorMsg">{this.state.errors.password}</div>
              <div id="loginbutt">
                <Button type="submit" id="button2" title="Login">
                  Login
                </Button>
              </div>
            </form>
          </div>
          <div>
            <Button
              color="primary"
              id="LinkButton"
              title="Forgot password?"
              onClick={this.forgotPasswordClick}
            >
              Forgot password?
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              id="LinkButton"
              title="Click to register"
              onClick={this.registerclick}
            >
              Create account
            </Button>
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
