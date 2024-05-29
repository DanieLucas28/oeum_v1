/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styled from 'styled-components';

const StyledMacroView = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin-top: 50px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .macro-card {
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
`;

const MacroView = ({ projects, onMacroClick }) => {
  const macros = [...new Set(projects.flatMap(project => project.tags.MACRO || []))];

  return (
    <StyledMacroView>
      {macros.map(macro => (
        <li key={macro} className="macro-card" onClick={() => onMacroClick(macro)}>
          <h3>{macro}</h3>
          <p>Total Projects: {projects.filter(project => project.tags.MACRO === macro).length}</p>
        </li>
      ))}
    </StyledMacroView>
  );
};

export default MacroView;
