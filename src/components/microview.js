/* eslint-disable react/prop-types */
// src/components/MicroView.js
import React from 'react';
import TransitionButton from './TransitionButton';

const MicroView = ({ micros, onMicroClick }) => (
  <div>
    <TransitionButton label="Back" onClick={() => onMicroClick('back')} info="" />
    <TransitionButton label="Dashboard" onClick={() => onMicroClick('dashboard')} info="" />
    {micros.map((micro, index) => (
      <TransitionButton
        key={index}
        label={micro.name}
        onClick={() => onMicroClick(micro.name)}
        info={`${micro.count} projetos`}
      />
    ))}
  </div>
);

export default MicroView;
