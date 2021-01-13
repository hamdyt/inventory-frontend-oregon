import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

import AuthPageTemplate from 'components/base/AuthPageTemplate'
import TrackInventoryContainer from 'containers/TrackInventoryContainer'

import s from './TrackInventory.module.scss'

const TrackInventory = () => {
  return (
    <AuthPageTemplate>
      <div className={s.title}>Track Inventory</div>
      <TrackInventoryContainer />
    </AuthPageTemplate>
  )
}

export default withAuthenticator(TrackInventory)
// export default TrackInventory
