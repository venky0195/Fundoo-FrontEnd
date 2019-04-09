/*******************************************************************************************************
 *  @Purpose        : Here we have to create the cards view for displaying cards in list and grid view.
 *  @file           : cardsView.jsx       
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 08-03-2019
 *******************************************************************************************************/
import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

export default class cardsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: false
        }
    }
    /**
     * @description:it handle the list and grid view event
     * @param {*event for viewing the cardViewIcon} evt 
     */
    handleCardsView=(event) =>{
        try {
            event.preventDefault();
            this.setState({ view: !this.state.view });
            this.props.appPropstoCardsView();
        } catch (err) {
            console.log("error at handleCardsView in cardsView");
        }
    }
    render() {
        return (
            this.state.view ?
                <div>
                    <IconButton id="ButtonView">
                        <Tooltip title="List View" onClick={this.handleCardsView}>
                            <img src={require('../assets/listView.svg')} alt="grid icon" />
                        </Tooltip>
                    </IconButton>
                </div>
                :
                <div>
                    <IconButton id="ButtonView">
                        <Tooltip title="Grid View" onClick={this.handleCardsView}>
                            <img src={require('../assets/gridView.svg')} alt="grid icon" />
                        </Tooltip>
                    </IconButton>
                </div>

        )

    }
}
