import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App component', function() {
  beforeEach(function() {
    this.UiStore = {};
    this.OmeStore = {};
  })

  it('renders without crashing', () => {
    shallow(<App UiStore={this.UiStore} OmeStore={this.OmeStore}  />);
  });

})
