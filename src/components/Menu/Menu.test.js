import Menu from './Menu';

describe('Menu Component', function() {
  beforeEach(function() {
    this.UiStore = {};
    this.OmeStore = {};
  })

  it('renders', () => {
    shallow(<Menu UiStore={this.UiStore} OmeStore={this.OmeStore}/>);
  })

  it('matches snapshot', function() {
    const component = shallow(<Menu UiStore={this.UiStore} OmeStore={this.OmeStore}/>);
    expect(component).toMatchSnapshot();
  });
})