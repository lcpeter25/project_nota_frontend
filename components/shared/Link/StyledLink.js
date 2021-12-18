import styled from '@emotion/styled';
import * as colors from 'styles/colors';


const StyledLink = styled.a`
  color: ${colors.navyBlue};
  text-decoration: underline;
  font-size: 2.5rem;
  cursor: pointer;
  &:hover {
    color: ${colors.lightCream};
    background: ${colors.navyBlue};
    /* text-decoration-style: dashed; */
  }
`

export default StyledLink;