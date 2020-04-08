import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import SimpleSelect from './simple-select.component';
import Textbox from '../../../__experimental__/components/textbox';
import Option from '../select-option';
import SelectList from '../select-list';
import InputIconToggleStyle from '../../../__experimental__/components/input-icon-toggle/input-icon-toggle.style';
import StyledInput from '../../../__experimental__/components/input/input.style';
import InputPresentationStyle from '../../../__experimental__/components/input/input-presentation.style';
import { baseTheme } from '../../../style/themes';

describe('SimpleSelect', () => {
  describe('when the hasTypeToSearch prop is not specified', () => {
    it('then the input text should have proper styling', () => {
      const wrapper = renderSelect({ transparent: true });

      assertStyleMatch({
        cursor: 'default',
        color: 'transparent',
        userSelect: 'none',
        textShadow: `0 0 0 ${baseTheme.text.color}`
      }, wrapper, { modifier: `${StyledInput}` });

      assertStyleMatch({
        textShadow: `0 0 0 ${baseTheme.text.placeholder}`
      }, wrapper, { modifier: `${StyledInput}::placeholder` });
    });
  });

  describe('when the transparent prop is set to true', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderSelect({ transparent: true });
    });

    it('then the input should have transparent background and no border', () => {
      assertStyleMatch({
        background: 'transparent',
        border: 'none'
      }, wrapper, { modifier: `${InputPresentationStyle}` });
    });

    it('then the input text should be right aligned with font weight set to 900', () => {
      assertStyleMatch({
        textAlign: 'right',
        fontWeight: '900'
      }, wrapper, { modifier: `${StyledInput}` });
    });

    it('then the input toggle text should have width set to auto', () => {
      assertStyleMatch({
        width: 'auto'
      }, wrapper, { modifier: `${InputIconToggleStyle}` });
    });
  });

  describe('when the value prop is passed', () => {
    it('then the formatted value should be set to corresponding option text', () => {
      const wrapper = renderSelect({ value: 'opt2' });

      expect(wrapper.find(Textbox).prop('formattedValue')).toBe('green');
    });
  });

  describe('when the opensOnFocus prop is set to true', () => {
    describe('and the Textbox Input is focused', () => {
      it('the SelectList should be rendered', () => {
        const wrapper = renderSelect();

        wrapper.find('input').simulate('focus');
        expect(wrapper.find(SelectList).exists()).toBe(true);
      });

      describe.each(['readOnly', 'disabled'])('with the %s prop passed', (prop) => {
        it('the SelectList should not be rendered', () => {
          const obj = { [prop]: true };
          const wrapper = renderSelect(obj);

          wrapper.find('input').simulate('focus');
          expect(wrapper.find(SelectList).exists()).toBe(false);
        });
      });

      describe('with the onFocus prop passed', () => {
        it('then that prop should be called', () => {
          const onFocusFn = jest.fn();
          const wrapper = renderSelect({ onFocus: onFocusFn });

          wrapper.find('input').simulate('focus');
          expect(onFocusFn).toHaveBeenCalled();
        });
      });

      describe('with the onOpen prop passed', () => {
        it('then that prop should be called', () => {
          const onOpenFn = jest.fn();
          const wrapper = renderSelect({ onOpen: onOpenFn });

          wrapper.find('input').simulate('focus');

          expect(onOpenFn).toHaveBeenCalled();
        });
      });
    });
  });

  describe('when the Textbox Input is focused with the opensOnFocus prop set to false', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderSelect({ opensOnFocus: false });
    });

    it('the SelectList should not be rendered', () => {
      wrapper.find('input').simulate('focus');
      expect(wrapper.find(SelectList).exists()).toBe(false);
    });

    describe.each([
      ['Enter', 13],
      ['Down', 40],
      ['Up', 38]
    ])('and the %s key is pressed', (keyName, which) => {
      it('the SelectList should be rendered', () => {
        wrapper.find('input').simulate('keydown', { which });
        expect(wrapper.find(SelectList).exists()).toBe(true);
      });
    });

    describe('and a key other than Enter, Up or Down is pressed', () => {
      it('the SelectList should not be rendered', () => {
        wrapper.find('input').simulate('keydown', { which: 18 });
        expect(wrapper.find(SelectList).exists()).toBe(false);
      });
    });
  });

  describe('when the Textbox Input is clicked', () => {
    it('the SelectList should be rendered', () => {
      const wrapper = renderSelect();

      wrapper.find('input').simulate('click');
      expect(wrapper.find(SelectList).exists()).toBe(true);
    });

    describe('and the onClick prop is passed', () => {
      it('then that prop should be called', () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn });

        wrapper.find('input').simulate('click');
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe('and the onOpen prop is passed', () => {
      it('then that prop should be called', () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        wrapper.find('input').simulate('click');
        expect(onOpenFn).toHaveBeenCalled();
      });
    });
  });

  describe('when the Textbox Input value changes', () => {
    describe('multiple times in a short amount of time', () => {
      it('the the filterText prop in the SelectList should have combined value of these changes', () => {
        const wrapper = renderSelect();

        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('change', { target: { value: 'F' } });
        wrapper.find('input').simulate('change', { target: { value: 'o' } });
        wrapper.find('input').simulate('change', { target: { value: 'o' } });

        expect(wrapper.update().find(SelectList).prop('filterText')).toBe('Foo');
        wrapper.unmount();
      });
    });

    describe('multiple times with a long break before the last change', () => {
      it('the the filterText prop in the SelectList should have the last value', () => {
        jest.useFakeTimers();
        const wrapper = renderSelect();

        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('change', { target: { value: 'F' } });
        wrapper.find('input').simulate('change', { target: { value: 'o' } });
        jest.runAllTimers();
        wrapper.find('input').simulate('change', { target: { value: 'o' } });

        expect(wrapper.update().find(SelectList).prop('filterText')).toBe('o');
      });
    });

    describe('and the onChange prop is passed', () => {
      it('then that prop should be called with the same value', () => {
        const onChangeFn = jest.fn();
        const changeEventObject = { target: { value: 'Foo' } };
        const wrapper = renderSelect({ onChange: onChangeFn, hasTypeToSearch: true });

        wrapper.find('input').simulate('change', changeEventObject);
        expect(onChangeFn).toHaveBeenCalledWith(changeEventObject.target.value);
      });
    });

    describe('with hasTypeToSearch prop set to true', () => {
      it('the SelectList should have the filterText prop the same as the value', () => {
        const changeEventObject = { target: { value: 'Foo' } };
        const wrapper = renderSelect({ hasTypeToSearch: true });

        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('change', changeEventObject);
        expect(wrapper.update().find(SelectList).prop('filterText')).toBe('Foo');
      });
    });
  });

  describe('when the onSelectOption is called in the SelectList', () => {
    const mockOptionObject = {
      value: 'Foo',
      text: 'Bar'
    };

    it('the SelectList should be closed', () => {
      const wrapper = renderSelect();

      wrapper.find('input').simulate('focus');
      expect(wrapper.find(SelectList).exists()).toBe(true);
      act(() => {
        wrapper.find(SelectList).prop('onSelectOption')(mockOptionObject);
      });
      expect(wrapper.update().find(SelectList).exists()).toBe(false);
    });

    describe('and the onChange prop is passed', () => {
      it('then that prop should be called with the same value', () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ onChange: onChangeFn });

        wrapper.find('input').simulate('focus');
        act(() => {
          wrapper.find(SelectList).prop('onSelectOption')(mockOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(mockOptionObject.value);
      });
    });
  });

  describe('when the onSelectListClose is called in the SelectList', () => {
    it('the SelectList should be closed', () => {
      const wrapper = renderSelect();

      wrapper.find('input').simulate('focus');
      expect(wrapper.find(SelectList).exists()).toBe(true);
      act(() => {
        wrapper.find(SelectList).prop('onSelectListClose')();
      });
      expect(wrapper.update().find(SelectList).exists()).toBe(false);
    });

    describe('and the visible text was changed', () => {
      it('then the formattedValue prop in Textbox should be reverted to previous value', () => {
        const selectedOptionTextValue = 'green';
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ onChange: onChangeFn, defaultValue: 'opt2', hasTypeToSearch: true });
        const changeEventObject = { target: { value: 'Foo' } };

        wrapper.find('input').simulate('focus');
        expect(wrapper.find(Textbox).prop('formattedValue')).toBe(selectedOptionTextValue);
        wrapper.find('input').simulate('change', changeEventObject);
        expect(wrapper.find(Textbox).prop('formattedValue')).toBe('Foo');
        act(() => {
          wrapper.find(SelectList).prop('onSelectListClose')();
        });
        expect(wrapper.update().find(Textbox).prop('formattedValue')).toBe(selectedOptionTextValue);
      });
    });
  });

  describe('when an HTML element is clicked', () => {
    let wrapper;
    let domNode;

    beforeEach(() => {
      wrapper = mount(getSelect());
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    describe('and that element is part of the Select', () => {
      it('then the SelectList should be open', () => {
        wrapper.find('input').simulate('focus');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(SelectList).getDOMNode().dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(true);
      });
    });

    describe('and that element is not part of the Select', () => {
      it('then the SelectList should be closed', () => {
        wrapper.find('input').simulate('focus');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(false);
      });
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });
  });
});

function renderSelect(props = {}, renderer = mount) {
  return renderer(getSelect(props));
}

function getSelect(props) {
  return (
    <SimpleSelect
      name='testSelect'
      id='testSelect'
      { ...props }
    >
      <Option value='opt1' text='red' />
      <Option value='opt2' text='green' />
      <Option value='opt3' text='blue' />
    </SimpleSelect>
  );
}
