import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'
import { pender } from 'redux-pender'
import * as PlayerAPI from 'lib/api/player'

// action types
const INITIALIZE = 'player/INITIALIZE'
const GET_ALL = 'player/GET_ALL'
const GET_ORDERS = 'player/GET_ORDERS'
const SET_CURRENT_PLAYER = 'player/SET_CURRENT_PLAYER'
const SET_ERROR = 'player/SET_ERROR'
const SET_PENDING = 'player/SET_PENDING'

// actions
export const actionCreators = {
  initialize: createAction(INITIALIZE),
  getAll: createAction(GET_ALL, PlayerAPI.getAll),
  setCurrentPlayer: createAction(SET_CURRENT_PLAYER),
  getOrders: createAction(GET_ORDERS, PlayerAPI.getOrders),
  setError: createAction(SET_ERROR),
  setPending: createAction(SET_PENDING)
}

// initial state
const initialState = {
  players: [],
  currentPlayer: 0,
  orders: [],
  error: '',
  pending: false
}

export default handleActions(
  {
    [INITIALIZE]: state => {
      return produce(state, draft => {
        draft.players = []
        draft.currentPlayer = 0
        draft.orders = []
        draft.error = ''
        draft.pending = false
      })
    },
    [SET_CURRENT_PLAYER]: (state, action) => {
      return produce(state, draft => {
        draft.currentPlayer = action.payload
      })
    },
    [SET_ERROR]: (state, action) => {
      return produce(state, draft => {
        draft.error = action.payload
      })
    },
    [SET_PENDING]: (state, action) => {
      return produce(state, draft => {
        draft.pending = action.payload
      })
    },
    ...pender({
      type: GET_ALL,
      onSuccess: (state, action) => {
        const { data } = action.payload
        return produce(state, draft => {
          draft.players = data
        })
      },
      onFailure: state => {
        return produce(state, draft => {
          draft.players = []
          draft.error = 'Error Occurred'
        })
      }
    }),
    ...pender({
      type: GET_ORDERS,
      onSuccess: (state, action) => {
        const { data } = action.payload
        return produce(state, draft => {
          draft.orders = data
        })
      },
      onFailure: state => {
        return produce(state, draft => {
          draft.orders = []
          draft.error = 'Error Occurred'
        })
      }
    })
  },
  initialState
)
