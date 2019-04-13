import React from "react";
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import { Button } from "@material-ui/core";
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  state = {
    open: false
  };

handleClose=()=>{
  this.props.closeDialogBox()
}

  render() {
    const { open } = this.props;
    return (
      <div>
        <Dialog
          open={open}
       
          aria-labelledby="form-dialog-title"
        >
          Hello, this is sample Dialog box
          <Button onClick={this.handleClose}>Close</Button>
        </Dialog>
      </div>
    );
  }
}
