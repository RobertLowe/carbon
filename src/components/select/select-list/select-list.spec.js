import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import SelectList from './select-list.component';
import { baseTheme } from '../../../style/themes';
import Option from '../option';

describe('Option', () => {
  describe('when a key is pressed', () => {
    let wrapper;
    const escapeKeyDownEvent = new KeyboardEvent('keydown', { which: 27, bubbles: true });
    const tabKeyDownEvent = new KeyboardEvent('keydown', { which: 9, bubbles: true });
    const enterKeyDownEvent = new KeyboardEvent('keydown', { which: 13, bubbles: true });
    const downKeyDownEvent = new KeyboardEvent('keydown', { which: 40, bubbles: true });
    const upKeyDownEvent = new KeyboardEvent('keydown', { which: 38, bubbles: true });
    let domNode;
    let onSelectListClose;
    let onSelectOption;

    beforeEach(() => {
      onSelectListClose = jest.fn();
      onSelectOption = jest.fn();
      wrapper = mount(getSelectList({ onSelectListClose, onSelectOption, filterText: '' }));
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    describe.each([
      ['Esc', escapeKeyDownEvent],
      ['Tab', tabKeyDownEvent]
    ])("and it's the %s key", (keyName, keyEvent) => {
      it('then the onSelectListClose prop should be called', () => {
        domNode.dispatchEvent(keyEvent);
        expect(onSelectListClose).toHaveBeenCalled();
      });
    });

    describe("and it's the Enter key", () => {
      describe('without an highlighted element', () => {
        it('then the onSelectOption prop should not be called', () => {
          domNode.dispatchEvent(enterKeyDownEvent);
          expect(onSelectOption).not.toHaveBeenCalled();
        });
      });

      describe('with an highlighted element', () => {
        it('then the onSelectOption prop should be called', () => {
          wrapper.setProps({ filterText: 'red' }).update();
          domNode.dispatchEvent(enterKeyDownEvent);
          expect(onSelectOption).toHaveBeenCalled();
        });
      });
    });

    describe("and it's the Down key", () => {
      it('then the first Option should be highlighted', () => {
        act(() => {
          domNode.dispatchEvent(downKeyDownEvent);
        });
        expect(wrapper.update().find(Option).first()).toHaveStyleRule('background-color', baseTheme.select.selected);
      });
    });

    describe("and it's the Up key", () => {
      it('then the last Option should be highlighted', () => {
        act(() => {
          domNode.dispatchEvent(upKeyDownEvent);
        });
        expect(wrapper.update().find(Option).last()).toHaveStyleRule('background-color', baseTheme.select.selected);
      });
    });

    // coverage filler
    it('does nothing if the other key is pressed', () => {
      act(() => {
        domNode.dispatchEvent(new KeyboardEvent('keydown', { which: 32, bubbles: true }));
      });
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });
  });

  describe('when one of the items is highlighted and the list is hovered over', () => {
    it('then the highlight on that Option should be removed', () => {
      const wrapper = renderSelectList();

      wrapper.setProps({ filterText: 'red' }).update();
      expect(wrapper.find(Option).first()).toHaveStyleRule('background-color', baseTheme.select.selected);
      wrapper.simulate('mouseOver');
      expect(wrapper.update().find(Option).first()).not.toHaveStyleRule('background-color', baseTheme.select.selected);
    });
  });

  describe('when rendered', () => {
    it('then Options should have additional props', () => {
      const onSelectOption = jest.fn();
      const wrapper = renderSelectList({ onSelectOption });

      expect(wrapper.find(Option).first().prop('onSelectOption')).toBe(onSelectOption);
      expect(wrapper.find(Option).first().prop('index')).toBe(0);
      expect(wrapper.find(Option).first().prop('selectedIndex')).toBe(-1);
    });
  });

  describe('when the hasTypeToSearch prop and filterText nas more that two characters', () => {
    describe('and one of the options text contains the filterText', () => {
      it('then there should be only one option selected', () => {
        const wrapper = renderSelectList({ hasTypeToSearch: true, filterText: 'gre' });

        expect(wrapper.find(Option)).toHaveLength(1);
      });
    });
  });

  describe('when the hasTypeToSearch prop and filterText nas more that two characters', () => {
    describe('and none of the options text contains the filterText', () => {
      it('then there should be only one option selected', () => {
        const wrapper = renderSelectList({ hasTypeToSearch: true, filterText: 'xyz' });

        expect(wrapper.find(SelectList).children()).toHaveLength(1);
        expect(wrapper.find(SelectList).children().at(0).text()).toBe('No results');
      });
    });
  });
});

function renderSelectList(props = {}, renderer = mount) {
  return renderer(getSelectList(props));
}

function getSelectList(props) {
  return (
    <SelectList { ...props }>
      <Option value='opt1' text='red' />
      <Option value='opt2' text='green' />
      <Option value='opt3' text='blue' />
    </SelectList>
  );
}
