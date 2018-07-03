/**
 * @summary: Map over all notes and render a row of OmeBtn components. 
 */

import React, { PropTypes } from 'react';
import OmeBtn from '../OmeBtn/OmeBtn';
import './OmeRow.css';

const OmeRow = props => {
  let notes = Object.keys(props.notes);
  return (
    <main className="OmeRow">
      {notes.map(note => {
       return <OmeBtn key={note} rowId={props.rowId} noteId={note} note={props.notes[note]} />
      })}
    </main>
  );
};

OmeRow.propTypes = {
  rowId: PropTypes.string,
  notes: PropTypes.object,
};

export default OmeRow;
