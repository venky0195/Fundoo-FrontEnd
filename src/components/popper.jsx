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
import Divider from "@material-ui/core/Divider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import "../App.css";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      placement: null,
      profilePic: ""
    };
  }
  /**
   * @description:it will toggle or reback the event
   */
  handleToggle = () => {
    try {
      this.setState(state => ({ open: !state.open }));
    } catch (err) {
      console.log("error at handleToggle1 in popper");
    }
  };
  /**
   * @description:it will close the current action event
   */
  handleClose = event => {
    try {
      if (this.anchorEl.contains(event.target)) {
        return;
      }
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
  /**
   * @description:it trigger the event and enter into our file
   */
  triggerInputFile() {
    try {
      this.fileInput.click();
    } catch (err) {
      console.log("error at triggerInputFile in popper");
    }
  }
  /**
   * @description:it will upload the image
   * @param {*} evt
   */
  uploadImage(evt) {
    try {
      console.log("upload image", evt.target.files[0]);
      this.props.uploadImage(evt.target.files[0], this.props.note._id);
    } catch (err) {
      console.log("error at uploadImage in popper");
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
  render() {
    const { anchorEl, open, placement } = this.state;
    //const { classes } = this.props;
    const firstName = localStorage.getItem("firstName");
    const initial = firstName.substring(0, 1);
    return (
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper id="papperlogout">
                <ClickAwayListener onClick={this.handleToggle}>
                  <div
                    className="popperMain"
                    style={{
                      width: "fit-content",
                      padding: "5px",
                      marginTop: "14px"
                    }}
                  >
                    <div id="userProfileDetails">
                      <IconButton id="avatar">
                        <Tooltip title="Change Profile Picture">
                          <Avatar
                            style={{
                              width: "100px",
                              height: "100px",
                              backgroundColor: "blur",
                              marginRight: ""
                            }}
                            onClick={() => {
                              this.triggerInputFile();
                            }}
                          >
                            {this.state.profilePic !== "" ? (
                              <img
                                style={{
                                  width: "80px",
                                  height: "80px"
                                }}
                                src={this.state.profilePic}
                                alt="change Profile pic"
                              />
                            ) : (
                              <b style={{ fontSize: "33px" }}>{initial}</b>
                            )}{" "}
                            <span class="changePic">Change</span>
                            <input
                              ref={fileInput => (this.fileInput = fileInput)}
                              type="file"
                              style={{ display: "none" }}
                              className="uploadImage"
                              onChange={evt => this.uploadImage(evt)}
                            />
                          </Avatar>
                        </Tooltip>
                      </IconButton>
                      <div className="POPContent">
                        <p style={{ marginBottom: "0px" }}>
                          {firstName}
                          <br />{" "}
                        </p>
                        <small style={{ marginBottom: "0px" }}>
                          {localStorage.getItem("email")}{" "}
                        </small>
                      </div>
                    </div>
                    <Divider />
                    <div id="profilebutton">
                      <Button id="CloseBut" onClick={this.handleregister}>
                        Add account
                      </Button>
                      <Button id="CloseBut" onClick={this.handlelogout}>
                        Sign out
                      </Button>
                    </div>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
        <div className="iconButton">
          <Tooltip
            title={"Fundoo Account: " + localStorage.getItem("firstName")}
          >
            <Avatar
              style={{ width: "40px", height: "40px" }}
              onClick={this.handleClick("bottom-end")}
            >
              {this.state.profilePic !== "" ? (
                <img
                  style={{
                    width: "40px",
                    height: "40px"
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
