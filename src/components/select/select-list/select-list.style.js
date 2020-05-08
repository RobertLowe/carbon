import styled from 'styled-components';
import { baseTheme } from '../../../style/themes';

const StyledSelectList = styled.ul`
  position: absolute;
  left: 0;
  background-color: white;
  border: 1px solid rgb(20, 20, 20, 0.5);
  box-sizing: border-box;
  box-shadow: ${({ theme }) => `${theme.shadows.depth1}`};
  list-style-type: none;
  max-height: ${props => `${props.maxHeight}`};
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
  width: 100%;
  z-index: 1;
`;

StyledSelectList.defaultProps = {
  maxHeight: '180px',
  theme: baseTheme
};

export default StyledSelectList;
