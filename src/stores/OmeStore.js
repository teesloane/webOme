import { observable, computed, extendObservable, action } from 'mobx'
import parser from 'note-parser'
import { scaleMaker } from '../utils/scales.js'
import { SCALES } from '../music_constants'
import uiStore from './UiStore';

class OmeStore {
  // Midi-related State
  @observable midiNotes = {}
  @observable midi = undefined
  @observable midiInputs = []
  @observable midiOutputs = []
  @observable selectedMidiOut = undefined

  // key / scale
  @observable key = "A#3"
  @observable scale = SCALES[0].value // `.value` from "react-select" component.
  @observable scaleName = SCALES[0].label // same as above ^

  // OmeStore functionality state
  @observable numSteps = 8 
  @observable currentStep = 1
  @observable playing = false
  @observable tempo = 120
  @observable grid = 1
  @observable octave = 0

  /* ------- Computed Values ------- */

  // used to display key in react selector - slices octave data ("3") off string
  @computed get selectedKey() { 
    return { 
      label: this.key.substring(0, this.key.length - 1), 
      value: this.key 
    }
  }

  @computed get selectedScale() { 
    return { 
      label: this.scaleName, 
      value: this.scale,
    }
  }

  // use scaleMaker to compute a [scale] to pass into Create / notes.
  @computed get scaleNotes() { 
    return scaleMaker(this.key, this.scale)
  }

  // get row from the midiNotes data structure -- used for finding which notes to play / styling a row of btns at play time.
  @computed get currentRow() { return `row_${this.currentStep - 1}` }

  // calculate a final bpm time, used in a setTimeout for tempo simulation.
  @computed get bpmTime() { return 60 / this.tempo * 1000 / this.grid}

  // gets all notes that are "noteOn" from currentStep , send to playNote
  @computed get onNotes() {
    return Object.keys(this.midiNotes[this.currentRow]).filter((note) => {
      return this.midiNotes[this.currentRow][note].noteOn === true
    })
  }

  /* ------- Methods ------- */

  constructor() {
    this.getMidiAccess()
    this.createNotes(this.scaleNotes)
    this.playOme()
  }

  @action togglePlay = () => { this.playing = !this.playing }

  // "selectXYZ" actions are Specifically tailored for handling changes from react-select component.
  @action selectGrid = (newGrid) => { this.grid = newGrid.value}

  @action selectMidiDevice = (newDevice) => { this.selectedMidiOut = newDevice.value }

  @action selectKey = (newKey) => { this.key = newKey.value; this.updateNotes(this.scaleNotes) } 

  @action incrementOctave = () => {
    if (this.octave === 2) return this.octave
    this.octave += 1
  }

  @action decrementOctave = () => {
    if (this.octave === -2) return this.octave
    this.octave -= 1
  }

  @action selectScale = (newScale) => {
    this.scale = newScale.value
    this.scaleName = newScale.label
    this.updateNotes(this.scaleNotes)
  }

  @action changeTempo = (e) => { 
    let newTempo = e.target.value
    if (newTempo < 10) { this.tempo = 10 }
    else if (newTempo > 240) { this.tempo = 240 }
    else { this.tempo = e.target.value }
  }




  /**
   * @description "collects" notes using "onNotes" which returns an array. Output midi note forEach note.
   */
  playNote = () => {
    if (!this.playing) return
    this.onNotes.forEach(note => {
      let noteToPlay = this.midiNotes[this.currentRow][note].midiNote + (this.octave * 12)
      var noteOnMessage = [0x90, noteToPlay , 0x7f];  
      this.selectedMidiOut.send( noteOnMessage );
    })
  }

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
          noteOn: false
        }

        extendObservable(this.midiNotes[`row_${i}`], newOmeBtn)
      }
    }
  }


  /**
   * @param {array}  - arr
   * @param {string} - keyLabel 
   * @summary Used to create the proper data struct for a react-selector
   * Handles input from an array of objects specifically, grabbing the selector's label to display
   * from an object property. Mostly used to format the display of the midi outputs. 
   */
  createSelectorOptions(arr, keyLabel) {
    return arr.map(item => { return { label: item[keyLabel], value: item }})
  }
 
  
  /**
   * 
   * @param {scale} 
   * @memberOf OmeStore
   * @summary: loops through this.midiNotes and changes each row's notes, without overwriting the sequence.
   * TODO: lodash refactor?
   */
  updateNotes = (scale) => {
    let rows = Object.keys(this.midiNotes)

    for(let i = 0; i < rows.length; i++) {
      let currentRow = rows[i]
      let notes = Object.keys(this.midiNotes[currentRow])

      for(let j = 0; j < notes.length; j++) {
        let currentNote = notes[j]
        let newButton = this.midiNotes[currentRow][currentNote]
        newButton.midiNote = parser.midi(scale[j])
      }
    }
  }


  /**
   * @description: Try and access midi interface --> on success call `midiSuccess`
   */
  getMidiAccess = () => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
        .then(this.midiSuccess, () => { console.log('midi failed') });
      
    } else {
      alert("Your browser does not support Midi. Bummer. You'll need Google Chrome.");
    }
  }


  /**
   * @description: Function passed to promise on successful access to browser Midi. 
   * Sets inputs and ouputs to state.
   */
  midiSuccess = (midiAccess) => {
    // midiAccess.outputs is a MAP --> hence grabbing [1] and not [0].
    if (midiAccess.outputs.size < 1) {
      uiStore.showModal("You don't have any midi devices! Sadly WebOme cannot function without some cool doo-dad midi devices along-side it.")
    }
    

    for (let midiOutput of midiAccess.outputs) { this.midiOutputs.push(midiOutput[1]) }
    for (let midiInput of midiAccess.inputs) { this.midiInputs.push(midiInput[1]) }

    this.midi = midiAccess
    this.selectedMidiOut = this.midiOutputs[0] // TODO: make this selectable for multiple
  }

}

const omeStore = window.omeStore = new OmeStore()
export default omeStore
