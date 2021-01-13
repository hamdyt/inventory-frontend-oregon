import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

import AuthPageTemplate from 'components/base/AuthPageTemplate'
import NewOrderContainer from 'containers/NewOrderContainer'

import s from './NewOrder.module.scss'

const NewOrder = () => (
  <AuthPageTemplate>
    <div className={s.title}>New Order</div>
    <NewOrderContainer />
  </AuthPageTemplate>
)

export default withAuthenticator(NewOrder)
// export default NewOrder
