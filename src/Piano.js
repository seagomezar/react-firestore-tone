import React, { Component } from 'react';
import './App.css';

class Piano extends Component {

    constructor() {
        super();
    }


    painPiano(allNotes) {
        const alteredNotesLength = ((String(allNotes).match(new RegExp("#", "g")) || []).length);
        const widthPerNote = (window.innerWidth - 25) / (allNotes.length - alteredNotesLength);
        const heightPerNote = 120;
        const blackNotesWidthPortion = 2;
        const blackNotesHeightPortion = 1.6;
        const blackStyle = {
            width : (widthPerNote / blackNotesWidthPortion) + "px",
            height : (heightPerNote / blackNotesHeightPortion) + "px"
        };
        const whiteStyle = {
            width : widthPerNote + "px",
            height : heightPerNote + "px"
        };
        const piano = <ul id="piano">
            {allNotes.map((note) => {
                return (~note.indexOf("#")) ? <li id="note" className="black" style={blackStyle}></li> : <li id="note" className="white" style={whiteStyle}></li>
            })}
        </ul>;

        return piano;
    }

    render() {
        return (
            <div>
                {this.painPiano(this.props.notes)}
            </div>
        );
    }
}

export default Piano;
