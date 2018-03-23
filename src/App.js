import React, { Component } from 'react';
import './App.css';
import Tone from 'tone';
import database from './firebase';
import Piano from './Piano';

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
