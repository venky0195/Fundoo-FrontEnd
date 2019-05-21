/********************************************************************************
 *  @Purpose        : To create a forgot password page for registered users to recover the password.
 *  @file           : forgotPassword.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 20-03-2019
 *********************************************************************************/
import React, { Component } from "react";
import "../App";
import "../App.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, IconButton } from "@material-ui/core";
import { forgotPassword } from "../services/userServices";

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
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
      let fields = {};
      fields["email"] = this.state.fields.email;
      this.setState({ fields: fields });
      var data = {
        email: this.state.fields.email
      };

      forgotPassword(data)
        .then(response => {
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Please check your email for further steps"
          });
          let fields = {};
          fields["email"] = "";
          this.setState({ fields: fields });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "User not found"
          });
        });
    }
  }

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
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
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

            <div id="info2">Enter your recovery email</div>

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

              <div id="loginbutt">
                <Button type="submit" id="button2" title="Login">
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
