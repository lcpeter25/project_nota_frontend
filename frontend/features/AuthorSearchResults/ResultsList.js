import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'
import ResourceTile from './AuthorTile';
const ResultsList = props => {
  const {results, loading} = props;
  if (loading) {
    return (
      <section aria-live="polite" aria-busy="true">
  LOADING!
</section>
    )
  }
  return (
    <section aria-live="polite" aria-busy="true">
      <ResourcesListContainer>
        {results.map(r => (
          <ResourceItem key={r.id}>
            
            <ResourceTile key={r} data={r}/>
          </ResourceItem>
        ))}
        
      </ResourcesListContainer>
    </section>
  );
};

ResultsList.propTypes = {
  
};

const ResourcesListContainer = styled.ul`
  display: flex;
  /* justify-content: space-between;
  flex-wrap: wrap; */
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  /* margin: 0; */
  /* margin: 0 -1rem; */
  padding: 0;
  width: 100%;
`

const ResourceItem = styled.li`
  display: flex;
  padding: 1rem;
  width: 100%;
  /* @media(min-width: 40rem) {
    width: 50%;
  } */
  /* @media(min-width: 56rem) {
    width: 33.3333%;
  } */

`

export default ResultsList;