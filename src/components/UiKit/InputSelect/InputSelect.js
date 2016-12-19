import React, { PropTypes } from 'react';
import {observer} from 'mobx-react'
import './InputSelect.css';
import omeStore from '../../../stores/OmeStore';

const InputSelect = observer(function(props) {
  return (
    <main className="InputSelect">
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} type="select" />
    </main>
  );
});

InputSelect.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
};

export default InputSelect