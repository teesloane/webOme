import React, { Component } from 'react';
import { observer } from 'mobx-react';
import OmeBtn from '../OmeBtn/OmeBtn';
import './App.css';

@observer
class App extends Component {
  componentDidMount() {
    this.props.webOmeStore.getMidiAccess()
  }

  playNote = () => {
    var noteOnMessage = [0x90, 70, 0x7f];  
    this.props.webOmeStore.selectedOutput.send( noteOnMessage );
  }

  render() {
    return (
      <div className="App">
        <OmeBtn playNote={this.playNote} />
      </div>
    );
  }
}

export default App;
