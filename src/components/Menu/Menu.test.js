import React from 'react';
import Menu from './Menu';

describe('Menu Component', () => {
  it('renders', () => {
    shallow(<Menu/>);
  })

  it('matches snapshot', () => {
    const component = shallow(<Menu />);
    expect(component).toMatchSnapshot();
  });
})