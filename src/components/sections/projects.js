/* eslint-disable no-undef */
// src/pages/index.js
import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import MacroView from '../macroview';
import MicroView from '../microview';
import ProjectView from '../projectdetails';
import Overview from '../Overview';
import styled from 'styled-components';
import { MicrosHeightProvider } from '../../context/MicrosHeightContext';
import { extractTags } from '../../utils/extractTags';

const StyledJProject = styled.section`
  max-width: 1000px;
  justify-content: center;
  .inner {
    display: grid;
    justify-content: center;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      githubRepos: allGithubRepo {
        nodes {
          name
          description
          url
        }
      }
    }
  `);

  const [view, setView] = useState('macro');
  const [selectedMacro, setSelectedMacro] = useState(null);
  const [selectedMicro, setSelectedMicro] = useState(null);

  const projects = data.githubRepos.nodes
    .map(repo => ({
      ...repo,
      tags: extractTags(repo.description),
    }))
    .filter(project => project.tags.MACRO); // Filtra projetos sem a tag MACRO

  const macros = [...new Set(projects.map(project => project.tags.MACRO))].map(macro => ({
    name: macro,
    micros: projects
      .filter(project => project.tags.MACRO === macro)
      .map(project => project.tags.MICRO)
      .sort(), // Obtendo e ordenando a lista de MICROS
  }));

  const micros = selectedMacro
    ? [
      ...new Set(
        projects
          .filter(project => project.tags.MACRO === selectedMacro)
          .map(project => project.tags.MICRO),
      ),
    ].map(micro => ({
      name: micro,
      count: projects.filter(project => project.tags.MICRO === micro).length,
    }))
    : [];

  const filteredProjects = selectedMicro
    ? projects.filter(project => project.tags.MICRO === selectedMicro)
    : [];

  const handleMacroClick = macro => {
    setSelectedMacro(macro);
    setView('micro');
  };

  const handleMicroClick = micro => {
    if (micro === 'dashboard') {
      setView('micro-dashboard');
    } else if (micro === 'back') {
      setView('macro');
    } else {
      setSelectedMicro(micro);
      setView('project');
    }
  };

  const handleOverviewClick = () => {
    setView('macro');
  };

  const handleDetailsClick = () => {
    setView('overview');
  };

  return (
    <>
      <StyledJProject>
        <h2 className="numbered-heading">Projects</h2>
        <MicrosHeightProvider>
          <Container>
            {view === 'macro' && (
              <MacroView
                macros={macros}
                onMacroClick={handleMacroClick}
                onOverviewClick={handleOverviewClick}
                onDetailsClick={handleDetailsClick}
              />
            )}
            {view === 'micro' && <MicroView micros={micros} onMicroClick={handleMicroClick} />}
            {view === 'project' && <ProjectView projects={filteredProjects} />}
            {view === 'overview' && <Overview onBack={() => setView('macro')} />}
          </Container>
        </MicrosHeightProvider>
      </StyledJProject>
    </>
  );
};

export default IndexPage;
