import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import OmeRow from '../OmeRow/OmeRow'
import './App.css';

@observer
class App extends Component {

  componentDidMount() {
    window.App = this
    this.props.webOmeStore.playOme()
  }

  renderMidiRow() {
    /* render row + pass array of buttons */
    let midiNotes = this.props.webOmeStore.midiNotes
    let midiRows = Object.keys(midiNotes)
    return midiRows.map(row => {
      let currentRow = midiNotes[row]
      return <OmeRow key={row} rowId={row} notes={currentRow} />
    }) 
  }

  render() {
    let store = this.props.webOmeStore
    return (
      <div className="App">
        <DevTools />
        { this.renderMidiRow() }

        <button onClick={() => store.playing = !store.playing }> Pause / Play </button>

      </div>
    );
  }
}

export default App;
