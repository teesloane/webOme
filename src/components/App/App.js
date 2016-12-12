import React, { Component } from 'react';
import './App.css';
import OmeBtn from '../OmeBtn/OmeBtn';

class App extends Component {

  componentDidMount() {
    this.getMidiAccess()
  }

  /**
   * getMidiAccess checks if the browser has midi --> yes? run midiSuccess.
   * @memberOf App
   */
  getMidiAccess() {
    // request MIDI access
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article. 
      }).then( this.midiSuccess, () => {console.log('midi failed')});
    } else {
      alert("No MIDI support in your browser.");
    }
  }

  
  /**
   * Runs when getMidiAccess succeeds (browser has midi)
   * @memberOf App
   */
  midiSuccess(midiAccess) {
    console.log('midi is up: ', midiAccess)
  }

  render() {
    return (
      <div className="App">
        <OmeBtn />
      </div>
    );
  }
}

export default App;
