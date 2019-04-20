/****************************************************************************************
 *  @Purpose        : Creating tools that are required to create a note.
 *  @file           : Tools.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 29-03-2019
 *****************************************************************************************/
import React, { Component } from "react";
import ColorBox from "../components/ColorBox";
import Reminder from "../components/reminder";
import Archive from "../components/Archive";
import MoreOptions from "./MoreOptions";

export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  /**
   * @description:it will toggle color event
   */
  handleToggle = () => {
    try {
      this.setState({ open: !this.state.open });
    } catch (err) {
      console.log("error at handleToggle in tools");
    }
  };
  render() {
    return (
      <div>
        <div className="cardTools">
          <Reminder
            handleToggle={this.handleToggle}
            reminder={this.props.reminder}
            noteID={this.props.noteID}
            ShowNotification={this.props.ShowNotification}
          />
          <ColorBox
            handleToggle={this.handleToggle}
            toolsPropsToColorpallete={this.props.createNotePropsToTools}
            noteID={this.props.noteID}
          />
          <Archive
            archiveNote={this.props.archiveNote}
            noteID={this.props.noteID}
            archiveStatus={this.props.archiveStatus}
            ShowNotification={this.props.ShowNotification}
          />
          <MoreOptions
            handleToggle={this.handleToggle}
            trashNote={this.props.trashNote}
            trashStatus={this.props.trashStatus}
            noteID={this.props.noteID}
            ShowNotification={this.props.ShowNotification}
          />
        </div>
      </div>
    );
  }
}
