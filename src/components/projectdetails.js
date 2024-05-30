/* eslint-disable react/prop-types */
// src/components/ProjectView.js
import React from 'react';
import styled from 'styled-components';

const ProjectCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  ${({ theme }) => theme.mixins.flexBetween};
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  height: 100%;
  padding: 2rem 1.75rem;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  transition: var(--transition);
  overflow: auto;
  width: 100%;
  margin-bottom: 20px;

  &:hover,
  &:focus-visible {
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }
`;

const ProjectView = ({ projects }) => (
  <div>
    {projects.map((project, index) => (
      <ProjectCard key={index}>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <a
          href={`https://www.google.com/search?q=${project.name}`}
          target="_blank"
          rel="noopener noreferrer">
          Search
        </a>
      </ProjectCard>
    ))}
  </div>
);

export default ProjectView;
