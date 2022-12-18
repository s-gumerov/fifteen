import React from 'react'
import './styles.scss'

export const Triangles = (): JSX.Element => {
  return (
    <div className="triangles">
      <div className="triangles__item triangles-theme triangles__item_one"></div>
      <div className="triangles__item triangles-theme triangles__item_two"></div>
      <div className="triangles__item triangles-theme triangles__item_three"></div>
    </div>
  )
}
