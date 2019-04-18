import React, { Component } from "react";
import {
  Card,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import TrashIcon from "../assets/trash.svg";
import MoreOptions from "./MoreOptions";

const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        fontSize: 14,
        marginTop: 20,
        height: 25,
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        padding: 0
      },
      deleteIcon: {
        width: 20,
        height: 20
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
export default class TrashNavigator extends Component {
  constructor(props) {
    super(props);
    this.cardsToDialog = React.createRef();
  }

  render() {
    let cardsView1 = this.props.noteProps ? "listCards1" : "cards1";
    return this.props.trashArray.length > 0 ? (
      <div className="root">
        <MuiThemeProvider theme={theme}>
          <div className="CardsView1" id="CardsView1">
            {this.props.trashArray.reverse().map(key => {
              return (
                <Card
                  className={cardsView1}
                  style={{
                    backgroundColor: key.color,
                    borderRadius: "8px",
                    border: "1px solid #dadce0"
                  }}
                  id={cardsView1}
                >
                  <div id="dispNotes">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        wordBreak: "break-word",
                        fontSize: "0.95rem"
                      }}
                    >
                      <b> {key.title}</b>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        wordBreak: "break-word",
                        fontSize: "0.9rem"
                      }}
                    >
                      {key.description}
                    </div>
                    <div id="displaycontentdiv">
                      <MoreOptions trashNote={this.props.trashNote} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </MuiThemeProvider>
      </div>
    ) : (
      <div className="showBackMessage">
        <div className="innerdiv">
          <img
            src={TrashIcon}
            style={{ width: "inherit", opacity: 0.1 }}
            alt="Trash icon"
          />
          <label id="labl" style={{ marginLeft: "-21%" }}>
            No notes in Trash
          </label>
        </div>
      </div>
    );
  }
}
