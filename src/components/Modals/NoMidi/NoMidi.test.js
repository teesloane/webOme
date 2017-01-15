import NoMidi from './NoMidi'

it('matches snapshot', () => {
  const component = shallow(<NoMidi />);
  expect(component).toMatchSnapshot();
})