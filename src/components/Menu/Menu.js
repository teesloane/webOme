import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import UiStore from '../../stores/UiStore'
import InputNumber from '../UiKit/InputNumber/InputNumber'
import InputSelect from '../UiKit/InputSelect/InputSelect';
import './Menu.css';

/**
 * 
 * @param {any} props
 * @description the main menu for controlling everything in the webOme. 
 * 
 */

var things = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
]; 

const Menu = observer(function Menu(props) {
  return (
    <main className={`Menu ${UiStore.menuOpen ? '' : 'Menu--hide'}`}>

      {/*Section: Tempo, Grid */}
      <section className="Menu-section">
        <InputNumber label="Tempo" />
        <InputSelect name="Grid Resolution" label="Grid Resolution" value={things[0]} options={things} onChange={() => console.log('suck it')} />
      </section>

      {/*Section: Scale, Key, Custom Note Mode */}

    </main>
  );
});

Menu.propTypes = {
  isOpen: PropTypes.bool,
};

export default Menu;