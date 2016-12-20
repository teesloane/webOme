import React, { PropTypes } from 'react';
import {observer} from 'mobx-react'
import './InputNumber.css';
import omeStore from '../../../stores/OmeStore';

const InputNumber = observer(function(props) {
  return (
    <main className="InputNumber">
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} type="number" onChange={omeStore.changeTempo} value={omeStore.tempo} />
    </main>
  );
});

InputNumber.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
};

export default InputNumber