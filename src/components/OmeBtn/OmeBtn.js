import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react'
import { midiToNote } from '../../music_constants/index'
import './OmeBtn.css';

/**
 * @description OmeStore button. Can turn on or off.
 * Interaction: onClick -> set it's state reference to it's inverse
 * TODO: Probably should refactor the onClick this to a method on the OmeStore class.
 */

const OmeBtn = function OmeBtn(props) {
  const {rowId, noteId, OmeStore} = props
  const noteOn = OmeStore.midiNotes[rowId][noteId].noteOn
  const isCurrentRow = OmeStore.currentRow === props.rowId
  const noteValue = midiToNote[props.note.midiNote].slice(0,-1) // get note name to display on hover. 
  const classNames = `OmeBtn
     ${noteOn ? 'OmeBtn-on' : ''} 
     ${isCurrentRow && noteOn && OmeStore.playing ? 'OmeBtn-on-glow' : ''}`;

  return (
    <div className={classNames} onClick={() => OmeStore.toggleOmeBtn(rowId, noteId)}>
      <span className="OmeBtn-Note-Hover">{noteValue}</span>
    </div> 
  )
}

OmeBtn.propTypes = {
  rowId: PropTypes.string,
  noteId: PropTypes.string,
  OmeStore: PropTypes.object,
}

export default inject('OmeStore')(observer(OmeBtn));
