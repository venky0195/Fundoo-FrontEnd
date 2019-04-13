/****************************************************************************************
 *  @Purpose        : Popping the account details and button to logout.
 *  @file           : popper.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 28-03-2019
 *****************************************************************************************/
import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "@material-ui/core";
import "../App.css";
import Demo from "./profilePicUpload";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      placement: null,
      profilePic: "",
      isOpen: false
    };
  }
  handleClickOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleClose1 = () => {
    this.setState({ isOpen: false });
  };

  /**
   * @description:it will close the current action event
   */
  handleClose = event => {
    try {
      // if (this.anchorEl.contains(event.target)) {
      //   return;
      // }
      this.setState({ open: false });
    } catch (err) {
      console.log("error at handleClose in popper");
    }
  };
  /**
   * @description:it will redirect to registration page
   */
  handlelogout = event => {
    try {
      event.preventDefault();
      localStorage.clear();
      this.props.props.props.history.push("/login");
    } catch (err) {
      console.log("error is ", err);

      console.log("error at login click in popper");
    }
  };
  /**
   * @description:it will redirect to login page
   */
  handleregister = event => {
    try {
      event.preventDefault();
      this.props.props.props.history.push("/register");
    } catch (err) {
      console.log("error at register click in popper");
    }
  };

  componentDidMount() {
    if (localStorage.getItem("profilePic") !== "undefined") {
      this.setState({
        profilePic: localStorage.getItem("profilePic")
      });
    }
  }
  /**
   * @description:it will open the popper
   */
  handleClick = placement => event => {
    try {
      const { currentTarget } = event;
      this.setState(state => ({
        anchorEl: currentTarget,
        open: state.placement !== placement || !state.open,
        placement
      }));
    } catch (err) {
      console.log("error at handleClick in popper");
    }
  };
  cropedpic = value => {
    console.log("value--------croped", value);
    this.setState({
      profilePic: value
    });
  };
  render() {
    const { anchorEl, open, placement } = this.state;
    const firstName = localStorage.getItem("firstName");
    const initial = firstName.substring(0, 1);
    return (
      <div>
        <Popper open={open} anchorEl={anchorEl} placement={placement}>
          <Paper id="papperlogout">
            <div
              className="popperMain"
              style={{
                width: "fit-content"
              }}
            >
              <div id="userProfileDetails">
                <IconButton id="avatar">
                  <Tooltip title="Change Profile Picture">
                    <Avatar
                      style={{
                        width: "90px",
                        height: "90px",
                        backgroundColor: "blur"
                      }}
                      onClick={this.handleClickOpen}
                    >
                      {this.state.profilePic !== "" ? (
                        <img
                          style={{
                            width: "inherit",
                            height: "initial"
                          }}
                          src={this.state.profilePic}
                          alt="change Profile pic"
                        />
                      ) : (
                        <b style={{ fontSize: "33px" }}>{initial}</b>
                      )}{" "}
                      <span className="changePic">Change</span>
                    </Avatar>
                  </Tooltip>
                </IconButton>
                <Demo
                  cropedpic={this.cropedpic}
                  open={this.state.isOpen}
                  onClose={this.handleClose1}
                />
                <div className="POPContent">
                  <div className="popName">{firstName}</div>
                  <div className="popEmail">
                    {localStorage.getItem("email")}{" "}
                  </div>
                </div>
              </div>

              <div id="profilebutton">
                <Button id="CloseBut" onClick={this.handleregister}>
                  Add account
                </Button>
                <Button id="CloseBut" onClick={this.handlelogout}>
                  Sign out
                </Button>
              </div>
            </div>
          </Paper>
        </Popper>
        <div className="iconButton">
          <Tooltip
            title={"Fundoo Account: " + localStorage.getItem("firstName")}
          >
            <Avatar
              style={{ width: "32px", height: "32px" }}
              onClick={this.handleClick("bottom-end")}
            >
              {this.state.profilePic !== "" ? (
                <img
                  style={{
                    width: "inherit",
                    height: "initial"
                  }}
                  src={this.state.profilePic}
                  alt="Change profile pic"
                />
              ) : (
                initial
              )}
            </Avatar>
          </Tooltip>
        </div>
      </div>
    );
  }
}
