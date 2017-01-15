import { shallow, mock, mount } from 'enzyme';
import react from 'react';

global.shallow = shallow;
global.mock    = mock;
global.mount   = mount;
global.React   = react;