import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import Textbox from '../../../__experimental__/components/textbox';
import StyledSimpleSelect from './simple-select.style';
import SelectList from '../select-list';
import guid from '../../../utils/helpers/guid';
import Events from '../../../utils/helpers/events';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const SimpleSelect = ({
  value,
  defaultValue,
  id,
  name,
  disabled,
  readOnly,
  children,
  size,
  transparent,
  hasTypeToSearch,
  opensOnFocus,
  assignInputRef,
  onOpen,
  onChange,
  onClick,
  onFocus
}) => {
  const selectListId = guid();
  const containerRef = useRef();
  const filterTimer = useRef();
  const isTimerCounting = useRef();
  const [isOpen, setOpenState] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const setOpen = useCallback((val) => {
    if (val && !isOpen && onOpen) {
      onOpen();
    }

    setOpenState(val);
  }, [isOpen, onOpen]);

  const setMatchingText = useCallback((newValue) => {
    const matchingOption = React.Children.toArray(children).find(option => (option.props.value === newValue));

    if (matchingOption) {
      setTextValue(matchingOption.props.text);
    }
  }, [children]);

  const handleTextboxChange = useCallback((event) => {
    if (onChange) {
      onChange(event.target.value);
    }

    if (hasTypeToSearch) {
      setTextValue(event.target.value);
      setFilterValue(event.target.value);

      return;
    }

    const newCharacter = event.target.value.slice(-1);

    if (isTimerCounting.current) {
      setFilterValue(prev => prev + newCharacter);
      clearTimeout(filterTimer.current);
    } else {
      setFilterValue(newCharacter);
    }

    isTimerCounting.current = true;

    filterTimer.current = setTimeout(() => {
      isTimerCounting.current = false;
    }, 500);
  }, [hasTypeToSearch, onChange]);

  const handleTextboxKeydown = useCallback(((event) => {
    if (Events.isEnterKey(event) || Events.isDownKey(event) || Events.isUpKey(event)) {
      setOpen(true);
    }
  }), [setOpen]);

  const handleGlobalClick = useCallback((event) => {
    if (!Events.composedPath(event).includes(containerRef.current)) {
      setMatchingText(selectedValue);
      setOpen(false);
      setFilterValue('');
    }
  }, [setMatchingText, setOpen, selectedValue]);

  useEffect(() => {
    const newValue = value || defaultValue;

    setSelectedValue(newValue);
    setMatchingText(newValue);
  }, [value, defaultValue, setMatchingText]);

  useEffect(() => {
    const clickEvent = 'click';

    document.addEventListener(clickEvent, handleGlobalClick);

    return function cleanup() {
      document.removeEventListener(clickEvent, handleGlobalClick);
    };
  }, [handleGlobalClick]);

  useEffect(() => {
    return function cleanup() {
      clearTimeout(filterTimer.current);
    };
  }, []);

  function handleTextboxClick() {
    if (onClick) {
      onClick();
    }

    openList();
  }

  function handleTextboxFocus() {
    if (onFocus) {
      onFocus();
    }

    if (opensOnFocus) {
      openList();
    }
  }

  function openList() {
    if (disabled || readOnly) {
      return;
    }

    setOpen(true);

    if (onOpen) {
      onOpen();
    }
  }

  function onSelectOption(optionData) {
    setOpen(false);
    setSelectedValue(optionData.value);
    setTextValue(optionData.text);
    setFilterValue('');

    if (onChange) {
      onChange(optionData.value);
    }
  }

  function onSelectListClose() {
    setOpen(false);
    setFilterValue('');
    setMatchingText(selectedValue);
  }

  function getTextboxProps() {
    return {
      id,
      name,
      disabled,
      readOnly,
      size,
      assignInputRef,
      value: selectedValue,
      formattedValue: textValue,
      inputRef: assignInputRef,
      onClick: handleTextboxClick,
      onFocus: handleTextboxFocus,
      onKeyDown: handleTextboxKeydown,
      onChange: handleTextboxChange
    };
  }

  return (
    <StyledSimpleSelect
      transparent={ transparent }
      hasTypeToSearch={ hasTypeToSearch }
      ref={ containerRef }
    >
      <Textbox
        aria-controls={ isOpen ? selectListId : '' }
        aria-expanded={ isOpen }
        inputIcon='dropdown'
        placeholder='Please Select...'
        { ...getTextboxProps() }
      />
      { isOpen && (
        <SelectList
          id={ selectListId }
          onSelectOption={ onSelectOption }
          onSelectListClose={ onSelectListClose }
          filterText={ filterValue }
          hasTypeToSearch={ hasTypeToSearch }
        >
          { children }
        </SelectList>
      ) }
    </StyledSimpleSelect>
  );
};

SimpleSelect.defaultProps = {
  opensOnFocus: true
};

const valuePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object
]);

SimpleSelect.propTypes = {
  /** The selected value(s), when the component is operating in controlled mode */
  value: valuePropType,
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue: valuePropType,
  /** ID attribute of the component */
  id: PropTypes.string,
  /** Name attribute of the component */
  name: PropTypes.string,
  /** Child components (such as Option) for the SelectList */
  children: PropTypes.node,
  /** If true the Component will be read-only */
  readOnly: PropTypes.bool,
  /** If true the Component will be disabled? */
  disabled: PropTypes.bool,
  /** Focus opens the menu */
  opensOnFocus: PropTypes.bool,
  /** Size of an input */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** If true the component input has no border and is transparent */
  transparent: PropTypes.bool,
  /** A callback to retrieve the input reference */
  assignInputRef: PropTypes.func,
  /** A custom callback for when the dropdown menu opens */
  onOpen: PropTypes.func,
  /** A custom callback for when changes occur */
  onChange: PropTypes.func,
  /** Callback function for when the Select Textbox is clicked. */
  onClick: PropTypes.func,
  /** Callback function for when the Select Textbox is focused. */
  onFocus: PropTypes.func,
  /** If true the Component has type to search functionality */
  hasTypeToSearch: PropTypes.bool
};

export default SimpleSelect;
