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
import Tools from "../components/Tools";
import {
  getNotes,
  updateColor,
  otherArray,
  setReminder,
  updateArchiveStatus,
  updateTrashStatus
} from "../services/noteServices";

import "../App.css";


const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        fontSize: 14,
        marginTop: 20,
        height: 25,
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        padding: 0,
        display:'flex',
        flexWrap:'wrap'
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
      notes: []
    };
  }
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

  render() {
    let notesArray = otherArray(this.state.notes);
    let cardsView = this.props.noteProps ? "listCards" : "cards";
    console.log(notesArray);

    return (
      <div className="root">
      <MuiThemeProvider theme={theme}>
        <div className="CardsView">
          {Object.keys(notesArray)
            .reverse()
            .map(key => {
              return (
                <div key={key} className="space" >
                  <Card
                    className={cardsView}
                    style={{
                      backgroundColor: notesArray[key].color,
                      borderRadius: "15px",
                      border: "1px solid #dadce0"
                    }}
                  >
                    <div id="dispNotes">
                      <div
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
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          wordBreak: "break-word",
                          fontSize: "0.9rem"
                        }}
                      >
                        {notesArray[key].description}
                      </div>
                      <div>
                        {notesArray[key].reminder ? (
                          <Chip
                            label={notesArray[key].reminder}
                            onDelete={() =>
                              this.reminderNote("", notesArray[key]._id)
                            }
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
      </MuiThemeProvider>
      </div>
    );
  }
}
