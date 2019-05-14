import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import "../App.css";
import { MenuItem, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import EditLabels from "../components/EditLabel1";
import { getLabels } from "../services/noteServices";

const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: "flex"
  },
  selected: {},
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: 190,
    marginTop: 56,
    border: "none",
    minHeight: 500,
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      marginTop: 64,
      width: drawerWidth
    }
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      selected: {
        background: "linear-gradient(to bottom, #feefc3 -5%, #feefc3 -2%);"
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
      labelSelect: false,
      archiveSelect: false,
      trashSelect: false,
      openEditLabel: false,
      label: []
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
      labelSelect: false,
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
      labelSelect: false,
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
      labelSelect: false,
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
      labelSelect: false,
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
  componentDidMount() {
    getLabels()
      .then(result => {
        console.log("getLabels result from back-end", result.data.data);
        this.setState({
          label: result.data.data
        });
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }

  handleEditLabel = () => {
    try {
      this.setState({
        openEditLabel: true,
        noteSelect: false,
        reminderSelect: false,
        labelSelect: true,
        archiveSelect: false,
        trashSelect: false
      });
    } catch (error) {
      console.log(error);
    }
  };
  closeLabelEdit = () => {
    try {
      this.setState({
        openEditLabel: false
      });
    } catch (error) {
      console.log(error);
    }
  };
  newLabels = value => {
    this.setState({ label: value });
  };
  showLabels = value => {
    let labelArr = this.state.label;
    if (value !== undefined) {
      labelArr.push(value);
      this.setState({ label: labelArr });
    }
  };

  render() {
    const { classes } = this.props;
    let displayLabels = this.state.label;
    if (this.state.label !== "") {
      displayLabels = this.state.label.map((key,i) => (
        <MenuItem
          className={classes.menuItem}
          id="sideMenu" //onClick={() => this.displaySearchLabels(key.label)}
          key={i}
        >
          <img
            src={require("../assets/ShowLabel.svg")}
            alt="note icon"
            id="NavButton"
          />
          <div className="sampl">{key.label}</div>
        </MenuItem>
      ));
    }

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
              style={{ marginTop: "3%" }}
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

            <div id="showLabelDrawer">{displayLabels.reverse()}</div>
            <MenuItem
              className={classes.menuItem}
              id="sideMenu"
              onClick={this.handleEditLabel}
              selected={this.state.labelSelect}
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
            open={this.state.openEditLabel}
            closeLabelEdit={this.closeLabelEdit}
            newLabels={this.newLabels}
            label={this.state.label}
            showLabels={this.showLabels}
          />
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
