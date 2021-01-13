import React from 'react'

import TemplateContainer from 'containers/TemplateContainer'
import s from './Template.module.scss'

const Template = () => (
  <>
    <div className={[s.template, s.active].join(' ')}>Template</div>
    <TemplateContainer />
  </>
)

export default withAuthenticator(Template)
