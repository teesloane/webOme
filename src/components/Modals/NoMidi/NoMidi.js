import React from 'react'
import synth3 from './assets/synth3_noshadow.png'
import './NoMidi.css'

const NoMidi = props => {
  return (
    <div className="NoMidi">
      <div className="NoMidi-text">You don't have any midi devices! Sadly <em>WebOme</em> cannot function without some cool doo-dad midi devices along-side it.</div> 
      <img className="NoMidi-image-synth" src={synth3} alt="" />
    </div>
  );
};

export default NoMidi;