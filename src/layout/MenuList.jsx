import React from 'react'
import { NavLink } from 'react-router-dom'
import css from './MenuList.module.css'

const MenuList = () => {
  return (
    <ul>
      <li className={css.list}>
        <NavLink to={'/'} className={isActive => (isActive ? `${css.active}` : '')}>
          날씨 API 활용
        </NavLink>
      </li>
    </ul>
  )
}

export default MenuList
