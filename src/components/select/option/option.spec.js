import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Option from '.';
import { baseTheme } from '../../../style/themes';

describe('Option', () => {
  it('renders properly', () => {
    const props = { value: '1', text: 'foo', children: 'bar' };
    expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
  });

  describe('when no children are provided', () => {
    it('renders with the text prop as children', () => {
      const props = { value: '1', text: 'foo' };
      expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
    });
  });

  describe('when isHighlighted prop is set', () => {
    it('then it should have proper background', () => {
      const props = { value: '1', text: 'foo' };
      expect(renderOption(props, mount)).toHaveStyleRule('background-color', baseTheme.select.selected);
    });
  });

  describe('when the element is hovered over', () => {
    it('then it should have proper background', () => {
      const props = { value: '1', text: 'foo' };
      expect(renderOption(props, mount))
        .toHaveStyleRule('background-color', baseTheme.select.selected, { modifier: ':hover' });
    });
  });

  describe('when the element is clicked', () => {
    it('then onSelectOption should be called with text and value', () => {
      const onSelectOption = jest.fn();
      const props = { value: '1', text: 'foo', onSelectOption };
      const wrapper = renderOption(props, mount);
      wrapper.simulate('click');

      expect(onSelectOption).toHaveBeenCalledWith({ text: props.text, value: props.value });
    });
  });
});

function renderOption(props, renderer = shallow) {
  return renderer(
    <Option { ...props } />
  );
}
