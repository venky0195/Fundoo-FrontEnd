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
import EditPin from "./EditPin";
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
        padding: "3px 5px"
      },
      deleteIcon: {
        width: 14,
        height: 14,
        margin: 0
      },
      label: {
        color: "#3c4043",
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontSize: "11px",
        margin: "0 6px",
        padding: "1px",
        paddingLeft: 0,
        paddingRight: 0,
        marginRight: 0,
        fontWeight: 600
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
      pinned: false,
      reminder: "",
      archive: false,
      trash: false,
      label: []
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
  /**
   * @description:it will handle the pinned event
   * @param {*value for pinned} value
   */
  handlePinned = value => {
    try {
      this.setState({ pinned: value });
    } catch (err) {
      console.log("error at handlePinned in createNotes");
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
  deleteLabelFromNote = la => {
    var newArr = this.state.label;
    newArr = newArr.filter(item => item !== la);
    this.setState({
      label: newArr
    });
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
          pinned: this.state.pinned,
          color: this.state.color,
          reminder: this.state.reminder,
          archive: this.state.archive,
          trash: this.state.trash,
          label: this.state.label
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
          label: [],
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
  addLabelToNote = (noteID, label) => {
    console.log("label==>", label);
    if (this.state.label.includes(label)) {
      this.addNotification("Label status", "Already exist", "danger");
      this.state.label.pop(label);
      this.setState({
        label: this.state.label
      });
    } else {
      this.state.label.push(label);
      this.setState({
        label: this.state.label
      });
      console.log("labels are ", this.state.label);
    }
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
                style={{marginBottom: "5%"}}
              />
              <div style={{display: "inline-flex", marginRight: "20%"}}>
              <img style={{margin: "25%", marginTop: "4%", marginBottom: "35%", cursor: "pointer"}} id="ButtonView" src={require("../assets/newList.svg")} alt = "list add"></img>
              <img style={{margin: "25%", marginTop: "4%", marginBottom: "35%", cursor: "pointer"}} id="ButtonView" src={require("../assets/newNoteWithDrawing.svg")} alt = "drawing add"></img>
              <img style={{margin: "25%", marginTop: "4%", marginBottom: "35%", cursor: "pointer"}} id="ButtonView" src={require("../assets/imageadd.svg")} alt = "add with pic"></img></div>
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
                <div style={{ display: "inline", marginLeft: "7%" }}>
                  <EditPin
                    pinStatus={this.state.pinned}
                    cardPropsToPin={this.handlePinned}
                  />
                </div>
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
              ) : null}
            </div>
            <div>
              {this.state.label.map(la => (
                <Chip
                  style={{
                    marginTop: "5%",
                    marginRight: "2%",
                    maxWidth: "100%",
                    marginLeft: "1%"
                  }}
                  label={la}
                  onDelete={() => this.deleteLabelFromNote(la)}
                />
              ))}
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
                addLabelToNote={this.addLabelToNote}
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
