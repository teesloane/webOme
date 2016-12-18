/**
 */

/* eslint-disable */
import { observable, computed, autorun, extendObservable } from 'mobx'
import parser from 'note-parser'


let scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

class webOme {
  // Midi State
  @observable midiNotes = {}
  @observable midi = undefined
  @observable midiInputs = []
  @observable midiOutputs = []
  @observable selectedOutput = undefined

  @observable numSteps = 8 
  @observable currentStep = 1

  // On / Functionality state
  @observable playing = false
  @observable tempo = 90

  @computed get currentRow() {
    return `row_${this.currentStep - 1}`
  }

  // gets all notes that are "isPlaying" from currentStep , send to playNote
  @computed get onNotes() {
    // let currentStep = `row_${this.currentStep-1}` // must be minus 1 for 0-based indexing.
    return Object.keys(this.midiNotes[this.currentRow]).filter((note) => {
      return this.midiNotes[this.currentRow][note].isPlaying === true
    })
  }

  @computed get bpmTime() {
    return 60 / this.tempo * 1000
  }

  constructor() {
    this.getMidiAccess()
    this.createNotes(scale)
  }

  /* Store Methods  */
  playOme() {
    this.playing = true;
    if (this.currentStep == 8) this.currentStep = 0
    this.currentStep += 1 // find a way to return to 0 at 8. 
    this.playNote()

    let timer = setTimeout(() => {this.playOme()}, this.bpmTime)

  }

  updateMidiNotes(id) {
    console.log('update midi notes called', id)
    let note = this.midiNotes[id]
    note.isPlaying = !note.isPlaying
  }

  playNote = () => {
    this.onNotes.forEach(note => {
      console.log(note)
      var noteOnMessage = [0x90, this.midiNotes[this.currentRow][note].midiNote, 0x7f];  
      this.selectedOutput.send( noteOnMessage );
    })
  }
  

  /**
   * Programmtically create notes.
   * "Row" and "columns" are used interchangeably because I can't my brain
   * Loop through numSteps --> (8), for each one, loop and create notes from scale.
   * Pushes a key(row_x) to this.midiNotes with a value of the array of notes. 
   * Inside App, loop through the keys and create a row for each and the buttons for each row.
   */
  createNotes = (scale) => {
    for (let i = 0; i < this.numSteps; i++) {
      //  create an array to push object notes into in the next loop
      // this will represent a column/row. and the next loop is the buttons.
      let newOmeRow = {}
      newOmeRow[`row_${i}`] = {}
      extendObservable(this.midiNotes, newOmeRow)
      
      // create the buttons to fill the newRow above^
      for (let j = 0; j <= scale.length; j++) {
        let newOmeBtn = {}
        newOmeBtn[`button_${j}`] = {
          id: `button_${j}`,
          midiNote: j + 40, // eventually will be parsed by midi-parser as per scale.
          isPlaying: false
        }

        extendObservable(this.midiNotes[`row_${i}`], newOmeBtn)
      }
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
