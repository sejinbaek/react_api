import React from 'react'
import { NavLink } from 'react-router-dom'
import css from './MenuList.module.css'

const MenuList = () => {
  return (
    <ul>
      <CustomNavLink
        to={'/'}
        label={'날씨 API 활용'}
        className={isActive => (isActive ? `${css.active}` : '')}
      />
      <CustomNavLink
        to={'/camping'}
        label={'야영장 API 활용'}
        className={isActive => (isActive ? `${css.active}` : '')}
      />
    </ul>
  )
}

const CustomNavLink = ({ to, label }) => (
  <li className={css.list}>
    <NavLink to={to} className={isActive => (isActive ? `${css.active}` : '')}>
      {label}
    </NavLink>
  </li>
)

export default MenuList
