import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


it('renders without crashing', () => {
  const uiStore = {}
  const omeStore = {}
  shallow(<App uiStore={uiStore} omeStore={omeStore}  />);
});
