import React, { PropTypes } from "react";
import { observer, inject } from "mobx-react";
import InputNumber from "../UiKit/InputNumber/InputNumber";
import InputSelect from "../UiKit/InputSelect/InputSelect";
import { KEYS_SELECTOR, SCALES, GRID } from "../../music_constants";
import "./Menu.css";

const Menu = function Menu(props) {
  // midi loads async, so wait until it's loaded until returning.
  // TODO: replace this with proper async notifier / spinner / alert.
  const { UiStore, OmeStore } = props;
  if (!OmeStore.midi) return null;

  return (
    <main className={`Menu ${UiStore.menuOpen ? "" : "Menu--hide"}`}>

      {/*Section: Tempo, Grid */}
      <section className="Menu-section">
        <InputNumber className="input-black" label="Tempo" max="240" min="10" />
      </section>

      <section className="Menu-section">
        <InputSelect
          className="Select-custom"
          name="Grid Resolution"
          clearable={false}
          value={{ label: `1/${OmeStore.grid}`, value: OmeStore.grid }}
          options={GRID}
          onChange={OmeStore.selectGrid}
        />
      </section>

      {/*Section: Scale, Key, Custom Note Mode */}
      <section className="Menu-section">
        {/* Key */}
        <InputSelect
          className="Select-custom"
          name="Key"
          options={KEYS_SELECTOR}
          value={OmeStore.selectedKey}
          onChange={OmeStore.selectKey}
          clearable={false}
          deleteRemoves={false}
        />
      </section>

      {/* Scales */}

      <section className="Menu-section">
        <InputSelect
          className="Select-custom"
          name="Scale"
          options={SCALES}
          onChange={OmeStore.selectScale}
          value={OmeStore.selectedScale}
          clearable={false}
          deleteRemoves={false}
        />
      </section>

      {/* Octave +/- */}
      <section className="Menu-section">
        <section className="Menu-octave-box">
          <button className="Menu-octave-btn" onClick={OmeStore.decrementOctave}>-</button>
          <div>Octave: {OmeStore.octave}</div>
          <button className="Menu-octave-btn" onClick={OmeStore.incrementOctave}>+</button>
        </section>
      </section>

      {/*Section: Midi Setup */}
      {OmeStore.selectedMidiOut
        ? <section className="Menu-section">
            <InputSelect
              className="Select-custom"
              name="Midi Output"
              options={OmeStore.createSelectorOptions(
                OmeStore.midiOutputs,
                "name"
              )}
              value={{
                label: OmeStore.selectedMidiOut.name,
                value: OmeStore.selectedMidiOut
              }}
              onChange={OmeStore.selectMidiDevice}
              clearable={false}
              deleteRemoves={false}
            />
          </section>
        : <section className="Menu-section">
            <InputSelect name="Midi Output" placeholder="No Midi Devices Available" disabled />
          </section>}

    </main>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool
};

export default inject("OmeStore", "UiStore")(observer(Menu));
