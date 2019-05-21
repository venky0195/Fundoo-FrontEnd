import React, { Component } from "react";
import {
  MenuItem,
  Popper,
  Paper,
  Fade,
  Checkbox
  //ClickAwayListener
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getLabels } from "../services/noteServices";
export default class AddLabelsOnNote extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      open: false,
      label: [],
      checkvalue: false,
      labelName: ""
    };
  }
  addLabelPopup = () => {
    this.setState(state => ({
      anchorEl: this.props.anchorEl,
      open: !state.open
    }));
  };
  componentDidMount() {
    getLabels()
      .then(result => {
        this.setState({
          label: result.data.data
        });
        // console.log("getLabels result from back-end", result);
      })

      .catch(error => {
        console.log("ERROR", error);

        // alert(error)
      });
  }

  showLabels = value => {
    // console.log("show lablesssssssssss",value);
    this.setState({
      label: [...this.state.label, value]
    });
  };
  closeLabelPopper = () => {
    this.setState({
      open: false
    });
  };
  selectLabel(noteID, label) {
    this.setState(state => ({ checkvalue: !state.checkvalue }));

    //this.props.addLabel(key, label)

    this.props.addLabelToNote(noteID, label);
  }
  // handleSearch=(val)=>{

  // }
  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked });
  // };
  // handleFocus = (event) => {event.target.select()}
  render() {
    let displayLabels = this.state.label;
    if (this.state.label !== "") {
      displayLabels = this.state.label
        .filter(x => x.label.includes(this.state.labelName))
        .reverse()
        .map((key, i) => (
          <MenuItem id="DisplayLabelsMenuItem" key={i}>
            <Checkbox
              color="primary"
              className="LabelCheckBox"
              onClick={() => this.selectLabel(this.props.noteID, key.label)}
              // icon = {<img src = {require("../assets/checkIcon.svg")} style={{width:18, height:18}} alt="check"></img>}
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              value="checkvalue"
              // onChange={this.handleChange('checkvalue')}
            />
            <div id="LabelNameCheckBox">{key.label}</div>
          </MenuItem>
        ));
    }
    const { anchorEl, open } = this.state;
    return (
      // <ClickAwayListener onClickAway={() => this.closeLabelPopper()}>
      <div>
        <Popper
          className="LabelPop"
          open={open}
          anchorEl={anchorEl}
          style={{ zIndex: 5003, marginLeft: "1%" }}
          placement={"right"}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={0}>
              <Paper
                className="moreOptionsPopper"
                style={{ paddingTop: "10px" }}
              >
                <div className="LabelPopHead">
                  Label Note
                  <div
                    className="closeLabelPop"
                    onClick={this.closeLabelPopper}
                  >
                    <img src={require("../assets/close.svg")} alt="close" />{" "}
                  </div>
                </div>
                <div className="LabelSearch">
                  <div className="SearchIconLabel">
                    <img
                      src={require("../assets/labelSearch.svg")}
                      alt="Search Label"
                    />
                  </div>
                  <input
                    className="LabelSearchInput"
                    id="LabelSearchInput"
                    maxLength="50"
                    placeholder="Enter label name"
                    value={this.state.labelName}
                    // onkeyup={this.handleSearch}
                    onChange={e => {
                      this.setState({ labelName: e.target.value });
                    }}
                  />
                </div>
                <div className="DisplayLabelsPopper">{displayLabels}</div>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
      // </ClickAwayListener>
    );
  }
}
