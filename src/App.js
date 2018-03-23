import React, { Component } from 'react';
import './App.css';
import Tone from 'tone';
import database from './firebase';
import Piano from './Piano';
import { generateMusicAndTempo } from './Generator';

class App extends Component {

  constructor() {
    super();
    this.state = {
      allNotes: null
    };

    this.databaseRef = database.collection("notes").doc("Re0fdrkQs2J1VdRmesgV");
    this.handleGenerate = this.handleGenerate.bind(this);

  }
  componentDidMount() {

    this.databaseRef.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          allNotes: doc.data().notes
        });
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  }

  handleGenerate() {
    console.log("song", generateMusicAndTempo(10));
  }

  render() {
    return (
      <div>
        { (this.state.allNotes) ? <Piano notes={this.state.allNotes}/> : 'Loading Piano' }
        <button onClick={this.handleGenerate}>Generate Song</button>
      </div>
    );
  }
}

export default App;
