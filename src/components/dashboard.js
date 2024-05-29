import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import MacroView from './macroview';
import MicroView from './microview';
import ProjectDetails from './projectdetailstails';

const Dashboard = () => {
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
  const projects = data.githubRepos.nodes;

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
    <div>
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
    </div>
  );
};

export default Dashboard;
