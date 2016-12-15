/**
 * A single button in the WebOme. Likely, there will be 64 of these.
 * Need to be able to change colour, send a midi note, 
 * possibly: turn "on" the other notes around it...
 */


import React from 'react';
import './OmeBtn.css';

const OmeBtn = props => {
  const OmeBtnStyle = { backgroundColor: props.color && props.color }
  return  <main style={OmeBtnStyle} className={`OmeBtn`} onClick={props.playNote } /> 
};

export default OmeBtn;
