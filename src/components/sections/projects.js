import React, { useState, useEffect, useRef } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import MacroView from '../macroview';
import MicroView from '../microview';
import ProjectDetails from '../projectdetails';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const Projects = () => {
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
  const projects = data.githubRepos.nodes.map(repo => ({
    ...repo,
    tags: {
      MACRO: repo.description ? (repo.description.match(/MACRO:([^;]+)/) || [])[1] : null,
      MICRO: repo.description ? (repo.description.match(/MICRO:([^;]+)/) || [])[1] : null,
      LIBS: repo.description ? (repo.description.match(/LIBS:([^;]+)/) || [])[1] : null,
    },
  }));

  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const handleMacroClick = macro => {
    setSelectedMacro(macro);
    setView('micro');
  };

  const handleMicroClick = micro => {
    setSelectedMicro(micro);
    setView('details');
  };

  const handleBackToMacro = () => {
    setSelectedMacro(null);
    setView('macro');
  };

  const handleBackToMicro = () => {
    setSelectedMicro(null);
    setView('micro');
  };

  return (
    <StyledProjectsSection id="projects">
      <h2 ref={revealTitle}>Projects</h2>
      <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link>

      {view === 'macro' && <MacroView projects={projects} onMacroClick={handleMacroClick} />}
      {view === 'micro' && (
        <MicroView
          projects={projects}
          selectedMacro={selectedMacro}
          onMicroClick={handleMicroClick}
          onBack={handleBackToMacro}
        />
      )}
      {view === 'details' && (
        <ProjectDetails
          projects={projects}
          selectedMacro={selectedMacro}
          selectedMicro={selectedMicro}
          onBack={handleBackToMicro}
        />
      )}
    </StyledProjectsSection>
  );
};

export default Projects;
