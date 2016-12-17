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
import webOmeStore from '../../stores/webOme';

function OmeBtn(props) {
  return <main className={`OmeBtn`} onClick={() => props.playNote(props.note.note) } /> 
}

export default observer(OmeBtn);
