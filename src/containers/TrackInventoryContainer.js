import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Content from 'components/page/track-inventory/Content'

import { actionCreators as playerActions } from 'store/modules/player'

import { setToken } from 'lib/token'
import progress from 'lib/progress'

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
      progress.install()
      PlayerActions.setPending(true)
      await PlayerActions.getAll()

      // init default player
      const { players } = this.props
      if (players && players.length) {
        PlayerActions.setCurrentPlayer(players[0].id)
        await PlayerActions.getOrders(players[0].id)
      }
      PlayerActions.setPending(false)
      progress.uninstall()
    } catch (e) {
      PlayerActions.setPending(false)
      progress.uninstall()
    }
  }

  // handle search
  handleChangePlayer = async e => {
    const { name, value } = e.target
    if (name !== 'player') return

    const { PlayerActions } = this.props

    try {
      PlayerActions.setPending(true)
      progress.install()
      await PlayerActions.getOrders(value)
      PlayerActions.setPending(false)
      PlayerActions.setCurrentPlayer(value)
      progress.uninstall()
    } catch (e) {
      progress.uninstall()
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
