import React, { Component } from "react";
import {
  Card,
  MuiThemeProvider,
  createMuiTheme,
  Chip,
  IconButton,
  Avatar
} from "@material-ui/core";
import Tools from "../components/Tools";
import FormDialog from "../components/DialogBox";
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
export default class ArchivedNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DialogOpen: false
    };
    this.cardsToDialog = React.createRef();
  }
  openDialogBox = key => {
    this.cardsToDialog.current.getData(key);

    this.setState({
      DialogOpen: true
    });
  };
  closeDialogBox = () => {
    this.setState({
      DialogOpen: false
    });
  };
  render() {
    let cardsView1 = this.props.noteProps ? "listCards1" : "cards1";
    return this.props.reminderArray.length > 0 ? (
      <div className="root">
        <MuiThemeProvider theme={theme}>
          <div className="CardsView1" id="CardsView1">
            {this.props.reminderArray.reverse().map((key, i) => {
              return (
                <Card
                  className={cardsView1}
                  style={{
                    backgroundColor: key.color,
                    borderRadius: "8px",
                    borderTop: "0.5px solid",
                    borderColor: "#e0e0e0"
                  }}
                  id={cardsView1}
                  key={i}
                >
                  <div id="dispNotes">
                    <div
                      onClick={() => this.openDialogBox(key)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        wordBreak: "break-word",
                        fontSize: "1rem"
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
                      onClick={() => this.openDialogBox(key)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        wordBreak: "break-word",
                        fontSize: "1.125rem"
                      }}
                    >
                      {key.description}
                    </div>
                    <div>
                      {key.reminder ? (
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
                          label={key.reminder}
                          onDelete={() => this.props.reminder("", key._id)}
                        />
                      ) : null}
                      <div style={{ marginTop: "-2%" }}>
                        {key.label.length > 0
                          ? key.label.map((key1, index) => (
                              <Chip
                                style={{
                                  marginTop: "5%",
                                  marginRight: "2%",
                                  maxWidth: "100%"
                                }}
                                key={index}
                                label={key1}
                                onDelete={() =>
                                  this.props.deleteLabelFromNote(key1, key._id)
                                }
                              />
                            ))
                          : null}
                      </div>
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
                        ShowNotification={this.props.ShowNotification}
                        addLabelToNote={this.props.addLabelToNote}
                        deleteLabelFromNote={this.props.deleteLabelFromNote}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <FormDialog
            ref={this.cardsToDialog}
            open={this.state.DialogOpen}
            closeDialogBox={this.closeDialogBox}
            createNotePropsToTools={this.props.getcolor}
            archiveNote={this.props.archiveNote}
            reminder={this.props.reminder}
            trashNote={this.props.trashNote}
            updateTitle={this.props.updateTitle}
            updateDescription={this.props.updateDescription}
            ShowNotification={this.props.ShowNotification}
            addLabelToNote={this.props.addLabelToNote}
            deleteLabelFromNote={this.props.deleteLabelFromNote}
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
