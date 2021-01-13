import React from 'react'
// import { withAuthenticator } from '@aws-amplify/ui-react'

import Header from 'components/common/Header'

import s from './AuthPageTemplate.module.scss'

const AuthPageTemplate = ({ children }) => {
  return (
    <div className={s.root}>
      <Header />
      {children}
    </div>
  )
}

export default AuthPageTemplate
