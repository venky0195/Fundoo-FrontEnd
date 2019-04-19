import React, { Component } from "react";
import {
  Card,
  MuiThemeProvider,
  createMuiTheme,
  Chip,
  Snackbar,
  IconButton,
  Avatar
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Tools from "../components/Tools";
// import FormDialog from "../components/DialogBox";
import ReminderIcon from "../assets/reminder.svg";

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
export default class ArchivedNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false
    };
    this.cardsToDialog = React.createRef();
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
      console.log("error at handleSnackClose in ArchivedNavigator");
    }
  };

  render() {
    let cardsView1 = this.props.noteProps ? "listCards1" : "cards1";
    return this.props.reminderArray.length > 0 ? (
      <div className="root">
        <MuiThemeProvider theme={theme}>
          <div className="CardsView1" id="CardsView1">
            {this.props.reminderArray.reverse().map(key => {
              return (
                <Card
                  className={cardsView1}
                  style={{
                    backgroundColor: key.color,
                    borderRadius: "8px",
                    border: "1px solid #dadce0"
                  }}
                  id={cardsView1}
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
                      <b> {key.title}</b>

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
                      {key.description}
                    </div>
                    <div style={{ width: "fit-content" }}>
                      {key.reminder ? (
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
                          label={key.reminder}
                          onDelete={() => this.props.reminder("", key._id)}
                        />
                      ) : null}
                    </div>

                    <div id="displaycontentdiv">
                      <Tools
                        createNotePropsToTools={this.props.getColor}
                        note={key}
                        noteID={key._id}
                        reminder={this.props.reminder}
                        trashNote={this.props.trashNote}
                        trashStatus={key.trash}
                        archiveStatus={key.archive}
                        archiveNote={this.props.archiveNote}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          {/* <FormDialog
            ref={this.props.cardsToDialog}
            open={this.props.DialogOpen}
            handleEdit={this.props.handleClick}
            closeDialogBox={this.props.closeDialogBox}
            // note={notesArray[key].note}
            archiveNote={this.props.archiveNote}
            reminder={this.props.reminderNote}
            trashNote={this.props.trashNote}
            // noteID={notesArray[key]._id}
            // archiveStatus={notesArray[key].archive}
            updateTitle={this.props.updateTitle}
            updateDescription={this.props.updateDescription}
            createNotePropsToTools={this.props.getColor}
         />*/}

          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={this.state.openSnackBar}
            autoHideDuration={6000}
            onClose={this.handleSnackClose}
            variant="error"
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id"> Note Unarchived</span>}
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
        </MuiThemeProvider>
      </div>
    ) : (
      <div className="showBackMessage" id="showBackMessagerem">
        <div className="innerdiv">
          <img
            src={ReminderIcon}
            style={{ width: "inherit", opacity: 0.1 }}
            alt="archive note icon"
          />
          <label id="labl" style={{ marginLeft: "-113%" }}>
            Notes with upcoming reminders appear here
          </label>
        </div>
      </div>
    );
  }
}
