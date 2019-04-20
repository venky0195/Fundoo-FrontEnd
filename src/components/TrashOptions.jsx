/*****************************************************************************************************
 *  @Purpose        : Here we have to do restore and delete forever operations using moreOptions event.
 *  @file           : TrashOptions.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 20-04-2019
 *****************************************************************************************************/
import React, { Component } from "react";
import {
  MenuItem,
  Popper,
  Fade,
  Paper,
  Tooltip,
  ClickAwayListener,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core";
const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        margin: "0px",
        zIndex: "1"
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
export default class TrashOptions extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      open: false,
      placement: null
    };
  }
  /**
     * @description:it will open the more options event and in that 
                    we can select add the labels and delete notes operations
     * @param {*open the more options event} event 
     */
  clickMoreOptions = event => {
    try {
      const { currentTarget } = event;
      this.setState(state => ({
        anchorEl: currentTarget,
        open: !state.open
      }));
    } catch (err) {
      console.log("error at clickMoreOptions in trashOption");
    }
  };
  /**
   * @description:it will close the color popper box
   */
  closeLabelPopper = () => {
    try {
      this.setState({
        open: false
      });
    } catch (err) {
      console.log("error at closeLabelPopper in trashOption");
    }
  };
  handleRestore = () => {
    this.closeLabelPopper();
    this.props.ShowNotification("Note Status: ", "Note Restored", "info");
    this.props.restore(false, this.props.noteID);
  };
  handleDelete = () => {
    this.closeLabelPopper();
    this.props.ShowNotification(
      "Note Status: ",
      "Note Permanently Deleted",
      "danger"
    );

    this.props.deleteNote(this.props.noteID);
  };
  render() {
    const { anchorEl, open } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <div className="iconButton">
            <Tooltip title="More options">
              <img
                src={require("../assets/more_tools.svg")}
                id="ToolButton"
                alt="change color"
                onClick={this.clickMoreOptions}
              />
            </Tooltip>
          </div>
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement={"bottom-start"}
            transition
            style={{ zIndex: 9999 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={0}>
                <Paper className="moreOptionsPopper">
                  <ClickAwayListener
                    onClickAway={() => this.closeLabelPopper()}
                  >
                    <div
                      className="popperMain"
                      style={{
                        width: "fit-content",
                        padding: "5px",
                        marginTop: "14px"
                      }}
                    >
                      <MenuItem onClick={this.handleRestore}>
                        Restore Note
                      </MenuItem>
                      <MenuItem onClick={this.handleDelete}>
                        Delete Forever
                      </MenuItem>
                    </div>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      </MuiThemeProvider>
    );
  }
}
