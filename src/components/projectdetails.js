/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledProjectDetails = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin-top: 50px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .project-card {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    text-align: center;
    color: var (--lightest-slate);
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

const ProjectDetails = ({ projects, selectedMacro, selectedMicro, onBack }) => {
  const filteredProjects = projects.filter(
    project => project.tags.MACRO === selectedMacro && project.tags.MICRO === selectedMicro,
  );

  return (
    <StyledProjectDetails>
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      {filteredProjects.map(project => (
        <li key={project.name} className="project-card">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </li>
      ))}
    </StyledProjectDetails>
  );
};

export default ProjectDetails;
