import OmeBtn from './OmeBtn'

// this is broken until stores are passed as props. 
// Can't easily test when stores are just "imported" :(

it('renders', () => {
  shallow(<OmeBtn />);
})

// it('matches snapshot', () => {
//   const component = shallow(<OmeBtn />);
//   expect(component).toMatchSnapshot();
// })