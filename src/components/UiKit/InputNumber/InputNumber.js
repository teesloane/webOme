import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react'
import './InputNumber.css';

const InputNumber = function(props) {
  const {OmeStore, max, min, id, label} = props;

  return (
    <main className="InputNumber">
      <label className="label-standard" htmlFor={id}>{label}</label>
      <input id={id} type="number" min={min} max={max} onChange={OmeStore.changeTempo} value={OmeStore.tempo} />
    </main>
  );
};

InputNumber.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
};

export default inject('OmeStore')(observer(InputNumber))