import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Core from 'containers/Core'

import Home from 'components/page/home/Home'
import NewOrder from 'components/page/new-order/NewOrder'
import EditOrder from 'components/page/edit-order/EditOrder'
import SearchOrder from 'components/page/search-order/SearchOrder'
import TrackInventory from 'components/page/track-inventory/TrackInventory'

import settings from 'lib/settings'

const App = () => (
  <>
    <Helmet>
      <title>{settings.APP_NAME}</title>
    </Helmet>
    <Core />
    <Switch>
      <Route exact path={settings.PAGE_HOME} component={Home} />
      <Route path={settings.PAGE_NEW_ORDER} component={NewOrder} />
      <Route path={`${settings.PAGE_EDIT_ORDER}/:id`} component={EditOrder} />
      <Route path={settings.PAGE_SEARCH_ORDER} component={SearchOrder} />
      <Route path={settings.PAGE_TRACK_INVENTORY} component={TrackInventory} />
    </Switch>
  </>
)

export default App
