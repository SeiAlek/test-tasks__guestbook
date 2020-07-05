import React, { ReactElement } from 'react';
import './Preloader.scss';

export const Preloader = (): ReactElement => (
  <div className="Preloader">
    <div className="lds-default">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
