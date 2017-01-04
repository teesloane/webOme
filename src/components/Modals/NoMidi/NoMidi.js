import React, { Component, PropTypes } from 'react';
import './NoMidi.css';

const NoMidi = props => {
  return (
    <div className="NoMidi">
      <div className="NoMidi-text">You don't have any midi devices! Sadly <em>WebOme</em> cannot function without some cool doo-dad midi devices along-side it.</div> 
      <div className="NoMidi-image-carousel" />
    </div>
  );
};

export default NoMidi;