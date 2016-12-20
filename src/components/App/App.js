import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import OmeRow from '../OmeRow/OmeRow'
import './App.css';
import Menu from '../Menu/Menu';

@observer
class App extends Component {

  componentDidMount() {
    window.App = this
    this.props.OmeStore.playOme()
  }

  renderMidiRow() {
    /* render row + pass array of buttons */
    let midiNotes = this.props.OmeStore.midiNotes
    let midiRows = Object.keys(midiNotes)
    return midiRows.map(row => {
      let currentRow = midiNotes[row]
      return (
        <OmeRow key={row} rowId={row} notes={currentRow} />
      )
    }) 
  }

  render() {
    let store = this.props.OmeStore

    return (
      <div className="App">
        <DevTools />
        <Menu />
        <section className="App-OmeContainer">{ this.renderMidiRow() } </section>
        <button onClick={store.togglePlay}> Pause / Play </button>
        <button className="App-Menu-toggle">Menu</button>
      </div>
    );
  }
}

export default App;
