import React from 'react'
import { Logo, Triangles } from '../../components/ui'
import { MainLayoutProps } from './types'
import './styles.scss'

export const MainLayout = (props: MainLayoutProps): JSX.Element => (
  <div className="content-wrap">
    <Logo backUrl={props.backUrl} />
    <div className="content-center">{props.children}</div>
    <Triangles />
  </div>
)
