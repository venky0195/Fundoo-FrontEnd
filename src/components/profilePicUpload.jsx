import React, { Component } from "react";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { uploadProfilePic } from "../services/userServices";
import { Dialog } from "@material-ui/core";

/* global FileReader */
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: "",
      src: "",
      cropResult: null
    };
  }
  handleClose = () => {
    this.props.onClose();
  };

  onChange = e => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    console.log("files====", files);

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  };

  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    // eslint-disable-next-line
    this.state.cropResult = this.cropper.getCroppedCanvas().toBlob(blob => {
      const formData = new FormData();
      formData.append("image", blob);
      console.log("data is ========================================", formData);
      uploadProfilePic(formData)
        .then(result => {
          console.log("profile", result.data.data);
          localStorage.setItem("profilePic", result.data.data);
          this.props.cropedpic(result.data.data);
          this.setState({
            profilePic: result.data.data
          });
        })
        .catch(err => {
          alert(err);
        });

      //console.log("Cropped result is ", this.state.cropResult);
    });
    this.props.onClose();
  };

  render() {
    const { classes, onClose, ...other } = this.props;
    return (
      <Dialog onClose={this.handleClose} {...other}>
        <div style={{ padding: "5%" }}>
          <input type="file" onChange={this.onChange} />

          <Cropper
            style={{ height: 400, maxWidth: 400 }}
            aspectRatio={4 / 5}
            guides={false}
            src={this.state.src}
            ref={cropper => {
              this.cropper = cropper;
            }}
          />

          <div className="box" style={{ width: "100%", float: "left" }}>
            <button
              disabled={!this.state.src}
              onClick={this.cropImage}
              style={{ float: "right", fontSize: "medium" }}
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>
    );
  }
}
