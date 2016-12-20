import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import OmeRow from '../OmeRow/OmeRow'
import Menu from '../Menu/Menu';
import UiStore from '../../stores/UiStore'
import OmeStore from '../../stores/OmeStore'
import './App.css';

@observer
class App extends Component {
  renderMidiRow() {
    /* render row + pass array of buttons */
    let midiRows = Object.keys(OmeStore.midiNotes)
    return midiRows.map(row => {
      let currentRow = OmeStore.midiNotes[row]
      return <OmeRow key={row} rowId={row} notes={currentRow} />
    }) 
  }

  render() {
    return (
      <div className="App">
        <DevTools />

        {/* Menu + Toggle */}
        <Menu />
        <button className="App-Menu-toggle" onClick={UiStore.toggleMenu}>Menu</button>

        {/* Main Box - Monome + Play toggle*/}
        <main className="App-MainContainer">
          <section className="App-OmeContainer">{ this.renderMidiRow() } </section>
          <button className="App-Btn--play" onClick={OmeStore.togglePlay}> Pause / Play </button>
        </main>

      </div>
    );
  }
}

export default App;
