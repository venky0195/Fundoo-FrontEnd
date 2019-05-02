import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Button, Tooltip } from "@material-ui/core";
import { addLabel, deleteLabel } from "../services/noteServices";

export default class EditLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      label: "",
      updatedLabel: "",
      labelID: ""
    };
  }

  addLabel = label => {
    var data = {
      userID: localStorage.getItem("user_id"),
      label: label
    };
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
  };

  onUpdateChange = event => {
    this.setState({
      updatedLabel: event.target.value
    });
  };

  onChange = event => {
    this.setState({
      label: event.target.value
    });
  };
  deleteLabel(value) {
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
  }
 
  render() {
    let displayLabels = this.props.label;
    if (this.props.label !== "") {
      displayLabels = this.props.label.map(key => (
        <div className="CreateNewLabel">
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
          <input
          id="check"
            class="LabelInput"
            maxLength="50"
            type="text"
            placeholder="Enter label name"
            defaultValue={key.label}
            onChange={this.onUpdateChange}
          />
          <Tooltip title="Rename Label">
            <div
              className="updateIconLabel"
              // onClick={() => this.addLabel(this.state.label)}
            />
          </Tooltip>
        </div>
      ));
    }
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
              <div className="EditLabelTitle">Edit labels</div>
              <div className="CreateNewLabel">
                <input
                id="check"
                  class="LabelInput"
                  maxLength="50"
                  type="text"
                  placeholder="Create new label"
                  value={this.state.label}
                  onChange={this.onChange}
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
              <div>{displayLabels}</div>
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
