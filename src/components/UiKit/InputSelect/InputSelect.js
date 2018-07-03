import React, { PropTypes } from 'react';
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import './InputSelect.css';

const customStyles = { borderRadius: 2 
                     // , backgroundColor: "#444"
                     , color: "#efefef"}

const InputSelect = function(props) {
  console.log (props.options)
  let styledOptions = props.options ? 
      props.options.map(o => Object.assign(o, {className: "select-option"}))
      : props.options

  return (
    <main className="InputSelect">
      <label className="label-standard" htmlFor={props.id}>{props.name}</label>
      <Select 
        style={customStyles}
        id={props.id} 
        name={props.name}
        className="custom-select-styles"
        value={props.value}
        options={styledOptions}
        onChange={props.onChange}
        clearable={props.clearable}
        deleteRemoves={false}
        backspaceRemoves={false}
        placeholder={props.placeholder}
        disabled={props.disabled}
    />
    </main>
  );
};

InputSelect.propTypes = {
  id: PropTypes.node,
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputSelect
