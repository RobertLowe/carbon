import React, {
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import StyledSelectList from './select-list.style';
import Events from '../../../utils/helpers/events/events';
import updateListScrollTop from './update-list-scroll';
import filterChildren from '../../../utils/filter-children';
import StyledOption from '../option/option.style';
import highlightPartOfText from './highlight-part-of-text';

const SelectList = ({
  id,
  children,
  onSelectOption,
  onSelectListClose,
  filterText,
  hasTypeToSearch
}) => {
  const list = useRef();
  const [currentOptionsListIndex, setCurrentOptionsListIndex] = useState(-1);

  const handleGlobalKeydown = useCallback((event) => {
    let newIndex;
    const isNoOptionSelected = currentOptionsListIndex === -1;
    const optionsList = React.Children.toArray(children);
    const lastIndex = optionsList.length - 1;

    if (Events.isTabKey(event) || Events.isEscKey(event)) {
      onSelectListClose();
    } else if (Events.isEnterKey(event)) {
      if (isNoOptionSelected) {
        return;
      }

      const { text, value } = optionsList[currentOptionsListIndex].props;

      onSelectOption({ text, value });
    } else if (Events.isDownKey(event)) {
      if (currentOptionsListIndex === lastIndex || isNoOptionSelected) {
        newIndex = 0;
      } else {
        newIndex = currentOptionsListIndex + 1;
      }

      setCurrentOptionsListIndex(newIndex);
      updateListScrollTop(newIndex, list.current);
    } else if (Events.isUpKey(event)) {
      if (currentOptionsListIndex === 0 || isNoOptionSelected) {
        newIndex = lastIndex;
      } else {
        newIndex = currentOptionsListIndex - 1;
      }

      setCurrentOptionsListIndex(newIndex);
      updateListScrollTop(newIndex, list.current);
    }
  }, [currentOptionsListIndex, children, onSelectListClose, onSelectOption]);

  useEffect(() => {
    const keyboardEvent = 'keydown';

    document.addEventListener(keyboardEvent, handleGlobalKeydown);

    return function cleanup() {
      document.removeEventListener(keyboardEvent, handleGlobalKeydown);
    };
  }, [handleGlobalKeydown]);

  useEffect(() => {
    let indexOfMatch = -1;

    if (filterText) {
      indexOfMatch = React.Children.toArray(children).findIndex((child) => {
        return child.props.text && child.props.text.toLowerCase().startsWith(filterText.toLowerCase());
      });
    }

    setCurrentOptionsListIndex(indexOfMatch);
    updateListScrollTop(indexOfMatch, list.current);
  }, [children, filterText]);

  function getFilteredChildren() {
    let filteredElements = children;

    if (hasTypeToSearch && filterText.length > 2) {
      filteredElements = filterChildren({ value: filterText })(children);
    }

    if (!filteredElements) {
      const noResultsText = I18n.t('select.no_results', {
        defaultValue: 'No results'
      });

      return (<StyledOption>{ noResultsText }</StyledOption>);
    }

    return getChildrenWithListProps(filteredElements);
  }

  function getChildrenWithListProps(filteredElements) {
    return React.Children.map(filteredElements, (child, index) => {
      const newProps = {
        onSelectOption,
        index,
        selectedIndex: currentOptionsListIndex
      };

      if (hasTypeToSearch && filterText.length > 2) {
        newProps.children = highlightPartOfText(child.props.text, filterText);
      }

      return React.cloneElement(child, newProps);
    });
  }

  function handleMouseOver() {
    setCurrentOptionsListIndex(-1);
  }

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <StyledSelectList
      id={ id }
      role='listbox'
      ref={ list }
      onMouseOver={ handleMouseOver }
    >
      { getFilteredChildren() }
    </StyledSelectList>
  );
};

SelectList.propTypes = {
  /** The ID for the parent <div> */
  id: PropTypes.string,
  /** Child components (such as <Option>) for the <ScrollableList> */
  children: PropTypes.node,
  /** A callback for when a child is selected */
  onSelectOption: PropTypes.func,
  /** A callback for when the list should be closed */
  onSelectListClose: PropTypes.func,
  /** Text value to highlight an option */
  filterText: PropTypes.string,
  /** If true the Component has type to search functionality */
  hasTypeToSearch: PropTypes.bool
};

export default SelectList;
