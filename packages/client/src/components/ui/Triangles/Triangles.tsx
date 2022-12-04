import React, {useEffect} from 'react'
import './styles.scss'
import {useAppSelector} from '../../../hooks/useAppDispatch';

export const Triangles = (): JSX.Element => {
    const {theme} = useAppSelector(state => state.theme)
    const themeClassName = theme === 'dark' ? 'blueTrianglesTheme' : 'pinkTrianglesTheme'
    return (
        <div className="triangles">
            <div className={`triangles__item ${themeClassName} triangles__item_one`}></div>
            <div className={`triangles__item ${themeClassName} triangles__item_two`}></div>
            <div className={`triangles__item ${themeClassName} triangles__item_three`}></div>
        </div>
    )
}
