import React from 'react';
import { shallow } from 'enzyme';
import Textbox from '.';

describe('Textbox', () => {
  it('renders with InputPresentation and Input and all props passed to Input', () => {
    const wrapper = shallow(<Textbox value='foobar' />);
    expect(wrapper).toMatchSnapshot();
  });
});
