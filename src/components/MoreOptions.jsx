/****************************************************************************************
 *  @Purpose        : Component for more options in toolBox
 *  @file           : MoreOptions.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 05-04-2019
 *****************************************************************************************/
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import { MenuItem } from "@material-ui/core";
import { getLabels } from "../services/noteServices";

import "../App.css";
import "react-notifications-component/dist/theme.css";
import AddLabelsOnNote from "./LabelPopper";
export default class MoreOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      placement: null,
      isTrash: false,
      label: []
    };
    this.notificationDOMRef = React.createRef();
    this.moreOptionsToAddLabels = React.createRef();
  }
  componentDidMount() {
    getLabels()
      .then(result => {
        this.setState({
          label: result.data.data
        });
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }

  /**
   * @description:it will toggle or reback the event
   */
  handleToggle = () => {
    try {
      this.setState(state => ({ open: !state.open }));
    } catch (err) {
      console.log("error at handleToggle1 in moreOptions");
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
      console.log("error at handleClose in moreOptions");
    }
  };
  /**
   * @description:it will open the more options
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

  async handleTrash() {
    console.log("(this.props.trashStatus", this.state.isTrash);
    if (this.props.trashStatus === false) {
      await this.setState({ isTrash: true });
      this.props.ShowNotification("Note Status: ", "Trashed", "danger");
      console.log("this.state.isTrash changed", this.state.isTrash);
      this.props.trashNote(this.state.isTrash, this.props.noteID);
    } else {
      this.setState({ isTrash: false });
      console.log(" this.state.isTrash change in else", this.state.isTrash);
      this.props.trashNote(this.state.isTrash, this.props.noteID);
    }
  }
  handleLabelsOnNote = event => {
    try {
      this.setState({
        open: false
      });
      this.moreOptionsToAddLabels.current.addLabelPopup(event);
      this.setState({
        open: false
      });
      //this.handleToggle()
    } catch (err) {
      console.log("error at handleLabelOnNote in moreOptions");
    }
  };

  render() {
    const { anchorEl, open, placement } = this.state;
    return (
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
          style={{ zIndex: 5003 }}
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
                    <MenuItem onClick={() => this.handleTrash()}>
                      Delete Note
                    </MenuItem>
                    <MenuItem onClick={() => this.handleLabelsOnNote()}>
                      Add Label
                    </MenuItem>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
        <div className="iconButton">
          <Tooltip title="More options">
            <img
              src={require("../assets/more_tools.svg")}
              id="ToolButton"
              alt="change color"
              onClick={this.handleClick("bottom-start")}
            />
          </Tooltip>
        </div>
        <AddLabelsOnNote
          ref={this.moreOptionsToAddLabels}
          noteID={this.props.noteID}
          addLabelToNote={this.props.addLabelToNote}
          anchorEl={this.state.anchorEl}
        />
      </div>
    );
  }
}
