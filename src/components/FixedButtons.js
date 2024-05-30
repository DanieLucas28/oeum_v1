/* eslint-disable react/prop-types */
// src/components/FixedButtons.js
import React from 'react';
import styled from 'styled-components';

const FixedContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 1rem;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  color: white;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  width: 120px;
  text-align: center;

  &:hover,
  &:focus-visible {
    background-color: var(--navy);
    transform: translateY(-5px); /* Efeito de subir */
  }
`;

const FixedButtons = ({ onOverviewClick, onDetailsClick }) => (
  <FixedContainer>
    <Button onClick={onOverviewClick}>Overview</Button>
    <Button onClick={onDetailsClick}>Details</Button>
  </FixedContainer>
);

export default FixedButtons;
