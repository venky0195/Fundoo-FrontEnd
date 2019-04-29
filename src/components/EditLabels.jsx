import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Button, Tooltip } from "@material-ui/core";
import { addLabel } from "../services/noteServices";

export default class EditLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      label: ""
    };
  }
  addLabel = label => {
    var data = {
      userID: localStorage.getItem("user_id"),
      label: label
    }
    addLabel(data)
      .then(result => {
        this.setState({
          label: ""
        });
        console.log("addlabel result from back-end", result);
      })
      .catch(error => {
        alert(error);
      });
  };
  onChange = event => {
    this.setState({
      label: event.target.value
    });
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
              <div className="EditLabelTitle">Edit labels</div>
              <div className="CreateNewLabel">
                <input
                  class="LabelInput"
                  maxLength="50"
                  type="text"
                  placeholder="Create new label"
                  value={this.state.label}
                  onChange={this.onChange}
                />
                <Tooltip title="Create Label">
                  <div
                    className="checkLabel" onClick={()=>this.addLabel(this.state.label)}
                  >
                    <img src={require("../assets/tick.svg")} alt="Ok" />{" "}
                  </div>
                </Tooltip>
              </div>
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
