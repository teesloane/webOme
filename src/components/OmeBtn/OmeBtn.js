/**
 * A single button in the WebOme. Likely, there will be 64 of these.
 * Need to be able to change colour, send a midi note, 
 * possibly: turn "on" the other notes around it...
 */

import React, { Component, PropTypes } from 'react';
import './OmeBtn.css';

class OmeBtn extends Component {
  constructor() {
    super()

    this.state = {
      messageData: new Uint8Array(3)
    }
  }

  sendNoteOn(note, velocity, output)  {
    console.log('sendNoteOn invoked: ', note, velocity, output);
    this.sendMessage(0x90, note, velocity, output);
  }

  sendNoteOff(note, velocity, output) {
    this.sendMessage(0x80, note, velocity, output); 
  } 

  sendMessage(type, data1, data2, output) {
    console.log(type, data1, data2, output);
    this.setState.messageData[0] = type;
    this.setState.messageData[1] = data1;
    this.setState.messageData[2] = data2;

    // Send the MIDI message immediately
    output.send(this.state.messageData);
  }

  render() {
    // conditonal styles
    const OmeBtnStyle = {
      backgroundColor: this.props.color && this.props.color
    }

    return (
      <main 
        style={OmeBtnStyle}
        className={`OmeBtn`}
        onClick={() => this.sendNoteOn(142, 64, 1) } 
      />
    );
  }
}

OmeBtn.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  note: PropTypes.string,
  gate: PropTypes.number,
  velocity: PropTypes.number
};

OmeBtn.defaultProps = {
  note: "C",
  gate: 64,
}

export default OmeBtn;
