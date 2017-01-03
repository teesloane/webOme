import React, { Component } from 'react';
import { observer } from 'mobx-react';
import map from 'lodash/map'
import DevTools from 'mobx-react-devtools';
import Modal from 'react-modal';

import OmeRow from '../OmeRow/OmeRow'
import Menu from '../Menu/Menu';
import UiStore from '../../stores/UiStore'
import OmeStore from '../../stores/OmeStore'
import './App.css';


@observer
class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.code === "Space") OmeStore.togglePlay()
    })
  }

  /* render row + pass array of buttons */
  renderMidiRow = () => map(OmeStore.midiNotes, (row, k) => <OmeRow key={k} rowId={k} notes={row} /> )

  render() {
    let PlayBtnCl = OmeStore.playing ? 'App-playBtn--playing' : 'App-Btn--paused'
    let PlayBtnText = OmeStore.playing ? 'Pause' : 'Play' 
    let isDev = process.env.NODE_ENV === "development";

    return (
      <div className="App">
        { isDev && <DevTools /> }

        {/* Modals -- All / Any modal is programtically displayed here via UiStore */}
        <Modal 
          isOpen={UiStore.modal.show}
          className="App-modal-content"
          overlayClassName="App-modal-overlay"
        >
          <section className="App-modal-body">
            <button onClick={() => UiStore.closeModal()} className="App-modal-close">x</button>
            {UiStore.modal.body}
          </section>
        </Modal>

        {/* Menu + Toggle */}
        <Menu />
        <button className="App-Menu-toggle" onClick={UiStore.toggleMenu}>Menu</button>

        {/* Main Box - Monome + Play toggle*/}
        <main className="App-MainContainer">
          <section className="App-OmeContainer">{ this.renderMidiRow() } </section>
          <button className={`App-playBtn ${PlayBtnCl}`} onClick={OmeStore.togglePlay}>{PlayBtnText}</button>
        </main>

      </div>
    );
  }
}

export default App;
