/*************************************************************************************************************
 *  @Purpose        : Here we set the reminder for note.
 *  @file           : reminder.jsx
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 01-04-2019
 ***************************************************************************************************************/
import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  MenuItem,
  Paper,
  Tooltip,
  ListItem,
  createMuiTheme,
  MuiThemeProvider,
  ClickAwayListener,
  Button
} from "@material-ui/core";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        borderbottomrightradius: 0,
        bordertoprightradius: 0,
        height: "13px",
        marginTop: "8px",
        marginBottom: "8px",
        width: "268px",
        fontSize: "12px",
        borderRadius: "4px"
      }
    },
    MuiPaper: {
      root: {
        zIndex: "1"
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
class reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      placement: null,
      date: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = date => event => {
    this.setState({ [date]: new Date(event.target.value).toLocaleString() });
    console.log("OLD DATE IS ", this.state.date);
  };
  sendDate = event => {
    event.preventDefault();
    this.props.ShowNotification("Note Status: ", "Reminder set", "success");
    this.props.reminder(this.state.date, this.props.noteID);
    this.handleClose();
  };
  /**
   * @description:it handles the onclick on reminder event
   */
  handleClick = placement => event => {
    try {
      const { currentTarget } = event;
      this.setState(state => ({
        anchorEl: currentTarget,
        open: state.placement !== placement || !state.open,
        placement
      }));
    } catch (err) {
      console.log("error at handleClick in reminder");
    }
  };
  /**
   * @description:it handles the close the current event
   */
  handleClose = () => {
    try {
      this.setState(state => ({ open: !state.open }));
    } catch (err) {
      console.log("error at handleClose in reminder");
    }
  };
  setTodayReminder = () => {
    var date11 = new Date().toLocaleDateString();
    var split = date11.split("/");
    //Month in javascript starts from [0], so we are subtracting one.
    split[1] = Number(split[1]) - 1;
    //Creating custom date by passing the values
    var reminder1 = new Date(
      split[2],
      split[1],
      split[0],
      20,
      0,
      0
    ).toLocaleString();
    // console.log("today reminder data=====>", reminder1);
    this.props.ShowNotification("Note Status: ", "Reminder set", "success");
    this.props.reminder(reminder1, this.props.noteID);
    this.handleClose();
  };
  setTomorrowReminder = () => {
    var date11 = new Date().toLocaleDateString();
    var split = date11.split("/");
    //Adding one to the current date for tomorrow reminder
    split[0] = Number(split[0]) + 1;
    //Month in javascript starts from [0], so we are subtracting one.
    split[1] = Number(split[1]) - 1;
    //Creating custom date by passing the values
    var reminder1 = new Date(
      split[2],
      split[1],
      split[0],
      20,
      0,
      0
    ).toLocaleString();

    // console.log("today reminder data=====>", reminder1);
    this.props.ShowNotification("Note Status: ", "Reminder set", "success");
    this.props.reminder(reminder1, this.props.noteID);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    // const setAMPM = this.props.parentToolsProps;
    const { anchorEl, open, placement } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div id="reminderPopper">
          <Tooltip title="Remind me">
            <img
              src={require("../assets/remind_me_tools.svg")}
              id="ToolButton"
              onClick={this.handleClick("bottom-start")}
              alt="remider icon"
            />
          </Tooltip>
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            transition
            style={{ zIndex: 5003, width: "25%" }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper id="reminderPopper">
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <div>
                      <ListItem className="listRemindr">Reminder:</ListItem>
                      <MenuItem
                        className="currentDate"
                        onClick={() => this.setTodayReminder()}
                      >
                        <div>Later today</div>
                        <div className="rightpm">8:00 PM</div>
                      </MenuItem>
                      <MenuItem
                        className="currentDate"
                        onClick={() => this.setTomorrowReminder()}
                      >
                        <div>Tomorrow </div>
                        <div className="rightpm">8:00 PM</div>
                      </MenuItem>

                      <form className={classes.container} noValidate>
                        <TextField
                          style={{ marginLeft: "3%" }}
                          id="datetime-local"
                          label="Custom date"
                          type="datetime-local"
                          defaultValue="2019-04-26T10:30"
                          className={classes.textField}
                          onChange={this.handleChange("date")}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                        <Button
                          style={{
                            marginTop: "3%",
                            marginLeft: "2%",
                            textTransform: "none"
                          }}
                          onClick={this.sendDate}
                        >
                          Save
                        </Button>
                      </form>
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
export default withStyles(styles)(reminder);
