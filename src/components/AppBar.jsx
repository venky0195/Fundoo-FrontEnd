import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import "../App.css"
import Drawer from './Drawer';
import { Tooltip } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  search: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.10),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 6,
      width: 700,
      height: 40
    },
  },
  searchIcon: {
    opacity: .70,
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 450,
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleRefresh = event => {
    event.preventDefault();
    window.location.reload();
  }

  handleToggle = event => {
    this.props.slideCards();
    this.setState({ open: !this.state.open })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div >
          <AppBar position="fixed" className={classes.appBar} color="default" id="AppBar">
            <Toolbar>
              <IconButton className={classes.menuButton} id="Button" onClick={this.handleToggle} >
                <Tooltip title="Main menu">
                  <MenuIcon /></Tooltip>
              </IconButton>
              <img
                className="logoD"
                src={require("../assets/keep_48dp.png")}
                alt="Fundoo"
              />
              <Typography className={classes.title} id="fontss" noWrap>
                Fundoo
            </Typography>
              <div className={classes.search} >
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search"
                  classes={{
                    input: classes.inputInput,
                  }}
                />
              </div>
              <div className="ToolBarIcons">
                <IconButton
                  onClick={this.handleRefresh}
                  color="inherit"
                  id="Button1"
                >
                  <Tooltip title="Refresh">
                    <img
                      src={require("../assets/refresh.svg")}
                      alt="Refresh"
                    />
                  </Tooltip>
                </IconButton></div>
              <IconButton
                onClick={this.handleView}
                color="inherit"
                id="Button"
              >
                <Tooltip title="List view">
                  <img
                    src={require("../assets/listView.svg")}
                    alt="List view"
                  />
                </Tooltip>
              </IconButton>

              <IconButton
                onClick={this.handleSettings}
                color="inherit"
                id="Button"
              >
                <Tooltip title="Settings">
                  <img
                    src={require("../assets/settings.svg")}
                    alt="Settings"
                  />
                </Tooltip>
              </IconButton>
              
              <div className={classes.grow} id="grow" />
              <IconButton
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
                id="Button"
              >
                <Tooltip title="Fundoo account">
                  <AccountCircle />
                </Tooltip>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Drawer
            AppBarProps={this.state.open}
          />
        </div>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);