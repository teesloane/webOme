import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'

import UiStore from '../../stores/UiStore'
import InputNumber from '../UiKit/InputNumber/InputNumber'
import InputSelect from '../UiKit/InputSelect/InputSelect';
import omeStore from '../../stores/OmeStore';

import {KEYS_SELECTOR, SCALES, GRID} from '../../music_constants'
import './Menu.css';


const Menu = function Menu(props) {
  // midi loads async, so wait until it's loaded until returning.
  // TODO: replace this with proper async notifier / spinner / alert.
  if (!omeStore.midi) return null

  return (
    <main className={`Menu ${UiStore.menuOpen ? '' : 'Menu--hide'}`}>

      {/*Section: Tempo, Grid */}
      <section className="Menu-section">
        <InputNumber label="Tempo" max="240" min="10" />
        <InputSelect 
          className="Select-custom" 
          name="Grid Resolution" 
          clearable={false} 
          value={{label: `1/${omeStore.grid}`, value: omeStore.grid}}
          options={GRID}
          onChange={omeStore.selectGrid}
        />
      </section>

      {/*Section: Scale, Key, Custom Note Mode */}
      <section className="Menu-section">
        {/* Key */}
        <InputSelect 
          className="Select-custom"
          name="Key" 
          options={KEYS_SELECTOR} 
          value={omeStore.selectedKey}
          onChange={omeStore.selectKey} 
          clearable={false}
          deleteRemoves={false}
        />

        {/* Scales */}
        <InputSelect 
          className="Select-custom"
          name="Scale" 
          options={SCALES} 
          onChange={omeStore.selectScale}
          value={omeStore.selectedScale}
          clearable={false}
          deleteRemoves={false}
        />

        {/* Octave +/- */}
        <section className="Menu-octave-box">
          <button className="btn" onClick={omeStore.decrementOctave}>-</button>
          <div>Octave: {omeStore.octave}</div>
          <button className="btn" onClick={omeStore.incrementOctave}>+</button>
        </section>
      </section>

      {/*Section: Midi Setup */}
      {
        omeStore.selectedMidiOut ? 
        <section className="Menu-section">
          <InputSelect 
            className="Select-custom"
            name="Midi Output" 
            options={omeStore.createSelectorOptions(omeStore.midiOutputs, "name")} 
            value={{label: omeStore.selectedMidiOut.name, value: omeStore.selectedMidiOut}}
            onChange={ omeStore.selectMidiDevice } 
            clearable={false}
            deleteRemoves={false}
          />
        </section> :

        <section><InputSelect placeholder="No Midi Devices Available" disabled /></section>
      }

    </main>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool,
};


export default inject('omeStore', 'uiStore')(observer(Menu));