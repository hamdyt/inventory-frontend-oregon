import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Content from 'components/page/track-inventory/Content'

import { actionCreators as playerActions } from 'store/modules/player'

import { setToken } from 'lib/token'

class TrackInventoryContainer extends React.Component {
  // initialize
  initialize = async () => {
    const { PlayerActions } = this.props

    // initialize
    PlayerActions.initialize()

    // set token
    await setToken()

    // get players
    try {
      PlayerActions.setPending(true)
      await PlayerActions.getAll()

      // init default player
      const { players } = this.props
      if (players && players.length) {
        PlayerActions.setCurrentPlayer(players[0].id)
        await PlayerActions.getOrders(players[0].id)
      }
      PlayerActions.setPending(false)
    } catch (e) {
      PlayerActions.setPending(false)
    }
  }

  // handle search
  handleChangePlayer = async e => {
    const { name, value } = e.target
    if (name !== 'player') return

    const { PlayerActions } = this.props

    try {
      PlayerActions.setPending(true)
      await PlayerActions.getOrders(value)
      PlayerActions.setPending(false)
      PlayerActions.setCurrentPlayer(value)
    } catch (e) {
      PlayerActions.setPending(false)
    }
  }

  componentDidMount() {
    this.initialize()
  }

  render() {
    const { players, currentPlayer, orders, error, pending } = this.props
    const { handleChangePlayer } = this

    return (
      <Content
        players={players}
        currentPlayer={currentPlayer}
        orders={orders}
        error={error}
        pending={pending}
        onChangePlayer={handleChangePlayer}
      />
    )
  }
}

export default connect(
  ({ player }) => ({
    players: player.players,
    currentPlayer: player.currentPlayer,
    orders: player.orders,
    error: player.error,
    pending: player.pending
  }),
  dispatch => ({
    PlayerActions: bindActionCreators(playerActions, dispatch)
  })
)(TrackInventoryContainer)
