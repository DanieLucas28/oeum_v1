/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
// src/components/MacroView.js
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
// src/components/MacroView.js
import React from 'react';
import styled from 'styled-components';
import TransitionButton from './TransitionButton';

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`;

const FixedButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  ${({ theme }) => theme.mixins.bigButton}; /* Aplicando a mixin bigButton */
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

const MacroView = ({ macros, onMacroClick, onOverviewClick, onDetailsClick }) => {
  // Ordenar a lista de macros, colocando "Other" por último
  const sortedMacros = [...macros].sort((a, b) => {
    if (a.name === 'Other') {
      return 1;
    }
    if (b.name === 'Other') {
      return -1;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <ButtonContainer>
        {sortedMacros
          .filter(macro => macro.name)
          .map((macro, index) => (
            <TransitionButton
              key={index}
              label={macro.name}
              onClick={() => onMacroClick(macro.name)}
              micros={macro.micros} // Passando a lista de MICROS
            />
          ))}
      </ButtonContainer>
      <FixedButtonContainer>
        <Button onClick={onOverviewClick}>Overview</Button>
        <Button onClick={onDetailsClick}>Details</Button>
      </FixedButtonContainer>
    </>
  );
};

export default MacroView;
