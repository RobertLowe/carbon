import styled, { css } from 'styled-components';
import InputPresentationStyle from '../../../__experimental__/components/input/input-presentation.style';
import StyledInput from '../../../__experimental__/components/input/input.style';
import InputIconToggleStyle from '../../../__experimental__/components/input-icon-toggle/input-icon-toggle.style';
import { baseTheme } from '../../../style/themes';

const StyledSimpleSelect = styled.div`
  position: relative;

  ${({ hasFilter }) => !hasFilter && css`
    ${StyledInput} {
      cursor: default;
      color: transparent;
      user-select: none;
      text-shadow: 0 0 0 ${({ theme }) => theme.text.color};

      ::placeholder {
        text-shadow: 0 0 0 ${({ theme }) => theme.text.placeholder};
      }
    }
  `}

  ${({ transparent }) => transparent && css`
    ${InputPresentationStyle} {
      background: transparent;
      border: none;
    }

    ${StyledInput} {
      font-weight: 900;
      text-align: right;
    }

    ${InputIconToggleStyle} {
      width: auto;
    }
  `}
`;

StyledSimpleSelect.defaultProps = {
  theme: baseTheme
};

export default StyledSimpleSelect;
