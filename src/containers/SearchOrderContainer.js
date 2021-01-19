import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Content from 'components/page/search-order/Content'

import { actionCreators as orderActions } from 'store/modules/order'

import { setToken } from 'lib/token'
import progress from 'lib/progress'

class SearchOrderContainer extends React.Component {
  // initialize
  initialize = async () => {
    const { OrderActions } = this.props

    // set token
    await setToken()

    // initialize
    OrderActions.initialize()
  }

  // handle search
  handleSearch = async number => {
    const { OrderActions } = this.props

    try {
      progress.install()
      OrderActions.setPending(true)
      await OrderActions.search(number)
      OrderActions.setPending(false)
      progress.uninstall()
    } catch (e) {
      OrderActions.setPending(false)
      progress.uninstall()
    }
  }

  componentDidMount() {
    this.initialize()
  }

  render() {
    const { orders, error, pending } = this.props

    const { handleSearch } = this

    return (
      <Content
        orders={orders}
        error={error}
        pending={pending}
        onSearch={handleSearch}
      />
    )
  }
}

export default connect(
  ({ order }) => ({
    orders: order.searchOrders,
    error: order.error,
    pending: order.pending
  }),
  dispatch => ({
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(SearchOrderContainer)
