import React, { Component } from 'react';
import { Input, Card, createMuiTheme, MuiThemeProvider, Button } from '@material-ui/core'
import "/home/admin1/Fundoo/client/src/App.css"
import { withStyles } from "@material-ui/core";
import "/home/admin1/Fundoo/client/src/services/noteServices.js";
import { createNote } from '/home/admin1/Fundoo/client/src/services/noteServices.js';

const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: "10px",
            },
            elevation1: {
                boxShadow: "0 3px 5px rgba(0,0,0,0.20)"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
class createNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            title: "",
            description: "",
            color: "rgb(255, 255, 255)",
            newNote: {}
        }
    }
    handleTitle = (evt) => {
        try {
            this.setState({ title: evt.target.value })
        } catch (err) {
            console.log("error at handleTitle in createNotes");
        }
    }
    /**
     * @description:it will handle the description event
     * @param {*event for description} evt 
     */
    handleDescription = (evt) => {
        try {
            this.setState({ description: evt.target.value })
        } catch (err) {
            console.log("error at handleDescription in createNotes");
        }
    }

    handleToggle = () => {
        try {
            this.setState({ openNote: !this.state.openNote });
            if (this.state.title !== '' || this.state.description !== '' || this.state.color !== "rgb(255, 255, 255)") {
                const note = {
                    title: this.state.title,
                    description: this.state.description
                }
                createNote(note)
                    .then((result) => {
                        console.log("create note result from back-end---------------->", result.data);
                        this.setState({
                            newNote: result.data.data.note
                        })
                        //  this.props.getNewNote(this.state.newNote)
                    })
                    .catch((error) => {
                        console.log("error is ", error);

                        alert(error);
                    })

                this.setState({
                    title: "",
                    description: "",
                    color: "rgb(255, 255, 255)",
                })
            }
        } catch (err) {
            console.log("error at handleToggle in createNotes");
        }
    }
    render() {
        return (!this.state.openNote ?
            <MuiThemeProvider theme={theme}>

                <div id="createNoteParent">
                    <Card className="createNote">
                        <div className="staticCreateNote">
                            <Input
                                className="noteInputBase"
                                multiline
                                disableUnderline={true}
                                placeholder="Take a note..."
                                id="dummyDescription"
                                readOnly={true}
                                onClick={this.handleToggle}
                                value=""
                            />

                        </div>

                    </Card>
                </div>

            </MuiThemeProvider>
            :
            <MuiThemeProvider theme={theme}>
                <div id="createNoteParent">
                    <Card className="createNote1" style={{ backgroundColor: this.state.color }}>
                        <div className="createNotePinIcon">
                            <div>
                                <Input
                                    className="noteInputBase"
                                    multiline
                                    disableUnderline={true}
                                    id="title"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleTitle}
                                />
                            </div>
                            <div>
                                <Input
                                    className="noteInputBase"
                                    multiline
                                    disableUnderline={true}
                                    placeholder="Take a note..."
                                    id="description"
                                    value={this.state.description}
                                    onChange={this.handleDescription}
                                /></div>

                        </div>
                        <div className="cardToolsClose" >
                    
                      
                            <Button id="CloseBut" onClick={this.handleToggle} >Close</Button>
                        </div>
                    </Card>
                </div>

            </MuiThemeProvider>
        )
    }
}
export default withStyles({ withTheme: true })(createNotes);