import React, { Component } from "react";
import "../App.css";
import SimpleAppBar from '/home/admin1/Fundoo/client/src/components/AppBar.jsx';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { withStyles } from "@material-ui/core";
import CreateNotes from '../components/CreateNotes';
const styles = theme => ({
  root: {
    display: 'flex',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      slideCards: false,
    }
    this.slideCards = this.slideCards.bind(this);
  }

  slideCards() {
    try {
      this.setState({ slideCards: !this.state.slideCards })
    } catch (err) {
      console.log("error at slideCards in dashBoard");
    }
  }
  render() {
    const { classes } = this.props;
    const slidingCards = this.state.slideCards ? "afterSlide" : "beforeSlide"
    return (
      <div className={classes.root}>
      <div className={slidingCards}>

        <div>
          <SimpleAppBar 
            slideCards={this.slideCards}
          />
        </div>
        <div>
        
      <main  className={classNames(classes.content)}>
         <CreateNotes />
          </main>
        </div>
</div>
      </div>

    );
  }
}
DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DashBoard);