import styled, { css } from 'styled-components';
import { baseTheme } from '../../../style/themes';
import sizes from '../../../__experimental__/components/input/input-sizes.style';

const StyledSimpleSelectInput = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: block;
  height: 36px;
  width: 100%;

  min-height: ${({ size }) => sizes[size].height};
  padding-left: ${({ size }) => sizes[size].horizontalPadding};
  padding-right: ${({ size }) => sizes[size].horizontalPadding};


  ${({ theme }) => css`
    :focus {
      outline: 3px solid ${theme.colors.focus};
      z-index: 2;
    }
  `}

`;

StyledSimpleSelectInput.defaultProps = {
  size: 'medium',
  theme: baseTheme
};

export default StyledSimpleSelectInput;
