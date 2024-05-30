/* eslint-disable react/prop-types */
// src/components/Overview.js
import React from 'react';
import styled from 'styled-components';

const OverviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  color: var(--navy);
  flex-direction: column;
`;

const OverviewButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  color: white;
  cursor: pointer;
  margin-top: 20px;
  transition: var(--transition);

  &:hover {
    background-color: var(--navy);
  }
`;

const Overview = ({ onBack }) => (
  <OverviewContainer>
    <h1>Overview</h1>
    <OverviewButton onClick={onBack}>Voltar</OverviewButton>
  </OverviewContainer>
);

export default Overview;
