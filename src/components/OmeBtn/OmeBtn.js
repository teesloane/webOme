import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react'
import './OmeBtn.css';
// import OmeStore from '../../stores/OmeStore'
import { midiToNote } from '../../music_constants/index'

/**
 * @description OmeStore button. Can turn on or off.
 * Interaction: onClick -> set it's state reference to it's inverse
 * TODO: Probably should refactor the onClick this to a method on the OmeStore class.
 */

const OmeBtn = function OmeBtn(props) {
  const {rowId, noteId, omeStore} = props
  const noteOn = omeStore.midiNotes[rowId][noteId].noteOn
  const isCurrentRow = omeStore.currentRow === props.rowId
  const classNames = () => (
    `OmeBtn 
     ${noteOn ? 'OmeBtn-on' : ''} 
     ${isCurrentRow && noteOn && omeStore.playing ? 'OmeBtn-on-glow' : ''}`
  )


  return (
    <main 
      className={classNames()}
      onClick={() => omeStore.midiNotes[rowId][noteId].noteOn = !omeStore.midiNotes[rowId][noteId].noteOn } 
    >
      <span className="OmeBtn-Note-Hover">
        {midiToNote[props.note.midiNote].slice(0, -1)}
      </span>
    </main> 
  )
}

OmeBtn.propTypes = {
  rowId: PropTypes.string,
  noteId: PropTypes.string,
}

export default inject('omeStore')(observer(OmeBtn));
