import OmeBtn from './OmeBtn'

describe('omeBtn component', function() {
  beforeEach(function() {
    this.OmeStore = {}
  })

  it('renders', () => {
    shallow(<OmeBtn OmeStore={this.omeStore} />);
  })

  it('matches snapshot', () => {
    const component = shallow(<OmeBtn OmeStore={this.omeStore} />);
    expect(component).toMatchSnapshot();
  })

})