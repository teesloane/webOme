import React from 'react';
import {observer} from 'mobx-react'
import './OmeBtn.css';
import store from '../../stores/webOme'


/**
 * @description WebOme button. Can turn on or off.
 * Interaction: onClick -> set it's state reference to it's inverse
 * TODO: Probably should refactor this to a method on the webOme store class.
 */
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
