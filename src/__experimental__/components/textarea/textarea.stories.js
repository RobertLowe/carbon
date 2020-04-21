import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, number, text, select
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Textarea from '.';
import { notes, info } from './documentation';
import { OriginalTextarea } from './textarea.component';
import getDocGenInfo from '../../../utils/helpers/docgen-info';
import AutoFocus from '../../../utils/helpers/auto-focus';
import guid from '../../../utils/helpers/guid';

OriginalTextarea.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /textarea\.component(?!spec)/
);

const store = new Store({
  value: ''
});

const handleChange = ({ target: { value } }) => {
  store.set({ value });
};

const rangeOptions = {
  range: true,
  min: 0,
  max: 300,
  step: 1
};
const percentageRange = {
  range: true,
  min: 0,
  max: 100,
  step: 1
};

const previous = {
  key: guid(),
  autoFocus: false
};

const defaultComponent = () => {
  const expandable = boolean('expandable', Textarea.defaultProps.expandable);
  const cols = number('cols', 0, rangeOptions);
  const rows = number('rows', 0, rangeOptions);
  const disabled = boolean('disabled', false);
  const autoFocus = boolean('autoFocus', false);
  const readOnly = boolean('readOnly', false);
  const placeholder = text('placeholder', '');
  const fieldHelp = text('fieldHelp', '');
  const characterLimit = text('characterLimit', '');
  const inputWidth = number('inputWidth', 100, percentageRange);
  const warnOverLimit = characterLimit ? boolean('warnOverLimit', Textarea.defaultProps.warnOverLimit) : undefined;
  const enforceCharacterLimit = characterLimit ? boolean(
    'enforceCharacterLimit',
    Textarea.defaultProps.enforceCharacterLimit
  ) : undefined;
  const label = text('label', '');
  const labelHelp = label ? text('labelHelp', '') : undefined;
  const labelInline = label ? boolean('labelInline', false) : undefined;
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;
  const key = AutoFocus.getKey(autoFocus, previous);

  return (
    <State store={ store }>
      <Textarea
        key={ key }
        name='textarea'
        onChange={ handleChange }
        warnOverLimit={ warnOverLimit }
        expandable={ expandable }
        characterLimit={ characterLimit }
        enforceCharacterLimit={ enforceCharacterLimit }
        cols={ cols }
        rows={ rows }
        disabled={ disabled }
        autoFocus={ autoFocus }
        readOnly={ readOnly }
        placeholder={ placeholder }
        fieldHelp={ fieldHelp }
        label={ label }
        labelHelp={ labelHelp }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        inputWidth={ inputWidth }
        labelAlign={ labelAlign }
      />
    </State>
  );
};

const autoFocusComponent = () => {
  boolean('autoFocus', true);
  return defaultComponent();
};

function makeStory(name, themeSelector, component) {
  const metadata = {
    themeSelector,
    info: { text: info, propTables: [OriginalTextarea], propTablesExclude: [Textarea] },
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

function makeValidationsStory(name, themeSelector) {
  const component = () => {
    return (
      <>
        <h4>Validation as string</h4>
        {[{ error: 'Error' }, { warning: 'Warning' }, { info: 'Info' }].map(validation => (
          <Textarea
            name='textarea'
            label='Textarea Validation'
            labelHelp='Returns an error when the field is empty'
            fieldHelp='Validates on blur'
            { ...validation }
          />
        ))}

        <h4>Validation as boolean</h4>
        {[{ error: true }, { warning: true }, { info: true }].map(validation => (
          <Textarea
            name='textarea'
            label='Textarea Validation'
            labelHelp='Returns an error when the field is empty'
            fieldHelp='Validates on blur'
            { ...validation }
          />
        ))}
      </>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      source: false,
      propTablesExclude: [Textarea]
    }
  };

  return [name, component, metadata];
}

storiesOf('Experimental/Textarea', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add(...makeStory('default', dlsThemeSelector, defaultComponent))
  .add(...makeStory('classic', classicThemeSelector, defaultComponent))
  .add(...makeValidationsStory('validations', dlsThemeSelector))
  .add(...makeValidationsStory('validations classic', classicThemeSelector))
  .add(...makeStory('autoFocus', dlsThemeSelector, autoFocusComponent));
