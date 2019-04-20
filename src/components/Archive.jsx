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
import { Tooltip } from "@material-ui/core";
// import ReactNotification from "react-notifications-component";
// import "react-notifications-component/dist/theme.css";

export default class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isArchived: false
    };
    this.handleArchive = this.handleArchive.bind(this);
    //  this.notificationDOMRef = React.createRef();
  }
  // addNotification = (e) =>{
  //   this.notificationDOMRef.current.addNotification({
  //     title: "Archive Status:",
  //     message: e,
  //     type: "success",
  //     insert: "top",
  //     container: "top-right",
  //     animationIn: ["animated", "fadeIn"],
  //     animationOut: ["animated", "fadeOut"],
  //     dismiss: { duration: 2000 },
  //     dismissable: { click: true }
  //   });
  // }

  async handleArchive() {
    if (this.props.archiveStatus === false) {
      await this.setState({ isArchived: true });
      //await this.addNotification("Archived");
      this.props.ShowNotification("Note Status: ", "Archived", "success");
      this.props.archiveNote(this.state.isArchived, this.props.noteID);
    } else {
      await this.setState({ isArchived: false });
      // await this.addNotification("Unarchived");
      this.props.ShowNotification("Note Status: ", "Unarchived", "success");
      this.props.archiveNote(this.state.isArchived, this.props.noteID);
    }
  }

  render() {
    return this.state.isArchived === true ? (
      <div>
        {/*<ReactNotification ref={this.notificationDOMRef} />*/}
        <Tooltip title="Unarchive Note">
          <img
            src={unArchiveicon}
            id="ToolButton"
            onClick={this.handleArchive}
            alt="archive note icon"
          />
        </Tooltip>
      </div>
    ) : (
      <div>
        {/*<ReactNotification ref={this.notificationDOMRef} />*/}
        <Tooltip title="Archive Note">
          <img
            src={Archiveicon}
            id="ToolButton"
            alt="archive note icon"
            onClick={this.handleArchive}
          />
        </Tooltip>
      </div>
    );
  }
}
