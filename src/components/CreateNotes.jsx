import React, { Component } from "react";
import {
  Input,
  Card,
  createMuiTheme,
  MuiThemeProvider,
  Button
} from "@material-ui/core";
import "../App.css";
import { withStyles, Chip } from "@material-ui/core";
import "../services/noteServices.js";
import { createNote } from "../services/noteServices.js";
import Tools from "./Tools";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        fontSize: "11px",
        color: "#3c4043",
        marginTop: 20,
        height: 25,
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        padding: 0
      },
      deleteIcon: {
        width: 20,
        height: 20
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});

class createNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNote: false,
      title: "",
      description: "",
      color: "rgb(255, 255, 255)",
      newNote: {},
      reminder: "",
      archive: false,
      trash: false
    };
    this.notificationDOMRef = React.createRef();
  }
  handleColor = value => {
    try {
      this.setState({ color: value });
    } catch (err) {
      console.log("error at handleColor in createNotes");
    }
  };
  handleTitle = evt => {
    try {
      this.setState({ title: evt.target.value });
    } catch (err) {
      console.log("error at handleTitle in createNotes");
    }
  };
  /**
   * @description:it will handle the description event
   * @param {*event for description} evt
   */
  handleDescription = evt => {
    try {
      this.setState({ description: evt.target.value });
    } catch (err) {
      console.log("error at handleDescription in createNotes");
    }
  };
  /**
   * @description:it will handle the reminder event
   * @param {*value for reminder} value
   */
  handleReminder = value => {
    try {
      this.setState({ reminder: value });
    } catch (err) {
      console.log("error at handleReminder in createNotes");
    }
  };

  /**
   * @description:it will handle the archive event
   * @param {*value for archive} value
   */
  handleArchive = value => {
    try {
      this.setState({ archive: value });
    } catch (err) {
      console.log("error at handleArchive in createNotes");
    }
  };
  /**
   * @description:it will handle the trash event
   * @param {*value for trash} value
   */
  handleTrash = value => {
    try {
      this.setState({ trash: value });
    } catch (err) {
      console.log("error at handleTrash in createNotes");
    }
  };
  reminderNote = () => {
    this.setState({ reminder: "" });
    this.addNotification("Note Status: ", "Reminder Deleted", "danger");
  };

  handleToggle = () => {
    try {
      this.setState({ openNote: !this.state.openNote });
      if (
        this.state.title !== "" ||
        this.state.description !== "" ||
        this.state.color !== "rgb(255, 255, 255)"
      ) {
        const note = {
          userId: localStorage.getItem("user_id"),
          title: this.state.title,
          description: this.state.description,
          color: this.state.color,
          reminder: this.state.reminder,
          archive: this.state.archive,
          trash: this.state.trash
        };
        createNote(note)
          .then(result => {
            console.log(
              "create note result from back-end---------------->",
              result.data.data.note
            );
            this.setState({
              newNote: result.data.data.note
            });
            this.props.getNewNote(this.state.newNote);
          })
          .catch(error => {
            console.log("error is ", error);

            alert(error);
          });

        this.setState({
          title: "",
          description: "",
          color: "rgb(255, 255, 255)",
          reminder: "",
          archive: false,
          trash: false
        });
      }
    } catch (err) {
      console.log("error at handleToggle in createNotes");
    }
  };
  addNotification = (title, msg, type) => {
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: msg,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  };
  render() {
    return !this.state.openNote ? (
      <MuiThemeProvider theme={theme}>
        <div id="createNoteParent">
          <Card
            className="createNote"
            id="createNote"
            style={{ borderRadius: "10px" }}
          >
            <div className="staticCreateNote">
              <Input
                className="noteInputBase"
                multiline
                disableUnderline={true}
                placeholder="Take a note..."
                id="dummyDescription"
                readOnly={true}
                onClick={this.handleToggle}
                value=""
              />
            </div>
          </Card>
        </div>
      </MuiThemeProvider>
    ) : (
      <MuiThemeProvider theme={theme}>
        <ReactNotification ref={this.notificationDOMRef} />
        <div>
          <Card
            className="createNote1"
            id="createNote1"
            style={{ backgroundColor: this.state.color, borderRadius: "10px" }}
          >
            <div className="createNotePinIcon">
              <div>
                <Input
                  className="noteInputBasePin"
                  style={{ width: "85%", marginLeft: "1%" }}
                  multiline
                  disableUnderline={true}
                  id="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleTitle}
                />
                <img
                  src={require("../assets/pinNote.svg")}
                  id="ToolButtonPin"
                  alt="change color"
                />
              </div>

              <div>
                <Input
                  className="noteInputBase"
                  multiline
                  disableUnderline={true}
                  placeholder="Take a note..."
                  id="description"
                  value={this.state.description}
                  onChange={this.handleDescription}
                />
              </div>
            </div>
            <div>
              {this.state.reminder ? (
                <Chip
                  avatar={
                    <Avatar
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "transparent"
                      }}
                    >
                      <IconButton
                        onClick={this.handleRefresh}
                        color="inherit"
                        id="ButtonView"
                        style={{
                          backgroundColor: "transparent",
                          padding: "0"
                        }}
                      >
                        <img src={require("../assets/clock.svg")} alt="clock" />
                      </IconButton>
                    </Avatar>
                  }
                  label={this.state.reminder}
                  onDelete={this.reminderNote}
                />
              ) : null}{" "}
            </div>

            <div className="cardToolsClose">
              <Tools
                reminder={this.handleReminder}
                createNotePropsToTools={this.handleColor}
                archiveNote={this.handleArchive}
                archiveStatus={this.state.archive}
                trashStatus={this.state.trash}
                trashNote={this.handleTrash}
                ShowNotification={this.addNotification}
              />

              <Button
                id="CloseButtonNote"
                onClick={this.handleToggle}
                style={{ backgroundColor: "transparent" }}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default withStyles({ withTheme: true })(createNotes);
