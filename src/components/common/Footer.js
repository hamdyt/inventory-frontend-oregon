import React from 'react'
import { Link } from 'react-router-dom'

import s from './Footer.module.scss'

import settings from 'lib/settings'

const Footer = () => (
  <div className={s.root}>
    <div className={s.container}>
      <Link to={settings.PAGE_HOME}>
        <div className={s.logo}>Inventoryapp</div>
      </Link>
      <div className={s.item}>©2020 All right reserved</div>
    </div>
  </div>
)

export default Footer
