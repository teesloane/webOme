import React, { Component } from 'react';
import { observer } from 'mobx-react';
import OmeBtn from '../OmeBtn/OmeBtn';
import './App.css';

@observer
class App extends Component {
  
  store = this.props.webOmeStore

  render() {
    return (
      <div className="App">
        {this.store.midiNotes.map(note => {
          return <OmeBtn key={note.id} note={note} playNote={this.store.playNote} />
        })}
      </div>
    );
  }
}

export default App;
