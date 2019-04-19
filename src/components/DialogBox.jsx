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
        height: "30px",
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        marginTop: "15px"
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
      trash: ""
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
    this.setState({
      note: note,
      title: note.title,
      description: note.description,
      _id: note._id,
      color: note.color,
      reminder: note.reminder,
      archive: note.archive,
      trash: note.trash
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
            <div className="dialogboxsize"
              style={{
                padding: "16px",
                borderRadius: "8px",
                zIndex: "4001",
                backgroundColor: this.state.color
              }}
            >
              <Input
                className="noteInputBase"
                multiline
                disableUnderline={true}
                id="title"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleTitle}
              />
              <Input
                className="noteInputBase"
                multiline
                disableUnderline={true}
                id="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.handleDescription}
              />
              <div>
                {this.state.reminder ? (
                  <Chip
                    avatar={
                      <Avatar
                        style={{
                          width: "24px",
                          height: "24px",
                          backgroundColor: "transparent",
                          
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
              </div>
              <div id="displaycontentdiv" />
              <Tools
                noteID={this.state._id}
                archiveNote={this.archiveNote}
                archiveStatus={this.state.archive}
                createNotePropsToTools={this.getColor}
                reminder={this.reminderNote}
                trashNote={this.trashNote}
                trashStatus={this.state.trash}
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
