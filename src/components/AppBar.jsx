import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import "../App.css";
import Drawer from "../components/Drawer.jsx";
import Popper from "../components/popper.jsx";
import { Tooltip } from "@material-ui/core";
import CardsView from "./CardsView";

const styles = theme => ({
  root: {
    width: "100%"
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 5
  },
  search: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 70,
      width: 700,
      height: 40
    }
  },
  searchIcon: {
    opacity: 0.7,
    width: "fit-content",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "15px"
  },

  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: "47px",
    marginLeft: "5%",
    marginTop: "3px",
    transition: theme.transitions.create("width"),
    width: "100%"
  }
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ProfileOpen: false
    };
  }

  handleRefresh = event => {
    event.preventDefault();
    window.location.reload();
  };

  handleAppbar = () => {
    this.props.notePropsToApp();
  };
  handleToggle = event => {
    this.props.slideCards();
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <AppBar
            position="fixed"
            className={classes.appBar}
            color="default"
            id="AppBar"
          >
            <Toolbar style={{ paddingRight: 2 }}>
              <IconButton
                className={classes.menuButton}
                id="Button"
                onClick={this.handleToggle}
              >
                <Tooltip title="Main menu">
                  <MenuIcon />
                </Tooltip>
              </IconButton>

              <img
                className="logoD"
                src={require("../assets/keep_48dp.png")}
                alt="Fundoo"
              />
              <div className="titl">
                <Typography className={classes.title} id="fontss" noWrap>
                  Fundoo
                </Typography>
              </div>

              <div className={classes.search} id="searchBar">
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search"
                  classes={{
                    input: classes.inputInput
                  }}
                  style={{ width: "100%" }}
                />
              </div>

              <div className="ToolBarIcons">
                <IconButton
                  onClick={this.handleRefresh}
                  color="inherit"
                  id="Button1"
                  style={{ backgroundColor: "transparent" }}
                >
                  <Tooltip title="Refresh">
                    <img src={require("../assets/refresh.svg")} alt="Refresh" />
                  </Tooltip>
                </IconButton>
              </div>

              <div className="appList">
                <CardsView appPropstoCardsView={this.handleAppbar} />
              </div>
              <IconButton
                aria-haspopup="true"
                color="inherit"
                id="AccountButton"
              >
                <Tooltip title="Fundoo account">
                  <Popper props={this.props} />
                </Tooltip>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Drawer AppBarProps={this.state.open} />
        </div>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
