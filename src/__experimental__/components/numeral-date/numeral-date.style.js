import styled, { css } from 'styled-components';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';
import StyledIconSpan from '../input-icon-toggle/input-icon-toggle.style';
import { baseTheme } from '../../../style/themes';
import StyledFormField from '../form-field/form-field.style';
import StyledInput from '../input/input-presentation.style';
import StyledIcon from '../../../components/icon/icon.style';

export const StyledNumeralDate = styled.div`
  display: inline-flex;
  border: 1px solid transparent;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 2px;
  padding-top: 1px; 

  ${StyledFormField} {
     margin-top: 0px;
  }
`;
StyledNumeralDate.defaultProps = { theme: baseTheme };


export const StyledDateField = styled.div`

${({
    isYearInput, theme, isEnd, showValidationIcon, isMiddle, dateFormatLength
  }) => {
    const yearInputOrError = isYearInput || (isEnd && showValidationIcon);

    return css`

      ${StyledInput} {
          position: relative;
          width: ${(yearInputOrError ? '78px;' : '58px;')};
          text-align: center;

            ${(isMiddle && dateFormatLength === 3) && css`
              border-left: none;
              border-right: none;
              :focus {
                  border-left: 1px;
                  border-right: 1px;
                }
            `}
            ${isMiddle && css`
              ${dateFormatLength < 3 && 'border-left: 1px;'}
              :focus {
                border-left: 1px;
                border-right: 1px;
              }
            `}

        ${StyledIcon} {
          display: flex;
          color: ${(theme.numeralDate.error)};
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        ${StyledIconSpan} {
          width: 32px;
          z-index: 999;
        }

        ${StyledValidationIcon} {
          margin-left: 0px;
          padding: 0px;
          z-index: 9000;
        }
      `;
  }
}`;

StyledDateField.defaultProps = { theme: baseTheme };
