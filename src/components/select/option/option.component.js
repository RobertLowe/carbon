import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StyledOption from './option.style';

const Option = ({
  text,
  children,
  onSelectOption,
  value,
  index,
  selectedIndex
}) => {
  const [isHighlighted, setIsHighlighted] = useState();
  useEffect(() => {
    setIsHighlighted(index === selectedIndex);
  }, [index, selectedIndex]);

  function handleClick() {
    onSelectOption({ text, value });
  }

  return (
    <StyledOption
      aria-selected={ isHighlighted }
      data-component='option'
      onClick={ handleClick }
      isHighlighted={ isHighlighted }
      role='option'
    >
      { children || text }
    </StyledOption>
  );
};

Option.propTypes = {
  /** The option's visible text, displayed within <Textbox> of <Select>, and used for filtering */
  text: PropTypes.string.isRequired,
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children: PropTypes.node,
  /** The option's invisible internal value */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  /** Callback to return value when the element is selected (prop added by the SelectList component) */
  onSelectOption: PropTypes.func,
  /** Index of the option in the SelectList (prop added by the SelectList component) */
  index: PropTypes.number,
  /** Currently selected index (prop added by the SelectList component) */
  selectedIndex: PropTypes.number
};

export default Option;
