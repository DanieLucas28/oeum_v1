/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
// src/components/TransitionButton.js
// src/components/TransitionButton.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';
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
    scrollbar-color: var(--dark-slate) var(--navy);
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
    /* min-height: ${({ minHeight }) => minHeight}px;  Define a altura mínima */
  }
`;

const getIcon = label => {
  switch (label) {
    case 'Data Science':
      return <AcademicCapIcon />;
    case 'Other':
      return <AdjustmentsHorizontalIcon />;
    default:
      return <FolderIcon />;
  }
};

const TransitionButton = ({ label, onClick, micros = [] }) => {
  const sortedMicros = micros.sort();
  const projectCount = sortedMicros.length;
  const projectLabel = projectCount === 1 ? '1 project' : `${projectCount} projects`;

  const microsRef = useRef(null);
  const { maxHeight, setMaxHeight } = useMicrosHeight();

  useEffect(() => {
    if (microsRef.current) {
      const height = microsRef.current.clientHeight;
      if (height > maxHeight) {
        setMaxHeight(height);
      }
    }
  }, [micros, maxHeight, setMaxHeight]);

  return (
    <Button onClick={onClick} minHeight={maxHeight}>
      <div>
        <div className="icon">{getIcon(label)}</div>
        <div className="macro">{label}</div>
        <div className="micros" ref={microsRef}>
          {sortedMicros.map((micro, index) => (
            <div key={index}>{micro}</div>
          ))}
        </div>
      </div>
      <div className="final-div">{projectLabel}</div>
    </Button>
  );
};

export default TransitionButton;
