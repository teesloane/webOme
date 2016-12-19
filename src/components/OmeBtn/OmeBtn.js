import React from 'react';
import {observer} from 'mobx-react'
import './OmeBtn.css';
import OmeStore from '../../stores/OmeStore'


/**
 * @description OmeStore button. Can turn on or off.
 * Interaction: onClick -> set it's state reference to it's inverse
 * TODO: Probably should refactor the onClick this to a method on the OmeStore class.
 */
var OmeBtn = observer(function OmeBtn(props) {
  const {rowId, noteId} = props
  let isPlaying = OmeStore.midiNotes[rowId][noteId].isPlaying

  return (
    <main 
      className={`OmeBtn ${isPlaying ? 'OmeBtn-on' : ''}`}
      onClick={() => OmeStore.midiNotes[rowId][noteId].isPlaying = !OmeStore.midiNotes[rowId][noteId].isPlaying } 
    >{props.note.midiNote}</main> 
  )
})

export default OmeBtn
