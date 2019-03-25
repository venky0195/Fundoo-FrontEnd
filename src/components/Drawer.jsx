import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import "../App.css"
import { MenuItem } from '@material-ui/core';

const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: 'flex',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 70,
    border: "none"
  },
  menuItem: {
    '&:focus': {
      backgroundColor: "#feefc3",
    },
  }

});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
  };
  handleNotes = (e) => {
    this.setState({
      open: false
    })
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <Drawer
        id="drawer"
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.AppBarProps}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <MenuItem className={classes.menuItem} id="sideMenu" onClick={() => this.handleNotes()}>
            <img src={require('../assets/Notes.svg')} alt="note icon"
            />
            <div className="sampl">Notes</div>
          </MenuItem>
          <MenuItem className={classes.menuItem} id="sideMenu" onClick={() => this.handleNotes()}>
            <img src={require('../assets/reminder.svg')} alt="reminder icon"
            />
            <div className="sampl">Reminders</div>
          </MenuItem>
          <Divider />
          <div className="label">labels</div>
          <MenuItem className={classes.menuItem} id="sideMenu" onClick={() => this.handleNotes()}>
            <img src={require('../assets/EditLabel.svg')} alt="reminder icon"
            />
            <div className="sampl">Edit labels</div>
          </MenuItem>
          <Divider />
          <MenuItem className={classes.menuItem} id="sideMenu" onClick={() => this.handleNotes()}>
            <img src={require('../assets/archive.svg')} alt="reminder icon"
            />
            <div className="sampl">Archive</div>
          </MenuItem>
          <MenuItem className={classes.menuItem} id="sideMenu" onClick={() => this.handleNotes()}>
            <img src={require('../assets/trash.svg')} alt="reminder icon"
            />
            <div className="sampl">Trash</div>
          </MenuItem>

        </Drawer>

      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);