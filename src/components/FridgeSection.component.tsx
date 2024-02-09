'use client';
import React from 'react';
import BlueFridgeComponent from './BlueFridge.component';
import RedFridgeComponent from './RedFridge.component';

const FridgeSection = () => {
  return (
    <>
      <RedFridgeComponent />
      <BlueFridgeComponent />
    </>
  );
};
export default FridgeSection;
