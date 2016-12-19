import React, { PropTypes } from 'react';
import { observer } from 'mobx-react'
import './Menu.css';
import UiStore from '../../stores/UiStore'
import InputNumber from '../UiKit/InputNumber/InputNumber';
import InputSelect from '../UiKit/InputSelect/InputSelect';

/**
 * 
 * @param {any} props
 * @description the main menu for controlling everything in the webOme. 
 * 
 */
const Menu = observer(function Menu(props) {
  return (
    <main className={`Menu ${UiStore.menuOpen ? '' : 'Menu--hide'}`}>

      {/*Section: Tempo, Grid */}
      <section className="Menu-section">
        <InputNumber label="Tempo" />
        <InputSelect label="Grid" />
      </section>
      {/*Section: Scale, Key, Custom Note Mode */}

    </main>
  );
});

Menu.propTypes = {
  isOpen: PropTypes.bool,
};

export default Menu;