import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import "../App.css";
import { MenuItem, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import EditLabels from "../components/EditLabels";

const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: "flex"
  },
  selected: {},
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: 190,
    marginTop: 56,
    border: "none",
    "overflowY": "auto",
    [theme.breakpoints.up("sm")]: {
      marginTop: 64,
      width: drawerWidth
    }
  },
});

const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      selected: {
        background: 'linear-gradient(to bottom, #feefc3 -5%, #feefc3 -2%);'
      }
    }
  }
});
class PersistentDrawerLeft extends React.Component {
  constructor() {
    super();
    this.state = {
      navigateReminder: false,
      navigateArchived: false,
      navigateTrash: false,
      noteSelect: true,
      reminderSelect: false,
      archiveSelect: false,
      trashSelect: false,
      openEditLabel: false
    };
    this.handleArchived = this.handleArchived.bind(this);
    this.handleTrash = this.handleTrash.bind(this);
  }
  async handleNotes(event) {
    await this.setState({
      navigateReminder: false,
      navigateArchived: false,
      navigateTrash: false,
      noteSelect: true,
      reminderSelect: false,
      archiveSelect: false,
      trashSelect: false
    });
    this.props.drawerClose(event);
    this.props.handleNavigation(
      this.state.navigateReminder,
      this.state.navigateArchived,
      this.state.navigateTrash
    );
  }

  async handleTrash(event) {
    await this.setState({
      navigateTrash: true,
      navigateArchived: false,
      navigateReminder: false,
      noteSelect: false,
      reminderSelect: false,
      archiveSelect: false,
      trashSelect: true
    });
    this.props.drawerClose(event);
    this.props.handleNavigation(
      this.state.navigateReminder,
      this.state.navigateArchived,
      this.state.navigateTrash
    );
  }

  async handleArchived(event) {
    await this.setState({
      navigateArchived: true,
      navigateTrash: false,
      navigateReminder: false,
      noteSelect: false,
      reminderSelect: false,
      archiveSelect: true,
      trashSelect: false
    });
    this.props.drawerClose(event);
    this.props.handleNavigation(
      this.state.navigateReminder,
      this.state.navigateArchived,
      this.state.navigateTrash
    );
  }

  async handleReminder(event) {
    await this.setState({
      navigateReminder: true,
      navigateArchived: false,
      navigateTrash: false,
      noteSelect: false,
      reminderSelect: true,
      archiveSelect: false,
      trashSelect: false
    });
    this.props.drawerClose(event);
    this.props.handleNavigation(
      this.state.navigateReminder,
      this.state.navigateArchived,
      this.state.navigateTrash
    );
  }

  handleEditLabel=()=>{
    try {
      this.setState({
        openEditLabel:true
      })
    } catch (error) {
      console.log(error);
    }
  }
  closeLabelEdit=()=>{
    try {      
      this.setState({
        openEditLabel:false
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Drawer
            id="drawer"
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.props.AppBarProps}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <MenuItem
              className={classes.menuItem}
              id="sideMenu"
              selected={this.state.noteSelect}
              onClick={() => this.handleNotes("Fundoo")}
            >
              <img
                src={require("../assets/Notes.svg")}
                alt="note icon"
                id="NavButton"
              />
              <div className="sampl">Notes</div>
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              id="sideMenu"
              selected={this.state.reminderSelect}
              onClick={() => this.handleReminder("Reminders")}
            >
              <img
                src={require("../assets/reminder.svg")}
                alt="reminder icon"
                id="NavButton"
              />
              <div className="sampl">Reminders</div>
            </MenuItem>
            <Divider />
            <div className="label">labels</div>
            <MenuItem
              className={classes.menuItem}
              id="sideMenu"
              onClick={this.handleEditLabel}
            >
              <img
                src={require("../assets/EditLabel.svg")}
                alt="reminder icon"
                id="NavButton"
              />
              <div className="sampl">Edit labels</div>
            </MenuItem>
            <Divider />
            <MenuItem
              className={classes.menuItem}
              id="sideMenu"
              selected={this.state.archiveSelect}
              onClick={() => this.handleArchived("Archive")}
            >
              <img
                src={require("../assets/archive.svg")}
                alt="reminder icon"
                id="NavButton"
              />
              <div className="sampl">Archive</div>
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              id="sideMenu"
              selected={this.state.trashSelect}
              onClick={() => this.handleTrash("Trash")}
            >
              <img
                src={require("../assets/trash.svg")}
                alt="reminder icon"
                id="NavButton"
              />
              <div className="sampl">Trash</div>
            </MenuItem>
          </Drawer>
          <EditLabels
          open = {this.state.openEditLabel}
          closeLabelEdit={this.closeLabelEdit}/>
        </MuiThemeProvider>
       
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
