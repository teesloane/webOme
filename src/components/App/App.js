import React, { Component } from 'react';
import { observer } from 'mobx-react';
import OmeBtn from '../OmeBtn/OmeBtn';
import './App.css';

// eslint-disable-next-line
@observer
class App extends Component {
  
  store = this.props.webOmeStore

  componentDidMount() {
    this.store.getMidiAccess()
    this.store.createNotes(20)
    window.App = this;
  }

  playNote = (midiNote) => {
    var noteOnMessage = [0x90, midiNote, 0x7f];  
    this.store.selectedOutput.send( noteOnMessage );
  }

  render() {
    return (
      <div className="App">
      {this.store.midiNotes.map(note => {
        return <OmeBtn note={note} playNote={this.playNote} />
      })}
      </div>
    );
  }
}

export default App;
