import React, { Component } from "react";
import {
  Card,
  MuiThemeProvider,
  createMuiTheme,
  Chip,
} from "@material-ui/core";
import TrashIcon from "../assets/trash.svg";
import TrashOptions from '../components/TrashOptions';

const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        fontSize: "11px",
        color: "#3c4043",
        marginTop: 20,
        height: 25,
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        padding: "3px 5px"
      },
      deleteIcon: {
        width: 14,
        height: 14,
        margin: 0,
      },
      label: {
        color: "#3c4043",
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontSize: "11px",
        margin: "0 6px",
        padding: "1px",
        paddingLeft:0,
        paddingRight:0,
        marginRight: 0
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
            {this.props.trashArray.reverse().map((key, i) => {
              return (
                <Card
                  className={cardsView1}
                  style={{
                    backgroundColor: key.color,
                    borderRadius: "8px",
                    borderTop: "0.5px solid",
                    borderColor:"#e0e0e0"
                  }}
                  id={cardsView1}
                  key={i}
                >
                  <div id="dispNotes">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        wordBreak: "break-word",
                        fontSize: "1rem"
                      }}
                    >
                      <b> {key.title}</b>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        wordBreak: "break-word",
                        fontSize: "1.125rem"
                      }}
                    >
                      {key.description}
                    </div>
                    <div style={{marginTop: "-2%"}}>
                    {key.label.length > 0
                      ? key.label.map((key1, index) => (
                          <Chip
                            style={{
                              marginTop: "5%",
                              marginRight: "2%",
                              maxWidth: "100%"
                            }}
                            label={key1}
                            
                          />
                        ))
                      : null}
                  </div>
                    <div id="displaycontentdiv">
                    <TrashOptions
                    restore={this.props.trashNote}
                    noteID={key._id}
                    deleteNote={this.props.deleteNote}
                    ShowNotification={this.props.ShowNotification}
                />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </MuiThemeProvider>
      </div>
    ) : (
      <div className="showBackMessage" id="showBackMessage">
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
