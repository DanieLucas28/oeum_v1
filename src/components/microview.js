/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// src/components/MicroView.js
import React from 'react';
import styled from 'styled-components';
import MicroButton from './MicroButton';

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  ${({ theme }) => theme.mixins.bigButton};
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
    transform: translateY(-5px);
  }
`;

const truncateDescription = description => {
  const regex = /MACRO.*/i;
  return description.replace(regex, '').trim();
};

const extractMacroValue = description => {
  console.log(description);
  const microRegex = /MICRO:\s*([^;]+);/i;
  const langRegex = /LANG:\s*([^;]+);/i;
  const libsRegex = /LIBS:\s*([^;]+);/i;

  const microMatch = description.match(microRegex);
  const langMatch = description.match(langRegex);
  const libsMatch = description.match(libsRegex);

  console.log(microMatch);
  console.log(langMatch);
  console.log(libsMatch);

  const micro = microMatch ? microMatch[1].trim() : '';
  const lang = langMatch ? langMatch[1].trim() : '';
  const libs = libsMatch
    ? libsMatch[1]
      .trim()
      .split(',')
      .map(lib => lib.trim())
    : [];

  // Criação da lista com os valores únicos
  const uniqueValues = [lang, micro, ...libs];

  // Removendo valores vazios e ordenando conforme a prioridade: LANG, MICRO, LIBS
  console.log(uniqueValues);
  return uniqueValues.filter(Boolean);
};

const MicroView = ({ projects, onMicroClick, onDetailsClick }) => (
  <>
    <ButtonContainer>
      {projects.map(project => (
        <MicroButton
          key={project.id}
          label={project.name}
          description={truncateDescription(project.description)}
          url={project.url}
          micro={extractMacroValue(project.description)}
        />
      ))}
    </ButtonContainer>
    <FixedButtonContainer>
      <Button onClick={onMicroClick}>Overview</Button>
      <Button onClick={onDetailsClick}>Details</Button>
    </FixedButtonContainer>
  </>
);

export default MicroView;
