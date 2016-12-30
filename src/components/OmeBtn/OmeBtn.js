import React, { PropTypes } from 'react';
import {observer} from 'mobx-react'
import './OmeBtn.css';
import OmeStore from '../../stores/OmeStore'
import { midiToNote } from '../../music_constants/index'

/**
 * @description OmeStore button. Can turn on or off.
 * Interaction: onClick -> set it's state reference to it's inverse
 * TODO: Probably should refactor the onClick this to a method on the OmeStore class.
 */
var OmeBtn = observer(function OmeBtn(props) {
  const {rowId, noteId} = props
  let noteOn = OmeStore.midiNotes[rowId][noteId].noteOn
  let isCurrentRow = OmeStore.currentRow === props.rowId

  return (
    <main 
      className={`OmeBtn 
        ${noteOn ? 'OmeBtn-on' : ''}
        ${isCurrentRow && noteOn && OmeStore.playing ? 'OmeBtn-on-glow' : ''}
        `}
      onClick={() => OmeStore.toggleNote(rowId, noteId)}
    >
      <span className="OmeBtn-Note-Hover">
        {midiToNote[props.note.midiNote].slice(0, -1)}
      </span>
    </main> 
  )
})

OmeBtn.propTypes = {
  rowId: PropTypes.string,
  noteId: PropTypes.string,
}

export default OmeBtn
