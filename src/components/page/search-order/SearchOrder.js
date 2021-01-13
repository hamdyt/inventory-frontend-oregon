import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

import AuthPageTemplate from 'components/base/AuthPageTemplate'
import SearchOrderContainer from 'containers/SearchOrderContainer'

import s from './SearchOrder.module.scss'

const SearchOrder = () => {
  return (
    <AuthPageTemplate>
      <div className={s.title}>Search Order</div>
      <SearchOrderContainer />
    </AuthPageTemplate>
  )
}

export default withAuthenticator(SearchOrder)
// export default SearchOrder
