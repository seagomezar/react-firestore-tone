import React, { Component } from 'react';
import './App.css';
import Tone from 'tone';
import database from './firebase';
import Piano from './Piano';
import { SALAMANDER_PIANO_SOUNDS } from './Constants';
import { generateMusicAndTempo } from './Generator';

class App extends Component {

  synth;

  constructor() {
    super();

    this.state = {
      allNotes: null,
      song: null
    };

    this.synth = new Tone.Sampler(SALAMANDER_PIANO_SOUNDS, {
      'release': 1,
      'baseUrl': './salamander/'
    }).toMaster();

    this.databaseRef = database.collection("notes").doc("Re0fdrkQs2J1VdRmesgV");

    this.handleGenerate = this.handleGenerate.bind(this);
    this.playSong = this.playSong.bind(this);
    this.saveSong = this.saveSong.bind(this);
    this.convertArrayInObject = this.convertArrayInObject.bind(this);
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

  playSong(song, animationTime) {
    Tone.Transport.cancel();
    Tone.Transport.clear();
    const part = new Tone.Part((time, note, duration) => {
      this.synth.triggerAttackRelease(note, duration, time);
      Tone.Draw.schedule(() => {
        document.getElementById(note).classList.add("pressed");
        setTimeout(() => {
          document.getElementById(note).classList.remove("pressed");
        }, animationTime);
      }, time);
    }, song).start(0);
    Tone.Transport.start();
  }

  handleGenerate() {
    const song = generateMusicAndTempo(10);
    this.setState({song: song});

    this.playSong(song, 500);
  }

  convertArrayInObject(arr) {
    return arr.reduce(function(acc, cur, i) {
      acc[i] = cur;
      return acc;
    }, {})
  }

  saveSong() {
    console.log("no in");
    if(this.state.song) {
      console.log("in");
      this.databaseRef.collection("songs").add({
        song: this.convertArrayInObject(this.state.song),
        date: Date.now() })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }

  }

  render() {
    return (
      <div>
        {(this.state.allNotes) ? <Piano notes={this.state.allNotes} /> : 'Loading Piano'}
        <button onClick={this.handleGenerate}>Generate Song</button>
        <button onClick={this.saveSong}>Save Song</button>
      </div>
    );
  }
}

export default App;
