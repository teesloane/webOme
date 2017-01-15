import OmeBtn from './OmeBtn'

// this is broken until stores are passed as props. 
// Can't easily test when stores are just "imported" :(
describe('omeBtn component', function() {
  beforeEach(function() {
    this.omeStore = {}
  })

  it('renders', () => {
    shallow(<OmeBtn omeStore={this.omeStore} />);
  })

  it('matches snapshot', () => {
    const component = shallow(<OmeBtn omeStore={this.omeStore} />);
    expect(component).toMatchSnapshot();
  })

})