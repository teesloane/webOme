import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import OmeStore from './stores/OmeStore';
import './index.css';

ReactDOM.render(
  <App OmeStore={OmeStore} />,
  document.getElementById('root')
);
