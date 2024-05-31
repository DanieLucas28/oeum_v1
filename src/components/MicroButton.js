/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
// src/components/MicroButton.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  AdjustmentsHorizontalIcon,
  FolderIcon,
  GlobeAltIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import RobotIcon from '@mui/icons-material/Android';
import SpeechToTextIcon from '@mui/icons-material/RecordVoiceOver';
import { useMicrosHeight } from '../context/MicrosHeightContext'; // Importando o contexto

const Button = styled.button`
  ${({ theme }) => theme.mixins.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  height: auto;
  padding: 1.5rem 1rem;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  transition: var(--transition);
  width: 100%;
  max-width: 270px;
  margin: 5px;
  color: white;
  overflow: hidden;

  &:hover,
  &:focus-visible {
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
    transform: translateY(-5px);

    .macro {
      color: var(--green);
    }
  }

  .icon {
    text-align: left;
    color: var(--green);
    margin-bottom: 10px;
    svg {
      fill: none;
      width: 40px;
      height: 40px;
    }
  }

  .macro {
    margin: 10px 0;
    text-align: left;
    width: 100%;
    transition: color 0.3s ease;
    font-family: var(--font-sans);
    font-weight: 600;
    line-height: 1.1;
    font-size: var(--fz-xxl);
    list-style: none;
    visibility: visible;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: var(--lightest-slate);
    z-index: 1;
    position: static;
  }

  .micros {
    margin: 10px 0;
    text-align: left;
    width: 100%;
    font-family: var(--font-sans);
    line-height: 1.3;
    list-style: disc inside;
    cursor: default;
    visibility: visible;
    color: var(--light-slate);
    font-size: 17px;
    box-sizing: inherit;
  }

  .final-div {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: 1.75;
    margin-top: 20px;
    margin-right: 15px;
    color: var(--slate);
    cursor: default;
    visibility: visible;
    list-style: none;
    box-sizing: content-box;
  }

  .final-div span {
    background-color: rgba(0, 0, 0, 0.5); // Fundo preto semi-transparente
    color: white; // Cor do texto branca
    padding: 2px 5px; // Espaçamento interno
    border-radius: 3px; // Bordas arredondadas
  }
`;

const getIcon = label => {
  switch (label) {
    case 'Data Engineering':
      return <CircleStackIcon />;
    case 'Machine Learning':
      return <RobotIcon />;
    case 'Data Analysis':
    case 'Data Visualization':
    case 'Business Intelligence':
      return <InsertChartIcon />;
    case 'Big Data':
      return <GlobeAltIcon />;
    case 'Natural Language Processing':
      return <SpeechToTextIcon />;
    case 'Other':
      return <AdjustmentsHorizontalIcon />;
    default:
      return <FolderIcon />;
  }
};

const MicroButton = ({ label, description, url, micro }) => {
  const microsRef = useRef(null);
  const { maxHeight, setMaxHeight } = useMicrosHeight();

  useEffect(() => {
    if (microsRef.current) {
      const height = microsRef.current.clientHeight;
      if (height > maxHeight) {
        setMaxHeight(height);
      }
    }
  }, [maxHeight, setMaxHeight]);

  const handleClick = () => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <Button onClick={handleClick} minHeight={maxHeight}>
      <div>
        <div className="icon">{getIcon(label)}</div>
        <div className="macro">{label}</div>
        <div className="micros">{description}</div>
      </div>
      <div className="final-div">
        {Array.isArray(micro) && micro.map((item, index) => <span key={index}>{item}</span>)}
      </div>
    </Button>
  );
};

export default MicroButton;
