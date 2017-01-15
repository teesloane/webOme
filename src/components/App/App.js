import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import map from 'lodash/map'
import DevTools from 'mobx-react-devtools';
import Modal from 'react-modal';
import OmeRow from '../OmeRow/OmeRow'
import Menu from '../Menu/Menu';
import './App.css';


/**
 * @summary: Renders the entire application. 
 * - All state is passed through `Provider` via `mobx-react`. This must be injected as needed.
 * - Adds listener for "space" to pause and play music.
 * - Also, all Modals are displayed through <App>. Logic is handled in the UiStore.
 * @returns: Spits out the App with a Menu, and the main "Monome"" grid.
 * @class App
 * @extends {Component}
 * TODO: Refactor "Play / Pause" to it's own component. The logic for the text it renders is ugly. 
 */
@inject('uiStore', 'omeStore') @observer
class App extends Component {

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.code === "Space") this.props.omeStore.togglePlay()
    })
  }

  /* render row + pass array of buttons */
  renderMidiRow = () => map(this.props.omeStore.midiNotes, (row, k) => <OmeRow key={k} rowId={k} notes={row} /> )

  render() {
    const {omeStore, uiStore} = this.props
    let isDev = process.env.NODE_ENV === "development";
    let PlayBtnCl = omeStore.playing ? 'App-playBtn--playing' : 'App-Btn--paused'
    let PlayBtnText = omeStore.playing ? 'Pause' : 'Play' 

    return (
      <div className="App">
        { isDev && <DevTools /> }

        {/* Modals -- All / Any modal is programtically displayed here via UiStore actions */}
        <Modal 
          isOpen={uiStore.modal.show}
          className="App-modal-content"
          overlayClassName="App-modal-overlay"
          contentLabel="Modal"
          onRequestClose={() => uiStore.closeModal()}
        >
          <section className="App-modal-body">
            <button onClick={() => uiStore.closeModal()} className="App-modal-close">X</button>
            {uiStore.modal.body}
          </section>
        </Modal>

        {/* Menu + Toggle */}
        <Menu />
        <button className="App-Menu-toggle" onClick={uiStore.toggleMenu}>Menu</button>

        {/* Main Box - Monome + Play toggle*/}
        <main className="App-MainContainer">
          <section className="App-OmeContainer">{ this.renderMidiRow() } </section>
          <button className={`App-playBtn ${PlayBtnCl}`} onClick={omeStore.togglePlay}>{PlayBtnText}</button>
        </main>

      </div>
    );
  }
}

export default App;
