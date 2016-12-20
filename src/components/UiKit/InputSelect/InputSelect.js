import React, { PropTypes } from 'react';
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import './InputSelect.css';

const InputSelect = function(props) {
  return (
    <main className="InputSelect">
      <label htmlFor={props.id}>{props.label}</label>
      <Select 
        id={props.id} 
        name={props.name}
        value={props.value}
        options={props.options}
        onChange={props.onChange}
        value={props.value}
      />
    </main>
  );
};

InputSelect.propTypes = {
  id: PropTypes.node,
  label: PropTypes.string,
  // value: PropTypes.number,
};

export default InputSelect