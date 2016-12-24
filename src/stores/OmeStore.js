import { observable, computed, extendObservable, action } from 'mobx'
import parser from 'note-parser'
import { chromaticScale, scaleMaker } from '../utils/scales.js'
import { SCALES } from '../music_constants'

window.parser = parser

class OmeStore {
  // Midi-related State
  @observable midiNotes = {}
  @observable midi = undefined
  @observable midiInputs = []
  @observable midiOutputs = []
  @observable selectedMidiOut = undefined

  // key / scale
  @observable key = "A#3"
  @observable selectedScale = SCALES.minor

  // OmeStore functionality state
  @observable numSteps = 8 
  @observable currentStep = 1
  @observable playing = false
  @observable tempo = 120
  @observable grid = 1

  // Computed values

  // used to display key in react selector - slices octave data ("3") off string
  @computed get showSelectedKey() { return this.key.substring(0, this.key.length - 1)}

  // use scaleMaker to compute a [scale] to pass into Create / notes.
  @computed get scaleNotes() { return scaleMaker(this.key, this.selectedScale)}

  // something  something -- create current row thing 
  @computed get currentRow() { return  `row_${this.currentStep - 1}` }

  // calculate a final bpm time, used in a setTimeout for tempo simulation.
  @computed get bpmTime() { return 60 / this.tempo * 1000 / this.grid}

  // gets all notes that are "isPlaying" from currentStep , send to playNote
  @computed get onNotes() {
    return Object.keys(this.midiNotes[this.currentRow]).filter((note) => {
      return this.midiNotes[this.currentRow][note].isPlaying === true
    })
  }

  /* ------- Methods ------- */

  constructor() {
    this.getMidiAccess()
    this.createNotes(this.scaleNotes)
    this.playOme()
  }

  // Actions

  @action togglePlay = () => { this.playing = !this.playing }

  // Specifically Tailored for handling changes from react-select component.
  @action selectGrid = (newGrid) => { this.grid = newGrid.value}
  
  @action selectMidiDevice = (newDevice) => { this.selectedMidiOut = newDevice.value }

  @action selectKey = (newKey) => { this.key = newKey.value; this.updateNotes(this.scaleNotes) } // createNotes deletes sequence.

  @action changeTempo = (e) => { 
    let newTempo = e.target.value
    if (newTempo < 10) { this.tempo = 10 }
    else if (newTempo > 240) { this.tempo = 240 }
    else { this.tempo = e.target.value }
  }



  // "Patch Related" Methods //

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


  //Setup Methods //

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
   * TODO: write a similar fn --> replaceNotes --> for changing key but not erasing sequence. 
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
   * 
   * @param {scale} 
   * @memberOf OmeStore
   * @summary: loops through this.midiNotes and changes each row's notes, without overwriting the sequence.
   * BUG: Changing keys causes a timeout glitch where the sequence sort of skips.
   * BUG: scaleMaker doesn't organize notes in proper ascending order (octave issues)
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
    // loop through the object keys for each row
    // loop through each row and change the notes to the notes of the scale. 
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

const omeStore = window.omeStore = new OmeStore()
export default omeStore
