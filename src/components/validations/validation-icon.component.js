import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Icon from '../icon';
import ValidationIconStyle from './validation-icon.style';
import { InputPresentationContext } from '../../__experimental__/components/input';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { isClassic } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';

const getValidationType = ({ error, warning, info }) => {
  if (error) return 'error';
  if (warning) return 'warning';
  if (info) return 'info';
  return '';
};

const ValidationIcon = ({
  error,
  warning,
  info,
  theme,
  type,
  size,
  iconId,
  isPartOfInput,
  tabIndex,
  isFocused,
  onClick
}) => {
  let modernTooltipProps = {};

  if (!isClassic(theme)) {
    // overrides default positioning for non legacy themes
    modernTooltipProps = {
      tooltipPosition: 'right',
      tooltipAlign: 'center',
      isThemeModern: true,
      isPartOfInput
    };
  }

  const validationType = getValidationType({ error, warning, info });

  const validationMessage = error || warning || info;

  return (
    <InputPresentationContext.Consumer>
      {
        context => (
          <ValidationIconStyle
            id={ iconId }
            validationType={ validationType }
            role='tooltip'
            aria-label={ validationMessage }
            onClick={ onClick }
          >
            <Icon
              key={ `${type}-icon` }
              tooltipType={ validationType }
              tooltipMessage={ validationMessage }
              tooltipVisible={ isFocused || (context && (context.hasFocus || context.hasMouseOver)) }
              type={ validationType }
              size={ size }
              tabIndex={ tabIndex }
              { ...modernTooltipProps }
            />
          </ValidationIconStyle>
        )
      }
    </InputPresentationContext.Consumer>
  );
};

ValidationIcon.propTypes = {
  /** A string to represent the type of validation */
  type: PropTypes.oneOf(OptionsHelper.validationTypes),
  /** A small string to indicate the size of the icon */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** The unique id of the component (used with aria-describedby for accessibility) */
  iconId: PropTypes.string,
  /** A message that the ValidationIcon component will display */
  tooltipMessage: PropTypes.string,
  /** Properties related to the theme */
  theme: PropTypes.object,
  /** A boolean to indicate if the icon is part of an input */
  onClick: PropTypes.func,
  /** An onClick handler */
  isPartOfInput: PropTypes.bool,
  /** Overrides the default tabindex of the component */
  tabIndex: PropTypes.number,
  /** A boolean received from IconWrapper */
  isFocused: PropTypes.bool,
  /** Status of error validations */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of warnings */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of info */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

ValidationIcon.defaultProps = {
  theme: baseTheme,
  tabIndex: -1
};

export default withTheme(ValidationIcon);
