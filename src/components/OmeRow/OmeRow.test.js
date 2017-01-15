import OmeRow from './OmeRow'

describe('OmeRow Component', function () {
  beforeEach(function () {
    this.notes = {
      button_0: {
        id: 'button_0',
        midiNote: '58',
        noteOn: false,
      }
    }
  })

  it('renders', function() {
    shallow( <OmeRow notes={this.notes}/>);
  })

  it('matches snapshot', function() {
    const component = shallow( <OmeRow notes={this.notes} /> );
    expect(component).toMatchSnapshot();
  })

})
