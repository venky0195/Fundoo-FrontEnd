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
import TrashNavigator from "../components/TrashNavigator";
import ReminderNavigator from "../components/ReminderNavigator";
import displayNoteIcon from "../assets/displayNotes.svg";
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
  archiveArray,
  trashArray,
  deleteNoteForever,
  saveLabelToNote,
  reminderArray,
  deleteLabelToNote
} from "../services/noteServices";

import "../App.css";

import FormDialog from "./DialogBox";
import IconButton from "@material-ui/core/IconButton";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {} from "../services/noteServices";
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

function getNotif(data) {
  const details = data.notification;
  //k Card.addNotification(details.title,details.body, "success" )
  console.log("Data is=== ", details);
  alert(
    "Reminder alert: Title: " + details.title + "Description: " + details.body
  );
}
export { getNotif };
export default class Cards extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      DialogOpen: false
    };
    this.cardsToDialog = React.createRef();
    this.notificationDOMRef = React.createRef();
  }

  addLabelToNote = (noteId, value) => {
    let newArray = this.state.notes;
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].label.includes(value)) {
        //this.addNotification("Label Status", "Already exist", "danger");
        this.deleteLabelFromNote(value, newArray[i]._id);
        break;
      }
    }
    const addLabel = {
      noteID: noteId,
      label: value
    };
    saveLabelToNote(addLabel)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].label = result.data.data;
            this.setState({
              notes: newArray
            });
          }
          //console.log("hjasdgfjausdg=======",newArray[i]);

          // if(newArray[i].label.includes(value)){

          //   this.deleteLabelFromNote(value, newArray[i]._id)
          // }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  deleteLabelFromNote = (label, noteId) => {
    const deleteLabel = {
      label: label,
      noteID: noteId
    };
    deleteLabelToNote(deleteLabel)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].label = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

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
        // newArray.forEach(function(value){
        //   if(value._id===noteId){
        //     value.color = result.data.data;
        //     this.setState({
        //       notes: value
        //     });
        //   }
        // })
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
    if (value === "") {
      this.addNotification("Reminder Status: ", "Reminder Deleted", "danger");
    }
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
            newArray[i].archive = false;
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
  deleteNote = noteId => {
    const obj = {
      noteID: noteId
    };
    deleteNoteForever(obj)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === obj.noteID) {
            newArray.splice(i, 1);
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
        // alert(error)
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

  getNotificationFromBack = data => {
    console.log("Data is ", data);
  };

  render() {
    let notesArray = otherArray(this.state.notes);
    //  console.log("Notes are==>",notesArray);
    if (this.props.navigateArchived) {
      return (
        <div>
          <ReactNotification ref={this.notificationDOMRef} />
          <ArchivedNavigator
            archiveArray={archiveArray(this.state.notes)}
            othersArray={otherArray}
            getColor={this.getColor}
            noteProps={this.props.noteProps}
            reminder={this.reminderNote}
            trashNote={this.trashNote}
            archiveNote={this.archiveNote}
            ShowNotification={this.addNotification}
            updateTitle={this.updateTitle}
            updateDescription={this.updateDescription}
            addLabelToNote={this.addLabelToNote}
            deleteLabelFromNote={this.deleteLabelFromNote}
          />
        </div>
      );
    } else if (this.props.navigateTrash) {
      return (
        <div>
          <ReactNotification ref={this.notificationDOMRef} />
          <TrashNavigator
            trashArray={trashArray(this.state.notes)}
            othersArray={otherArray}
            getColor={this.getColor}
            noteProps={this.props.noteProps}
            reminder={this.reminderNote}
            trashNote={this.trashNote}
            deleteNote={this.deleteNote}
            archiveNote={this.archiveNote}
            ShowNotification={this.addNotification}
            deleteLabelFromNote={this.deleteLabelFromNote}
          />
        </div>
      );
    } else if (this.props.navigateReminder) {
      return (
        <div>
          <ReactNotification ref={this.notificationDOMRef} />
          <ReminderNavigator
            reminderArray={reminderArray(this.state.notes)}
            othersArray={otherArray}
            getColor={this.getColor}
            noteProps={this.props.noteProps}
            reminder={this.reminderNote}
            trashNote={this.trashNote}
            archiveNote={this.archiveNote}
            ShowNotification={this.addNotification}
            updateTitle={this.updateTitle}
            updateDescription={this.updateDescription}
            addLabelToNote={this.addLabelToNote}
            deleteLabelFromNote={this.deleteLabelFromNote}
          />
        </div>
      );
    } else if (notesArray.length < 1) {
      return (
        <div>
          <div className="showBackMessageMain" style={{ marginTop: "15%" }}>
            <div className="innerdiv">
              <img
                src={displayNoteIcon}
                style={{ width: "inherit", opacity: 0.1 }}
                alt="Trash icon"
              />
              <label id="labl" style={{ marginLeft: "-52%" }}>
                Notes you add appear here
              </label>
            </div>
          </div>
        </div>
      );
    } else {
      let cardsView = this.props.noteProps ? "listCards" : "cards";
      return (
        <div className="root" id="root">
          <ReactNotification ref={this.notificationDOMRef} />
          <MuiThemeProvider theme={theme}>
            <div className="CardsView">
              {Object.keys(notesArray)
                .reverse()
                .map(key => {
                  return (
                    <div style={{ height: "fit-content" }} key={key}>
                      <Card
                        className={cardsView}
                        style={{
                          backgroundColor: notesArray[key].color,
                          borderRadius: "8px",
                          borderTop: "0.5px solid",
                          borderColor: "#e0e0e0"
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
                              fontSize: "1rem"
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
                              fontSize: "1.125rem"
                            }}
                          >
                            {notesArray[key].description}
                          </div>
                          <div>
                            {notesArray[key].reminder ? (
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
                              />
                            ) : null}
                            <div style={{ marginTop: "-2%" }}>
                              {notesArray[key].label.length > 0
                                ? notesArray[key].label.map((key1, index) => (
                                    <Chip
                                      key={index}
                                      style={{
                                        marginTop: "5%",
                                        marginRight: "2%",
                                        maxWidth: "100%"
                                      }}
                                      label={key1}
                                      onDelete={() =>
                                        this.deleteLabelFromNote(
                                          key1,
                                          notesArray[key]._id
                                        )
                                      }
                                    />
                                  ))
                                : null}
                            </div>
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
                              ShowNotification={this.addNotification}
                              addLabelToNote={this.addLabelToNote}
                              deleteLabelFromNote={this.deleteLabelFromNote}
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
              ShowNotification={this.addNotification}
              addLabelToNote={this.addLabelToNote}
              deleteLabelFromNote={this.deleteLabelFromNote}
            />
          </MuiThemeProvider>
        </div>
      );
    }
  }
}
