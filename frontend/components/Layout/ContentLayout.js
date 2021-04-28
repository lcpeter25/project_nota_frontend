import React from 'react';
import PropTypes from 'prop-types';
import styled from "@emotion/styled";

const ContentLayout = props => {
  const {title, children} = props;
  return (
    <StyledContainer>
      <StyledHeading>{title}</StyledHeading>
      {children}
    </StyledContainer>
  );
};

ContentLayout.propTypes = {
  title: PropTypes.string.isRequired
};

export default ContentLayout;

const StyledContainer = styled.div`
  margin-top: 20px;
  padding: 0px 60px;
`
const StyledHeading = styled.h1`
  font-size: 36px;
  color: var(--text-dark)
`