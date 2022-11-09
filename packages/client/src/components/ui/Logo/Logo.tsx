
import type { LogoProps } from './types';
// import './styles.scss';
import React from 'react';

export const Logo = (props: LogoProps): JSX.Element => {
  const buttonBack = props.backUrl
                  

  return (
    <div className="logo">
      <span className="logo__title">`${buttonBack}` dsgdfg</span>
      
    </div>
  )
}