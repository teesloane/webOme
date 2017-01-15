import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {Provider} from 'mobx-react';
import './index.css';

// MobX observable stores. 
import UiStore from './stores/UiStore';
import OmeStore from './stores/OmeStore';

// Combine these and pass to the Provider for all children to have access with `inject`

ReactDOM.render( 
  <Provider UiStore={UiStore} OmeStore={OmeStore}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
