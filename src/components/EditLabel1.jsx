import React, { Component } from "react";
import { Dialog, Tooltip, Button, TextField } from "@material-ui/core";
import { addLabel, deleteLabel, updateLabel } from "../services/noteServices";
//import SnackBar from '../components/snackbar';

let displayErr = "";
export default class EditLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      labelID: "",
      editLabel: ""
    };
    //this.openSnackBar = React.createRef();
  }

  addLabel = label => {
    var data = {
      userID: localStorage.getItem("user_id"),
      label: label
    };
    if (data.label !== "") {
      addLabel(data)
        .then(result => {
          this.setState({
            label: ""
          });
          this.props.showLabels(result.data.data);
          console.log("addlabel result from back-end", result);
        })
        .catch(error => {
          this.setState({
            label: ""
          });
          alert(error);
        });
    } else {
      console.log("NOTIFYYY");
    }
  };

  deleteLabel = value => {
    const labelId = {
      labelID: value
    };
    deleteLabel(labelId)
      .then(async result => {
        if (result.data.status) {
          console.log("label result", result);
          let newArray = this.props.label;
          for (let i = 0; i < newArray.length; i++) {
            if (newArray[i]._id === labelId.labelID) {
              newArray.splice(i, 1);
              this.props.newLabels(newArray);
              this.setState({ labelID: "" });
            }
          }
        } else {
          console.log("error");
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  editLabel = (Label, id) => {
    const editLabel = {
      editLabel: Label,
      labelID: id
    };
    updateLabel(editLabel)
      .then(result => {
        console.log("success", result.data, this.props.label);
        let newArray = this.props.label;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === editLabel.labelID) {
            newArray[i].label = result.data.data.editLabel;
            this.props.newLabels(newArray);
            this.setState({ labelID: "" });
          }
        }
      })
      .catch(error => {
        displayErr = error.message;
        // displayErr = "make some changes"
        console.log("message", displayErr);
        //this.openSnackBar.current.handleClick();
      });
  };
  createLabel = () => {
    this.setState({ labelID: "" });
  };
  handlEditLabel = evt => {
    this.setState({ editLabel: evt.target.value });
  };
  changeLables = id => {
    this.setState({ labelID: id });
  };
  handleLabel = evt => {
    this.setState({ label: evt.target.value });
  };
  handleToggle = () => {
    this.props.labelToggle();
  };

  render() {
    const { open } = this.props;
    return (
      <div>
        <Dialog open={open} onClose={this.props.closeLabelEdit}>
          <div
            style={{
              zIndex: "5001",
              backgroundColor: "#fff",
              width: "300px"
            }}
          >
            <div className="EditLabels">
              <div className="EditLabelTitle">Edit Labels</div>
              <div
                className="CreateNewLabel"
                onClick={() => this.createLabel()}
              >
                <input
                  className="LabelInput"
                  maxLength="50"
                  type="text"
                  placeholder="Create new label"
                  value={this.state.label}
                  onChange={this.handleLabel}
                />
                <Tooltip title="Create Label">
                  <div
                    className="checkLabel"
                    onClick={() => this.addLabel(this.state.label)}
                  >
                    <img src={require("../assets/tick.svg")} alt="Ok" />{" "}
                  </div>
                </Tooltip>
              </div>
              {this.props.label.map((key, i) =>
                this.state.labelID !== key._id ? (
                  <div
                    key={i}
                    style={{
                      display: "inline-flex",
                      width: "-webkit-fill-available",
                      marginTop: "3%"
                    }}
                    onClick={() => this.changeLables(key._id)}
                  >
                    <div className="DeleteIconLabel">
                      <img
                        src={require("../assets/beforeLabel.svg")}
                        alt="show label icon"
                      />
                    </div>
                    <div className="LabelInput">{key.label}</div>
                    <div className="DeleteIconLabel">
                      <img
                        src={require("../assets/renameLabel.svg")}
                        alt="rename label icon"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="CreateNewLabel" key = {i}>
                    <Tooltip title="Delete Label">
                      <div
                        className="DeleteIconLabel"
                        onClick={() => this.deleteLabel(key._id)}
                      >
                        <img
                          src={require("../assets/deleteLabel.svg")}
                          alt="Delete label"
                        />
                      </div>
                    </Tooltip>

                    <TextField
                      id="check"
                      defaultValue={key.label}
                      onChange={this.handlEditLabel}
                      style={{ marginLeft: "5%" }}
                      placeholder="Enter label name"
                    />
                    <Tooltip title="Update changes">
                      <div className="checkLabel">
                        <img
                          src={require("../assets/tick.svg")}
                          alt="label tick icon"
                          onClick={() =>
                            this.editLabel(this.state.editLabel, key._id)
                          }
                        />
                      </div>
                    </Tooltip>
                  </div>
                )
              )}
            </div>

            <div className="DoneLabel">
              <Button onClick={this.props.closeLabelEdit} id="ButtonLabel">
                Done
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
