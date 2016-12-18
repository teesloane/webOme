import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import OmeBtn from '../OmeBtn/OmeBtn';
import './App.css';

@observer
class App extends Component {

  componentDidMount() {
    this.props.webOmeStore.playOme()
    window.App = this
  }

  render() {
    let notes = this.props.webOmeStore.midiNotes
    let store = this.props.webOmeStore
    return (
      <div className="App">
        <DevTools />

        { Object.keys(notes).map(omeBtn => {
          console.log('something changed so loop it')
          let btn = notes[omeBtn]
          return <OmeBtn key={btn.id} store={store} noteId={btn.id} />
        }) }
      </div>
    );
  }
}

export default App;
