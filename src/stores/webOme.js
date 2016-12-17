/* eslint-disable */
import { observable } from 'mobx'
import {OmeBtnSkeleton} from '../classes/OmeBtnSkeleton';


class webOme {
  @observable midiNotes = []
  @observable midi = undefined
  @observable midiInputs = []
  @observable midiOutputs = []
  @observable selectedOutput = undefined

  constructor() {
    this.getMidiAccess()
    this.createNotes(32)
  }
  /* Store Methods  */

  playNote = (midiNote) => {
    var noteOnMessage = [0x90, midiNote, 0x7f];  
    this.selectedOutput.send( noteOnMessage );
  }
  
  // This will be created programmatically based on patch type + scale etc.
  createNotes = (limit) => {
    for(let i = 0; i < limit; i++) {
      var newBtn = new OmeBtnSkeleton(`id${i}`, i+40)
      this.midiNotes.push(newBtn)
    }
  }

  getMidiAccess = () => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false, 
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

var webOmeStore = window.omeStore = new webOme()

export default webOmeStore
