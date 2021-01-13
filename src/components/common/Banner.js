import React from 'react'

import s from './Banner.module.scss'
import logoImg from 'assets/logo.jpg'

const Banner = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.logo}>
          <img src={logoImg} alt="logo" />
        </div>
        <div className={s.description}>
          <div className={s.big}>Octank Corp</div>
          <div className={s.small}>
            Welcome to Octank Corp. Inventory Management System for Sporting
            Goods
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
