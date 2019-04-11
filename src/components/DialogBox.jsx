import React from "react";
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import CreateNotes from "./CreateNotes";

export default class FormDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.props;
    return (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
    </Button> */}
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <CreateNotes />
        </Dialog>
      </div>
    );
  }
}
