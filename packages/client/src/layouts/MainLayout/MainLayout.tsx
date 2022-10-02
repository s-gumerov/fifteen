import React, { PropsWithChildren } from 'react'
import { Logo, Triangles } from '../../components/ui'
import './styles.scss';

export const MainLayout = ({children}: PropsWithChildren): JSX.Element => (
    <div className="content-wrap">
      <Logo />
      <div className="content-center">{children}</div>
      <Triangles />
    </div>
  )