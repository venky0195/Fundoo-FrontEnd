/*****************************************************************************************************
 *  @Purpose        : Here we archive the notes
 *  @file           : Archive.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 2-04-2019
 *****************************************************************************************************/
import React, { Component } from "react";
import unArchiveicon from "../assets/unArchive.svg";
import Archiveicon from "../assets/archive_tools.svg";
import { Snackbar, IconButton, Tooltip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export default class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isArchived: false,
      snackBarMessage: "",
      openSnackBar: false
    };
    this.handleArchive = this.handleArchive.bind(this);
  }

  async handleArchive() {
    if (this.props.archiveStatus === false) {
      await this.setState({ isArchived: true });
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Note Archived"
      });
      this.props.archiveNote(this.state.isArchived, this.props.noteID);
    } else {
      await this.setState({ isArchived: false });
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Note Unarchived"
      });
      this.props.archiveNote(this.state.isArchived, this.props.noteID);
    }
  }
  /**
   * @description:use to auto close snackBar
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
  
  render() {
    return this.state.isArchived === true ? (
      <div>
        <Tooltip title="Unarchive Note">
          <img
            src={unArchiveicon}
            id="ToolButton"
            onClick={this.handleArchive}
            alt="archive note icon"
          />
        </Tooltip>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackBar}
          autoHideDuration={0}
          onClose={this.handleSnackClose}
          variant="error"
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id"> {this.state.snackBarMessage}</span>}
          action={[
            <div>
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleSnackClose}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ]}
        />
      </div>
    ) : (
      <div>
        <Tooltip title="Archive Note">
          <img
            src={Archiveicon}
            id="ToolButton"
            alt="archive note icon"
            onClick={this.handleArchive}
          />
        </Tooltip>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackBar}
          autoHideDuration={0}
          onClose={this.handleSnackClose}
          variant="error"
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id"> {this.state.snackBarMessage}</span>}
          action={[
            <div>
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
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
