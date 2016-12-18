/**
 * Eventually I'll need to create a "step" or "beat" for triggering notes that are 
 * specific to a column in time.
 * maybe each note should have a property to indicate what "step" ite belongs to
 * for sequencer like stuff. 
 */

/* eslint-disable */
import { observable, computed, autorun, extendObservable } from 'mobx'
// import {OmeBtnSkeleton} from '../classes/OmeBtnSkeleton';

class webOme {
  @observable midiNotes = {}
  @observable midi = undefined
  @observable midiInputs = []
  @observable midiOutputs = []
  @observable selectedOutput = undefined
  @observable playing = false

  // gets all notes that are "isPlaying" , send to playNote
  @computed get onNotes() {
    return Object.keys(this.midiNotes).filter((note) => {
      return this.midiNotes[note].isPlaying === true
    })
  }

  constructor() {
    this.getMidiAccess()
    this.createNotes(32)
  }
  /* Store Methods  */

  playOme() {
    this.playing = true;
    setInterval(() => { this.playNote() }, 1000) // <-- tempo eventually.  
  }

  updateMidiNotes(id) {
    console.log('update midi notes called', id)
    let note = this.midiNotes[id]
    note.isPlaying = !note.isPlaying
  }

  playNote = () => {
    this.onNotes.forEach(note => {
      var noteOnMessage = [0x90, this.midiNotes[note].midiNote, 0x7f];  
      this.selectedOutput.send( noteOnMessage );
    })
  }
  
  // This will be created programmatically based on patch type + scale etc.
  createNotes = (limit) => {
    for(let i = 0; i < limit; i++) {
      let newOmeNote = {}
      newOmeNote[`button_${i}`] = {
        id: `button_${i}`,
        midiNote: i + 40,
        isPlaying: false,
      }

      extendObservable(this.midiNotes, newOmeNote)

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
