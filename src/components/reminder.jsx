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
  ClickAwayListener
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
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    var parts = date.target.value.split("T");
    var time = parts[1];
    var splitdate = parts[0].split("-");
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(splitdate[0], splitdate[1] - 1, splitdate[2]);
    var finalDate = mydate.toDateString() + "," + time;
    this.setState({
      startDate: finalDate
    });
    console.log("custom reminder data=====>", finalDate);
    this.props.ShowNotification("Note Status: ", "Reminder set", "success");
    this.props.reminder(finalDate, this.props.noteID);
    this.handleClose();
  }
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
    this.handleClose();

    var date = new Date().toDateString();
    var reminder1 = date + ",20:00";

    console.log("today reminder data=====>", reminder1);
    this.props.ShowNotification("Note Status: ", "Reminder set", "success");
    this.props.reminder(reminder1, this.props.noteID);
  };
  setTomorrowReminder = () => {
    this.handleClose();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
    var date = new Date().toDateString();
    date = date.replace(
      new Date().getDate().toString(),
      new Date().getDate() + 1
    );
    date = date.replace(
      days[new Date().getDay() - 1],
      days[new Date().getDay()]
    );
    var reminder1 = date + ",20:00";
    console.log("tomorow reminder data====>", reminder1);
    this.props.ShowNotification("Note Status: ", "Reminder set", "success");
    this.props.reminder(reminder1, this.props.noteID);
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
                          defaultValue="2017-05-24T10:30"
                          className={classes.textField}
                          onChange={this.handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
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
