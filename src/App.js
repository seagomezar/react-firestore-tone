import React, { Component } from 'react';
import './App.css';
import Tone from 'tone';
import database from './firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      allNotes: null
    };

    this.databaseRef = database.collection("notes").doc("Re0fdrkQs2J1VdRmesgV");

  }
  componentDidMount() {

    this.databaseRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data().notes);
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  }

  paintPiano() {
    
    const piano = document.getElementById("piano");

    const widthPerNote = window.innerWidth / (this.state.allNotes.length - 25);
    const heightPerNote = 120;

    const blackNotesWidthPortion = 2;
    const blackNotesHeightPortion = 1.6;

    this.state.allNotes.forEach((note) => {

      const node = document.createElement("li");
      node.setAttribute("id", note);

      if (~note.indexOf("#")) {
        node.className = "black";
        node.style.width = (widthPerNote / blackNotesWidthPortion) + "px";
        node.style.height = (heightPerNote / blackNotesHeightPortion) + "px";
      } else {
        node.className = "white";
        node.style.width = widthPerNote + "px";
        node.style.height = heightPerNote + "px";
      }

      piano.appendChild(node);
    });

  }

  render() {
    return (
      <div>
        <ul id="piano"></ul>
      </div>
    );
  }
}

export default App;
