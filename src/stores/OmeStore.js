/**
 */

import { observable, computed, extendObservable, action } from 'mobx'
import parser from 'note-parser'

// Temporary scale. Replace with a scales JSON file.
let scale = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4']

class OmeStore {
  // Midi-related State
  @observable midiNotes = {}
  @observable midi = undefined
  @observable midiInputs = []
  @observable midiOutputs = []
  @observable selectedMidiOut = undefined

  // OmeStore functionality state
  @observable numSteps = 8 
  @observable currentStep = 1
  @observable playing = false
  @observable tempo = 120
  @observable grid = 1

  // Computed values
  @computed get currentRow() { return  `row_${this.currentStep - 1}` }
  @computed get bpmTime() { return 60 / this.tempo * 1000 / this.grid}
  @computed get onNotes() {
    // gets all notes that are "isPlaying" from currentStep , send to playNote
    return Object.keys(this.midiNotes[this.currentRow]).filter((note) => {
      return this.midiNotes[this.currentRow][note].isPlaying === true
    })
  }

  /* ------- Methods ------- */

  constructor() {
    this.getMidiAccess()
    this.createNotes(scale)
    this.playOme()
  }


  // Actions
  @action changeTempo = (e) => { this.tempo = e.target.value }

  @action togglePlay = () => { this.playing = !this.playing }

  @action changeGrid = (newGrid) => { this.grid = newGrid.value}

  // Specifically Tailored for handling changes from react-selector component.
  @action changeSelectedMidiDevice = (newDevice) => { this.selectedMidiOut = newDevice.value }


  // "Patch Related Methods"    
  
  /**
   * @description "collects" notes using "onNotes" which returns an array. Output midi note forEach note.
   */
  playNote = () => {
    if (!this.playing) return
    this.onNotes.forEach(note => {
      var noteOnMessage = [0x90, this.midiNotes[this.currentRow][note].midiNote, 0x7f];  
      this.selectedMidiOut.send( noteOnMessage );
    })
  }


  //Setup Methods

  /**
   * @description Start the sequencer; run recursively to play notes.
   * Note: Midinotes will not actually be fired until "this.playing = true"
   */
  playOme() {
    if (this.currentStep === this.numSteps) this.currentStep = 0 // reset step to 0 at end of column necessary.
    this.currentStep += 1 
    this.playNote()
    setTimeout(() => { this.playOme() }, this.bpmTime)
  }


  /**
   * @param {array} scale: An array of strings that gets converted to midi notes with `note-parser`
   * @description Create a data structure of midiNotes to loop over and populate the OmeStore with
   * The words "Row" and "columns" here may be used interchangeably because I can't my brain
   */
  createNotes = (scale) => {
    for (let i = 0; i < this.numSteps; i++) {
      let newOmeRow = {}
      newOmeRow[`row_${i}`] = {}
      extendObservable(this.midiNotes, newOmeRow)
      
      // create the buttons to fill the newRow above^
      for (let j = 0; j < scale.length; j++) {
        let newOmeBtn = {}
        newOmeBtn[`button_${j}`] = {
          id: `button_${j}`,
          midiNote: parser.midi(scale[j]), 
          isPlaying: false
        }

        extendObservable(this.midiNotes[`row_${i}`], newOmeBtn)
      }
    }
  }


  /**
   * @description: Called on successful access to midi object. Sets inputs and ouputs on state.
   */
  getMidiAccess = () => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
        .then(this.midiSuccess, () => { console.log('midi failed') });
      
    } else {
      alert("Your browser does not support Midi. Bummer.");
    }
  }


  /**
   * @description: Function passed to promise on successful access to browser Midi. 
   * Sets inputs and ouputs to state.
   */
  midiSuccess = (midiAccess) => {
    // midiAccess.outputs is a MAP --> hence grabbing [1] and not [0].
    for (let midiOutput of midiAccess.outputs) { this.midiOutputs.push(midiOutput[1]) }
    for (let midiInput of midiAccess.inputs) { this.midiInputs.push(midiInput[1]) }

    this.midi = midiAccess
    this.selectedMidiOut = this.midiOutputs[0] // TODO: make this selectable for multiple
  }

}

var omeStore = window.omeStore = new OmeStore()
export default omeStore