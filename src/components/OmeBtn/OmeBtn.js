/**
 * A button to trigger a note.
 * long short of it -> press button === play midi note
 * Details: Each button will have an id that matches up with the midiNotes array in the webOmeStore
 * Pressing a button will set the note to "playing" or "on" or whatever -- in the animation loop, 
 * the app will keep checking for which notes are "on" and play them. 
 */

import React from 'react';
import {observer} from 'mobx-react'
import './OmeBtn.css';
import store from '../../stores/webOme'

var OmeBtn = observer(function OmeBtn(props) {
  const {rowId, noteId} = props
  let isPlaying = store.midiNotes[rowId][noteId].isPlaying

  return (
    <main 
      className={`OmeBtn ${isPlaying ? 'OmeBtn-on' : ''}`}
      onClick={() => store.midiNotes[rowId][noteId].isPlaying = !store.midiNotes[rowId][noteId].isPlaying } 
    >{props.note.midiNote}</main> 
  )
})

export default OmeBtn
