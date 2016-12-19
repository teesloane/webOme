import React, { PropTypes } from 'react';
import { observer } from 'mobx-react'
import './Menu.css';
import UiStore from '../../stores/UiStore'



/**
 * 
 * 
 * @param {any} props
 * @description the main menu for controlling everything in the webOme. 
 * 
 */
const Menu = observer(function Menu(props) {
  return (
    <main 
      className={`Menu ${UiStore.menuOpen ? '' : 'Menu--hide'}`}>
      
      {/*Section: Tempo, Grid */}

      {/*Section: Scale, Key, Custome Note Mode */}

    </main>
  );
});

Menu.propTypes = {
  isOpen: PropTypes.bool,
};

export default Menu;