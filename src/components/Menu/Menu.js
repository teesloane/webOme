import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import UiStore from '../../stores/UiStore'
import InputNumber from '../UiKit/InputNumber/InputNumber'
import InputSelect from '../UiKit/InputSelect/InputSelect';
import './Menu.css';
import omeStore from '../../stores/OmeStore';

const GRID = [
  {label: "1" , value: 1},
  {label: "1/2" , value: 2},
  {label: "1/4" , value: 4},
  {label: "1/8" , value: 8},
]

/**
 * 
 * @param {array} arr - the array to be transformed into an array of objects.
 * @param {string} labelFromObjectKey - used to give name to the label, if the object has something worth pulling from as a name.
 * @returns an array of objects where each array item has a "label" and the value (which is the iterated item)
 */
function createSelectorOptions(arr, labelFromObjectKey) {
  let n = labelFromObjectKey
  return arr.map(item => { return { label: item[n] || "no label", value: item }})
}

const Menu = observer(function Menu(props) {

  // midi loads async, so wait until it's loaded until returning.
  // TODO: replace this with proper async notifier / spinner / alert.
  let selectedMidiOut = omeStore.selectedMidiOut; if (!selectedMidiOut) return null

  return (
    <main className={`Menu ${UiStore.menuOpen ? '' : 'Menu--hide'}`}>

      {/*Section: Tempo, Grid */}
      <section className="Menu-section">
        <InputNumber label="Tempo" />
        <InputSelect 
          className="Select-custom" 
          name="Grid Resolution" 
          clearable={false} 
          value={{label: `1/${omeStore.grid}`, value: omeStore.grid}}
          options={GRID}
          onChange={omeStore.changeGrid}
        />
      </section>

      {/*Section: Scale, Key, Custom Note Mode */}

      {/*Section: Midi Setup */}
      <section className="Menu-section">
        <InputSelect 
          className="Select-custom"
          name="Midi Output" 
          options={createSelectorOptions(omeStore.midiOutputs, "name")} 
          value={{label: selectedMidiOut.name, value: selectedMidiOut}}
          onChange={ omeStore.changeSelectedMidiDevice } 
          clearable={false}
        />
      </section>
    </main>
  );
});

Menu.propTypes = {
  isOpen: PropTypes.bool,
};


export default Menu;