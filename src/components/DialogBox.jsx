import React from "react";
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  Input,
  MuiThemeProvider,
  createMuiTheme,
  Chip
} from "@material-ui/core";
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from "@material-ui/core/Slide";
import Tools from "./Tools";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paper: {
        borderRadius: "8px",
        overflowY: "inherit",
        border: "none"
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(208, 207, 207, 0.65)"
      }
    },

    MuiChip: {
      root: {
        fontSize: "11px",
        color: "#3c4043",
        marginTop: 20,
        height: 25,
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        padding: "3px 5px",
        marginRight: "1%"
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
  }
});
export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      note: "",
      _id: "",
      title: "",
      description: "",
      color: "",
      archive: "",
      trash: "",
      label: "",
      modifiedDate: ""
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    // this.getData = this.getData.bind(this);
  }

  async handleClose() {
    await this.props.updateTitle(this.state.title, this.state._id);
    await this.props.updateDescription(this.state.description, this.state._id);
    this.props.closeDialogBox();
  }

  async handleTitle(evt) {
    try {
      await this.setState({ title: evt.target.value });
    } catch (err) {
      console.log("error at handleTitle in dialogBox");
    }
  }
  async handleDescription(evt) {
    try {
      await this.setState({ description: evt.target.value });
    } catch (err) {
      console.log("error at handleDescription in dialogBox");
    }
  }

  getData(note) {
    console.log("note in dialog-->", note);
    console.log("note title in dialog-->", note.title);
    const mDate = new Date(note.updatedAt).toString().split(" ");
    const showDate = mDate[1] + " " + mDate[2];

    this.setState({
      note: note,
      title: note.title,
      description: note.description,
      _id: note._id,
      color: note.color,
      reminder: note.reminder,
      archive: note.archive,
      trash: note.trash,
      label: note.label,
      modifiedDate: showDate
    });
  }
  trashNote = (value, noteId) => {
    this.setState({ trash: value });
    this.props.trashNote(value, noteId);
    this.props.closeDialogBox();
  };
  reminderNote = (value, noteId) => {
    this.setState({ reminder: value });
    this.props.reminder(value, noteId);
  };
  getColor = (value, noteId) => {
    this.setState({ color: value });
    this.props.createNotePropsToTools(value, noteId);
  };
  archiveNote = (value, noteId) => {
    this.props.archiveNote(value, noteId);
    this.props.closeDialogBox();
  };
  async DeleteLabel(label, id) {
    // console.log("Labels are", this.state.label);
    var newArr = this.state.label;
    newArr = newArr.filter(item => item !== label);
    await this.setState({
      label: newArr
    });
    this.props.deleteLabelFromNote(label, id);
  }
  render() {
    const { open } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Dialog
            open={open}
            className="dialog"
            id="dialog"
            TransitionComponent={Transition}
          >
            <div
              className="dialogboxsize"
              style={{
                padding: "16px",
                borderRadius: "8px",
                zIndex: "4001",
                backgroundColor: this.state.color
              }}
            >
              <div className="dialogtest">
                <Input
                  className="noteInputBase"
                  multiline
                  disableUnderline={true}
                  id="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleTitle}
                  style={{ marginLeft: "4px" }}
                />
                <Input
                  className="noteInputBase"
                  multiline
                  disableUnderline={true}
                  id="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleDescription}
                  style={{ marginTop: "-3%" }}
                />
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
                            <img
                              src={require("../assets/clock.svg")}
                              alt="clock"
                            />
                          </IconButton>
                        </Avatar>
                      }
                      label={this.state.reminder}
                      onDelete={() => this.reminderNote("", this.state._id)}
                    />
                  ) : null}
                  {this.state.label.length > 0
                    ? this.state.label.map((key1, index) => (
                        <Chip
                          label={key1}
                          onDelete={() =>
                            this.DeleteLabel(key1, this.state._id)
                          }
                        />
                      ))
                    : null}
                </div>
              </div>
              <div className="updated">Edited {this.state.modifiedDate}</div>
              <div id="displaycontentdiv" />
              <Tools
                noteID={this.state._id}
                archiveNote={this.archiveNote}
                archiveStatus={this.state.archive}
                createNotePropsToTools={this.getColor}
                reminder={this.reminderNote}
                trashNote={this.trashNote}
                trashStatus={this.state.trash}
                ShowNotification={this.props.ShowNotification}
                addLabelToNote={this.props.addLabelToNote}
                deleteLabelFromNote={this.props.deleteLabelFromNote}
              />

              <Button
                id="CloseButtonNote"
                onClick={this.handleClose}
                style={{
                  float: "right",
                  marginTop: "-6%",
                  backgroundColor: "transparent"
                }}
              >
                Close
              </Button>
            </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
