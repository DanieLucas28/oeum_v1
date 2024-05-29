/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledMicroView = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin-top: 50px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .micro-card {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    cursor: pointer;
    text-align: center;
    color: var(--lightest-slate);
    transition: var(--transition);
    overflow: auto;

    &:hover,
    &:focus-within {
      transform: translateY(-7px);
    }
  }

  .back-button {
    margin: 20px;
    padding: 10px 20px;
    background-color: var(--dark-navy);
    color: var(--lightest-slate);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
  }
`;

const MicroView = ({ projects, selectedMacro, onMicroClick, onBack }) => {
  const micros = [
    ...new Set(
      projects
        .filter(project => project.tags.MACRO === selectedMacro)
        .flatMap(project => project.tags.MICRO || []),
    ),
  ];

  return (
    <StyledMicroView>
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      {micros.map(micro => (
        <li key={micro} className="micro-card" onClick={() => onMicroClick(micro)}>
          <h3>{micro}</h3>
          <p>Total Projects: {projects.filter(project => project.tags.MICRO === micro).length}</p>
        </li>
      ))}
    </StyledMicroView>
  );
};

export default MicroView;
