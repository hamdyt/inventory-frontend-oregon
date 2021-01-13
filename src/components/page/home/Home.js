import React from 'react'
import { Link } from 'react-router-dom'

import Banner from 'components/common/Banner'

import s from './Home.module.scss'

import settings from 'lib/settings'

const Home = () => {
  return (
    <div className={s.root}>
      <Banner />
      <div className={s.start}>
        <Link to={settings.PAGE_NEW_ORDER}>Get Started</Link>
      </div>
    </div>
  )
}

export default Home
