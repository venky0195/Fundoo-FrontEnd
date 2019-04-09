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

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "10px"
      },
      elevation1: {
        boxShadow: "0 3px 5px rgba(0,0,0,0.20)"
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
      trash: false,
    };
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
          trash: false,
        });
      }
    } catch (err) {
      console.log("error at handleToggle in createNotes");
    }
  };
  render() {
    return !this.state.openNote ? (
      <MuiThemeProvider theme={theme}>
        <div id="createNoteParent">
          <Card className="createNote">
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
        <div>
          <Card
            className="createNote1"
            style={{ backgroundColor: this.state.color }}
          >
            <div className="createNotePinIcon">
              <div>
                <Input
                  className="noteInputBase"
                  multiline
                  disableUnderline={true}
                  id="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleTitle}
                />
               {/* <img
                  src={require("../assets/pinNote.svg")}
                  id="ToolButtonPin"
                  alt="change color"
               />*/}
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
            {this.state.reminder ? (
              <Chip
                label={this.state.reminder}
                onDelete={() => this.reminderNote}
              />
            ) : null}
            <div className="cardToolsClose">
              <Tools
                reminder={this.handleReminder}
                createNotePropsToTools={this.handleColor}
                archiveNote={this.handleArchive}
                archiveStatus={this.state.archive}
                trashStatus={this.state.trash }
                trashNote={this.handleTrash}
              />

              <Button id="CloseBut" onClick={this.handleToggle}>
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
