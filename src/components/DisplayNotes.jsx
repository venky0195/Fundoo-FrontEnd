/*****************************************************************************************************
 *  @Purpose        : To display the nots in the dashboard
 *  @file           : DisplayNotes.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 01-04-2019
 *****************************************************************************************************/
import React, { Component } from "react";
import {
  Card,
  MuiThemeProvider,
  createMuiTheme,
  Chip
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ArchivedNavigator from "../components/ArchivedNavigator";

import Tools from "../components/Tools";
import {
  getNotes,
  updateColor,
  otherArray,
  setReminder,
  updateArchiveStatus,
  updateTrashStatus,
  updateTitle,
  updateDescription,
  archiveArray
} from "../services/noteServices";

import "../App.css";

import FormDialog from "./DialogBox";
import IconButton from "@material-ui/core/IconButton";

const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        fontSize: 14,
        marginTop: 20,
        height: 25,
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        padding: 5
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

export default class Cards extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      DialogOpen: false
    };
    this.cardsToDialog = React.createRef();
  }
  openDialogBox = note => {
    console.log("Value is ---------------------", note);
    this.cardsToDialog.current.getData(note);
    this.setState({
      DialogOpen: true
    });
  };
  closeDialogBox = () => {
    this.setState({
      DialogOpen: false
    });
  };

  componentDidMount() {
    getNotes()
      .then(result => {
        this.setState({
          notes: result.data.data
        });
        console.log("getNotes result from back-end", result);
      })
      .catch(error => {
        alert(error);
      });
  }

  getColor = (value, noteId) => {
    const color = {
      noteID: noteId,
      color: value
    };
    updateColor(color)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].color = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  displayNewCard = newCard => {
    this.setState({
      notes: [...this.state.notes, newCard]
    });
  };

  reminderNote = (value, noteId) => {
    const reminder = {
      noteID: noteId,
      reminder: value
    };
    setReminder(reminder)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].reminder = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  archiveNote = (value, noteId) => {
    const isArchived = {
      noteID: noteId,
      archive: value
    };
    console.log("isArchive=========>", isArchived);

    updateArchiveStatus(isArchived)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].archive = result.data.data;

            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  trashNote = (value, noteId) => {
    const isTrash = {
      noteID: noteId,
      trash: value
    };
    console.log("isTrash=========>", isTrash);

    updateTrashStatus(isTrash)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].trash = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  updateTitle = (value, noteId) => {
    console.log("Value of title is---", value + " id is ---->", noteId);
    const updatedTitle = {
      noteID: noteId,
      title: value
    };
    updateTitle(updatedTitle)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].title = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  updateDescription = (value, noteId) => {
    console.log(
      "Value of updated description is---",
      value + " id is ---->",
      noteId
    );
    const updatedDescription = {
      noteID: noteId,
      description: value
    };
    updateDescription(updatedDescription)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].description = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    let notesArray = otherArray(this.state.notes);

    console.log(notesArray);
    if (this.props.navigateArchived) {
      return (
        <ArchivedNavigator
          archiveArray={archiveArray(this.state.notes)}
          othersArray={otherArray}
          getColor={this.getColor}
          noteProps={this.props.noteProps}
          reminder={this.reminderNote}
          trashNote={this.trashNote}
          archiveNote={this.archiveNote}
        />
      );
    } else {
      let cardsView = this.props.noteProps ? "listCards" : "cards";
      return (
        <div className="root">
          <MuiThemeProvider theme={theme}>
            <div className="CardsView">
              {Object.keys(notesArray)
                .reverse()
                .map(key => {
                  return (
                    <div key={key}>
                      <Card
                        className={cardsView}
                        style={{
                          backgroundColor: notesArray[key].color,
                          borderRadius: "8px",
                          border: "1px solid #dadce0"
                        }}
                        id={cardsView}
                      >
                        <div id="dispNotes">
                          <div
                            onClick={() => this.openDialogBox(notesArray[key])}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              wordBreak: "break-word",
                              fontSize: "0.95rem"
                            }}
                          >
                            <b> {notesArray[key].title}</b>

                            <img
                              src={require("../assets/pinNote.svg")}
                              id="ToolButtonPinn"
                              alt="change color"
                            />
                          </div>
                          <div
                            onClick={() => this.openDialogBox(notesArray[key])}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              wordBreak: "break-word",
                              fontSize: "0.9rem"
                            }}
                          >
                            {notesArray[key].description}
                          </div>
                          <div style={{ width: "fit-content" }}>
                            {notesArray[key].reminder ? (
                              <Chip
                                avatar={
                                  <Avatar
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      backgroundColor: "transparent",
                                      marginRight: "-6%"
                                    }}
                                  >
                                    <IconButton
                                      color="inherit"
                                      id="ButtonClock"
                                      style={{
                                        backgroundColor: "transparent",
                                        padding: "0",
                                        cursor: "default"
                                      }}
                                    >
                                      <img
                                        src={require("../assets/clock.svg")}
                                        alt="clock"
                                      />
                                    </IconButton>
                                  </Avatar>
                                }
                                label={notesArray[key].reminder}
                                onDelete={() =>
                                  this.reminderNote("", notesArray[key]._id)
                                }
                                style={{ fontSize: "smaller", width: "93%" }}
                              />
                            ) : null}
                          </div>

                          <div id="displaycontentdiv">
                            <Tools
                              archiveNote={this.archiveNote}
                              archiveStatus={notesArray[key].archive}
                              createNotePropsToTools={this.getColor}
                              noteID={notesArray[key]._id}
                              note={notesArray[key].note}
                              reminder={this.reminderNote}
                              trashNote={this.trashNote}
                              trashStatus={notesArray[key].trash}
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
            </div>
            <FormDialog
              ref={this.cardsToDialog}
              open={this.state.DialogOpen}
              closeDialogBox={this.closeDialogBox}
              archiveNote={this.archiveNote}
              createNotePropsToTools={this.getColor}
              reminder={this.reminderNote}
              trashNote={this.trashNote}
              updateTitle={this.updateTitle}
              updateDescription={this.updateDescription}
            />
          </MuiThemeProvider>
        </div>
      );
    }
  }
}
