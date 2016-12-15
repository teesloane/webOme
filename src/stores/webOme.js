import { observable } from 'mobx'

class webOme {
  @observable midi = undefined
  @observable midiInputs = []
  @observable midiOutputs = []
  @observable selectedOutput = undefined


  /* Store Methods  */
  getMidiAccess = () => {
    console.log('get midi access invoked from app');
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false, // this defaults to 'false' and we won't be covering sysex in this article. 
      }).then( this.midiSuccess, () => {console.log('midi failed')});
    } else {
      alert("No MIDI support in your browser.");
    }
  }

  midiSuccess = (midiAccess) => {
    // midiAccess.outputs is a MAP --> so you grab the [1] --> the actual value, since [0] is just the id.
    for (let midiOutput of midiAccess.outputs) { this.midiOutputs.push(midiOutput[1]) }
    for (let midiInput of midiAccess.inputs) { this.midiInputs.push(midiInput[1]) }

    this.midi = midiAccess
    this.selectedOutput = this.midiOutputs[0] // make this selectable for multiple
  }

}

var webOmeStore = window.webOmeStore = new webOme()
export default webOmeStore