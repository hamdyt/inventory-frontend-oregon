import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import Content from 'components/page/edit-order/Content'

import { actionCreators as playerActions } from 'store/modules/player'
import { actionCreators as productActions } from 'store/modules/product'
import { actionCreators as orderActions } from 'store/modules/order'

import { setToken } from 'lib/token'

class EditOrderContainer extends React.Component {
  // initialize
  initialize = async () => {
    const { id } = this.props.match.params
    const { OrderActions, PlayerActions, ProductActions } = this.props

    // initialize
    OrderActions.initialize()
    PlayerActions.initialize()
    ProductActions.initialize()

    // set token
    await setToken()

    try {
      OrderActions.setPending(true)
      PlayerActions.setPending(true)
      ProductActions.setPending(true)

      // get order
      await OrderActions.get(id)
      OrderActions.setPending(false)

      // get players
      await PlayerActions.getAll()

      // get product
      await ProductActions.getAll()

      const { order } = this.props
      const { player_id, product_id, number, size, quantity, discount } = order

      // set player
      OrderActions.changeInput({
        name: 'player',
        value: player_id
      })

      // set product
      OrderActions.changeInput({
        name: 'product',
        value: product_id
      })

      // set number
      OrderActions.changeInput({
        name: 'number',
        value: number
      })

      // set size
      OrderActions.changeInput({
        name: 'size',
        value: size
      })

      // set quantity
      OrderActions.changeInput({
        name: 'quantity',
        value: quantity
      })

      // set discount
      OrderActions.changeInput({
        name: 'discount',
        value: discount
      })

      OrderActions.setPending(false)
      PlayerActions.setPending(false)
      ProductActions.setPending(false)
    } catch (e) {
      OrderActions.setPending(false)
      PlayerActions.setPending(false)
      ProductActions.setPending(false)
    }
  }

  // handle input signup
  handleChangeInput = e => {
    const { OrderActions } = this.props
    const { name, value } = e.target

    OrderActions.changeInput({
      name,
      value
    })
  }

  // handle input size
  handleChangeSize = size => {
    const { OrderActions } = this.props
    OrderActions.changeInput({ name: 'size', value: size })
  }

  handleUpdate = async () => {
    const { OrderActions, form, order } = this.props
    const { player, product, number, size, quantity, discount } = form

    try {
      OrderActions.setPending(true)
      await OrderActions.update({
        id: order.id,
        detail_id: order.detail_id,
        player: parseInt(player, 10),
        product: parseInt(product, 10),
        number,
        size: parseInt(size, 10),
        quantity: parseInt(quantity, 10),
        discount: parseInt(discount, 10)
      })
      OrderActions.setPending(false)
    } catch (e) {
      OrderActions.setPending(false)
    }
  }

  componentDidMount() {
    this.initialize()
  }

  render() {
    const {
      players,
      playerPending,
      products,
      productPending,
      form,
      orderError,
      orderPending
    } = this.props

    const { handleChangeInput, handleChangeSize, handleUpdate } = this

    return (
      <Content
        form={form}
        players={players}
        playerPending={playerPending}
        products={products}
        productPending={productPending}
        orderError={orderError}
        orderPending={orderPending}
        onChangeInput={handleChangeInput}
        onChangeSize={handleChangeSize}
        onUpdate={handleUpdate}
      />
    )
  }
}

export default withRouter(
  connect(
    ({ player, product, order }) => ({
      players: player.players,
      playerPending: player.pending,
      products: product.products,
      productPending: product.pending,
      form: order.form,
      order: order.order,
      orderError: order.error,
      orderPending: order.pending
    }),
    dispatch => ({
      PlayerActions: bindActionCreators(playerActions, dispatch),
      ProductActions: bindActionCreators(productActions, dispatch),
      OrderActions: bindActionCreators(orderActions, dispatch)
    })
  )(EditOrderContainer)
)
