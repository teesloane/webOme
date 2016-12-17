import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import webOmeStore from './stores/webOme';
import './index.css';

ReactDOM.render(
  <App webOmeStore={webOmeStore} />,
  document.getElementById('root')
);
