import React, { Component } from "react";
import "../App.css";
import SimpleAppBar from "../components/AppBar.jsx";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core";
import CreateNotes from "../components/CreateNotes";
import DisplayNotes from "../components/DisplayNotes";
const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
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
      slideCards: false,
      cardStyles: false,
      reminder: false,
      archive: false,
      trash: false
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
   * @description:it handles the cards style
   */
  handleCardStyle = () => {
    try {
      this.setState({ cardStyles: !this.state.cardStyles });
    } catch (err) {
      console.log("error at handleCardStyle in dashBoard");
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
  render() {
    const { classes } = this.props;
    const slidingCards = this.state.slideCards ? "afterSlide" : "beforeSlide";
    return (
      <div className={classes.root}>
        <div className={slidingCards}>
          <div>
            <SimpleAppBar
              slideCards={this.slideCards}
              props={this.props}
              notePropsToApp={this.handleCardStyle}
            />
          </div>

          <div id="dashboard">
            <CreateNotes getNewNote={this.getNewNote} />

            <DisplayNotes
              ref={this.noteToCards}
              noteProps={this.state.cardStyles}
            />
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
