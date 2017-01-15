import OmeBtn from './OmeBtn'

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