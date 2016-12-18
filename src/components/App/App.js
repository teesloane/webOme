import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import OmeBtn from '../OmeBtn/OmeBtn';
import OmeRow from '../OmeRow/OmeRow'
import './App.css';

@observer
class App extends Component {

  componentDidMount() {
    this.props.webOmeStore.playOme()
    window.App = this
  }

  render() {
    let midiNotes = this.props.webOmeStore.midiNotes
    let midiRows = Object.keys(midiNotes)
    let store = this.props.webOmeStore

    // THIS PROBABLY NEEDS SOME LODASH LOVE I THINK UGH
    /* render row + pass array of buttons */
    return (
      <div className="App">
        <DevTools />

        {
         midiRows.map(row => {
           let currentRow = midiNotes[row]
           return <OmeRow key={row} rowId={row} notes={currentRow} />
         }) 
        }

      </div>
    );
  }
}

export default App;
