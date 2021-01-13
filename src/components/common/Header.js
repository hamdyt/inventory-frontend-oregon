import React from 'react'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import s from './Header.module.scss'
import logoImg from 'assets/logo.jpg'

import settings from 'lib/settings'

const Header = () => {
  const currentURL = window.location.pathname

  const handleClick = async () => {
    await Auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Link to={settings.PAGE_HOME}>
          <div className={s.logo}>
            <img src={logoImg} alt="logo" />
            <div className={s.title}>Octank Corp</div>
          </div>
        </Link>
        <ul className={s.menu}>
          <li
            className={[
              s.item,
              currentURL === settings.PAGE_NEW_ORDER ? s.active : undefined
            ].join(' ')}
          >
            <Link to={settings.PAGE_NEW_ORDER}>New Order</Link>
          </li>
          <li
            className={[
              s.item,
              currentURL === settings.PAGE_SEARCH_ORDER ? s.active : undefined
            ].join(' ')}
          >
            <Link to={settings.PAGE_SEARCH_ORDER}>Search Order</Link>
          </li>
          <li
            className={[
              s.item,
              currentURL === settings.PAGE_TRACK_INVENTORY
                ? s.active
                : undefined
            ].join(' ')}
          >
            <Link to={settings.PAGE_TRACK_INVENTORY}>Track Inventory</Link>
          </li>
          <li className={s.space} />
          <li className={[s.item, s.logout].join(' ')} onClick={handleClick}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
