import * as React from 'react';
import Option from '../option';

export interface SimpleSelectProps {
  /** The selected value(s), when the component is operating in controlled mode */
  value: string | object;
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue: string | object;
  /** Id attribute of the input element */
  id: string;
  /** Name attribute of the input element */
  name: string;
  /** Child components (such as Option) for the SelectList */
  children: typeof Option[];
  /** If true the Component will be read-only */
  readOnly?: boolean;
  /** If true the Component will be disabled? */
  disabled?: boolean;
  /** If true, focus opens the menu */
  opensOnFocus?: boolean;
  /** Size of an input */
  size: 'small' | 'medium' | 'large';
  /** If true the component input has no border and is transparent */
  transparent?: boolean;
  /** If true the Component has type to search functionality */
  hasTypeToSearch?: boolean;
  /** A callback to retrieve the input reference */
  assignInputRef?: () => React.RefObject<HTMLInputElement>;
  /** A custom callback for when the dropdown menu opens */
  onOpen?: () => void;
  /** A custom callback for when changes occur */
  onChange?: () => void;
  /** Callback function for when the Select Textbox is clicked. */
  onClick?: () => void;
  /** Callback function for when the Select Textbox is focused. */
  onFocus?: () => void;
}

declare const SimpleSelect: React.ComponentType<SimpleSelectProps>;

export default SimpleSelect;
