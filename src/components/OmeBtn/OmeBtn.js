/**
 * A single button in the WebOme. Likely, there will be 64 of these.
 * Need to be able to change colour, send a midi note, 
 * possibly: turn "on" the other notes around it...
 */

import React, { Component, PropTypes } from 'react';
import './OmeBtn.css';

class OmeBtn extends Component {
  render() {

    // conditonal styles
    const OmeBtnStyle = {
      backgroundColor: this.props.color && this.props.color
    }

    return (
      <main 
        style={OmeBtnStyle}
        className={`OmeBtn`}
        onClick={this.props.onClick} 
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
