/****************************************************************************************
 *  @Purpose        : Creating tools that are required to create a note.
 *  @file           : Tools.jsx       
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 29-03-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import ColorBox from '../components/ColorBox';
import Reminder from '../components/reminder';
export default class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    /**
     * @description:it will toggle color event
     */
    handleToggle = () => {
        try {
            this.setState({ open: !this.state.open });
        } catch (err) {
            console.log("error at handleToggle in tools");
        }
    }
    render() {
        const setNoteTime = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
        return (
            <div>
                <div className="cardTools">
                <Reminder
                handleToggle={this.handleToggle}
                parentToolsProps={setNoteTime}
                reminder={this.props.reminder}
                noteID={this.props.noteID}
            />
                    <ColorBox
                        handleToggle={this.handleToggle}
                        toolsPropsToColorpallete={this.props.createNotePropsToTools}
                        noteID={this.props.noteID}
                    />
                  
                    
                </div>
            </div>
        )
    }
}
