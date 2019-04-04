import React, { Component } from "react";
import "../App.css";
import SimpleAppBar from "../components/AppBar.jsx";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core";
import CreateNotes from "../components/CreateNotes";
import DisplayNotes from "../components/DisplayNotes";
const styles = theme => ({
  root: {
    display: "flex"
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
});

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideCards: false
    };

    this.noteToCards = React.createRef();
  }

  slideCards = () => {
    try {
      this.setState({ slideCards: !this.state.slideCards });
    } catch (err) {
      console.log("error at slideCards in dashBoard");
    }
  };
  /**
   * @description:it display the new note
   * @param {*get new card or note} newCard
   */
  getNewNote = newCard => {
    console.log("new card", newCard);

    try {
      this.noteToCards.current.displayNewCard(newCard);
    } catch (err) {
      console.log("error at getNewNote in dashBoard");
    }
  };
  // componentWillMount=()=> {
  //   const history = this.props.history; // you'll have this available
  //   // You have your user information, probably from the state
  //   // We let the user in only if the role is 'admin'
  //   if (localStorage.getItem("token")===null) {
  //     history.push('/login'); // redirects the user to '/'
  //   }
  // }
  render() {
    const { classes } = this.props;
    const slidingCards = this.state.slideCards ? "afterSlide" : "beforeSlide";
    return (
      <div className={classes.root}>
        <div className={slidingCards}>
          <div id="appBarDashBoard">
            <SimpleAppBar slideCards={this.slideCards} props={this.props} />
          </div>

          <div className="notee">
            <CreateNotes getNewNote={this.getNewNote} />
            <div className="displayyNotes">
              <DisplayNotes ref={this.noteToCards} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(DashBoard);
