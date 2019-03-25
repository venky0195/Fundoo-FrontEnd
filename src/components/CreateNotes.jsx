import React, { Component } from 'react';
import { Input, Card, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import "../App.css"
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
export default class createNotes extends Component {
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
    handleTitle=(evt)=> {
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
    handleDescription = (evt)=> {
        try {
            this.setState({ description: evt.target.value })
        } catch (err) {
            console.log("error at handleDescription in createNotes");
        }
    }

    handleToggle=() =>{
        try {
            this.setState({ openNote: !this.state.openNote });
            // console.log("pinned", this.state.openNote);
            if (this.state.title !== '' || this.state.description !== '' || this.state.color !== "rgb(255, 255, 255)") {
               

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
        return (this.state.openNote ?  
            <MuiThemeProvider theme={theme}>
                <div id="createNoteParent">
                    <Card className="createNote1" style={{ backgroundColor: this.state.color }}>
                        <div className="createNotePinIcon">
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
                        <Input
                            className="noteInputBase"
                            multiline
                            disableUnderline={true}
                            placeholder="Take a note..."
                            id="description"
                            value={this.state.description}
                            onChange={this.handleDescription}
                        />
                    </Card>
                </div>
            </MuiThemeProvider>
            :
            <MuiThemeProvider theme={theme}>
            <div id="createNoteParent">
                <Card className="createNote">
                    <div className="staticCreateNote">
                        <Input
                            className="noteInputBase1"
                            multiline
                            disableUnderline={true}
                            placeholder="Take a note..."
                            id="description"
                            readOnly={true}
                            onClick={this.handleToggle}
                        />
                    </div>
                </Card>
            </div>
        </MuiThemeProvider>
        
        )
    }
}
