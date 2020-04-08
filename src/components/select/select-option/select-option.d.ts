import * as React from 'react';

export interface SimpleSelectProps {
  /** The option's visible text, displayed within <Textbox> of <Select>, and used for filtering */
  text: string;
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children?: React.FunctionComponent | React.ComponentClass;
  /** The option's invisible internal value */
  value: string | object;
  /** Callback to return value when the element is selected */
  onSelectOption: () => void;
}

declare const SimpleSelect: React.ComponentType<SimpleSelectProps>;

export default SimpleSelect;
