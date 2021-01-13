import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

import AuthPageTemplate from 'components/base/AuthPageTemplate'
import EditOrderContainer from 'containers/EditOrderContainer'

import s from './EditOrder.module.scss'

const EditOrder = () => (
  <AuthPageTemplate>
    <div className={s.title}>Edit Order</div>
    <EditOrderContainer />
  </AuthPageTemplate>
)

export default withAuthenticator(EditOrder)
// export default EditOrder
