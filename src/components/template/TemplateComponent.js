import React from 'react'

import s from './TemplateComponent.module.scss'

const TemplateComponent = ({ prop, children }) => {
  return (
    <div className={[s.template, s.active].join(' ')}>
      {prop}-{children}
    </div>
  )
}

export default TemplateComponent
