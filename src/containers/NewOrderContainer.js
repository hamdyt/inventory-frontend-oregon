import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import randomstring from 'randomstring'

import Content from 'components/page/new-order/Content'

import { actionCreators as playerActions } from 'store/modules/player'
import { actionCreators as productActions } from 'store/modules/product'
import { actionCreators as orderActions } from 'store/modules/order'

import { setToken } from 'lib/token'
import progress from 'lib/progress'

class NewOrderContainer extends React.Component {
  // initialize
  initialize = async () => {
    const { PlayerActions, ProductActions, OrderActions } = this.props

    // initialize
    PlayerActions.initialize()
    ProductActions.initialize()
    OrderActions.initialize()

    // set token
    await setToken()

    // get players
    try {
      progress.install()
      PlayerActions.setPending(true)
      await PlayerActions.getAll()
      PlayerActions.setPending(false)

      // init default player
      const { players } = this.props
      if (players && players.length) {
        OrderActions.changeInput({ name: 'player', value: players[0].id })
      }

      ProductActions.setPending(true)
      await ProductActions.getAll()
      ProductActions.setPending(false)

      // init default product
      const { products } = this.props
      if (products && products.length) {
        OrderActions.changeInput({ name: 'product', value: products[0].id })
      }
      progress.uninstall()
    } catch (e) {
      PlayerActions.setPending(false)
      ProductActions.setPending(false)
      progress.uninstall()
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

  handleGenerate = () => {
    const { OrderActions } = this.props

    const genOrder = randomstring.generate({
      length: 8,
      charset: 'numeric'
    })

    OrderActions.changeInput({ name: 'number', value: genOrder })
  }

  handleCreate = async () => {
    const { OrderActions, form } = this.props
    const { player, product, number, size, quantity, discount } = form

    try {
      progress.install()
      OrderActions.setPending(true)
      await OrderActions.create({
        player: parseInt(player, 10),
        product: parseInt(product, 10),
        number,
        size: parseInt(size, 10),
        quantity: parseInt(quantity, 10),
        discount: parseInt(discount, 10)
      })
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
    const {
      players,
      playerPending,
      products,
      productPending,
      form,
      orderResult,
      orderError,
      orderPending
    } = this.props

    const {
      handleChangeInput,
      handleChangeSize,
      handleGenerate,
      handleCreate
    } = this

    return (
      <Content
        form={form}
        players={players}
        playerPending={playerPending}
        products={products}
        productPending={productPending}
        orderResult={orderResult}
        orderError={orderError}
        orderPending={orderPending}
        onChangeInput={handleChangeInput}
        onChangeSize={handleChangeSize}
        onGenerate={handleGenerate}
        onCreate={handleCreate}
      />
    )
  }
}

export default connect(
  ({ player, product, order }) => ({
    players: player.players,
    playerPending: player.pending,
    products: product.products,
    productPending: product.pending,
    form: order.form,
    orderError: order.error,
    orderPending: order.pending
  }),
  dispatch => ({
    PlayerActions: bindActionCreators(playerActions, dispatch),
    ProductActions: bindActionCreators(productActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(NewOrderContainer)
