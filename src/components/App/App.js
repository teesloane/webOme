import React, { Component } from 'react';
import OmeBtn from '../OmeBtn/OmeBtn';
import './App.css';

class App extends Component {

  state = {
    midi: undefined,
    midiInputs: undefined,
    midiOutputs: undefined, 
    selectedPort: undefined,
  }

  componentDidMount() {
    this.getMidiAccess()
  }

  /**
   * getMidiAccess checks if the browser has midi --> yes? run midiSuccess.
   */
  getMidiAccess() {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false, // this defaults to 'false' and we won't be covering sysex in this article. 
      }).then( this.midiSuccess, () => {console.log('midi failed')});
    } else {
      alert("No MIDI support in your browser.");
    }
  }

  /**
   * Runs when getMidiAccess succeeds (browser has midi)
   */
  midiSuccess = (midiAccess) => {
    // midiAccess.outputs is a MAP --> so you grab the [1] --> the actual value, since [0] is just the id.
    let inputs = [];
    let outputs = [];
    for (let midiOutput of midiAccess.outputs) { outputs.push(midiOutput[1]) }
    for (let midiInput of midiAccess.inputs) { inputs.push(midiInput[1]) }

    this.setState({
      midi: midiAccess,
      midiInputs: inputs,
      midiOutputs: outputs,
      selectedOutput: outputs[0] // make this set-able.
    })
  }

  playNote = () => {
    var noteOnMessage = [0x90, 70, 0x7f];    // note on, middle C, full velocity
    this.state.selectedOutput.send( noteOnMessage );  //omitting the timestamp means send immediately.
    this.state.selectedOutput.send( [0x80, 66, 0x40], window.performance.now() + 1000.0 ); // Inlined array creation- note off, middle C,  
  }

  render() {
    return (
      <div className="App">
        <OmeBtn playNote={this.playNote} />
      </div>
    );
  }
}

export default App;
