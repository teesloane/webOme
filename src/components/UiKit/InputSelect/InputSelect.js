import React, { PropTypes } from 'react';
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import './InputSelect.css';

const customStyles = { borderRadius: 0 }

const InputSelect = function(props) {
  return (
    <main className="InputSelect">
      <label className="label-standard" htmlFor={props.id}>{props.name}</label>
      <Select 
        style={customStyles}
        id={props.id} 
        name={props.name}
        value={props.value}
        options={props.options}
        onChange={props.onChange}
    />
    </main>
  );
};

InputSelect.propTypes = {
  id: PropTypes.node,
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default InputSelect