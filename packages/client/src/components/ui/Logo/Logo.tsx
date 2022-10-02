import React from 'react';
import { appTitle } from '../../../const';
import './styles.scss';

export const Logo = (): JSX.Element => (
    <div className="logo">
      <span className="logo__title">{appTitle}</span>
    </div>
  )