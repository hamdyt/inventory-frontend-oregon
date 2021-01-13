import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'
import { pender } from 'redux-pender'
import * as OrderAPI from 'lib/api/order'

// action types
const INITIALIZE = 'order/INITIALIZE'
const CHANGE_INPUT = 'order/CHANGE_INPUT'
const CREATE = 'order/CREATE'
const SEARCH = 'order/SEARCH'
const GET = 'order/ORDER'
const UPDATE = 'order/UPDATE'
const SET_ERROR = 'order/SET_ERROR'
const SET_PENDING = 'order/SET_PENDING'

// actions
export const actionCreators = {
  initialize: createAction(INITIALIZE),
  changeInput: createAction(CHANGE_INPUT),
  create: createAction(CREATE, OrderAPI.create),
  search: createAction(SEARCH, OrderAPI.search),
  get: createAction(GET, OrderAPI.get),
  update: createAction(UPDATE, OrderAPI.update),
  setError: createAction(SET_ERROR),
  setPending: createAction(SET_PENDING)
}

// initial state
const initialState = {
  error: '',
  pending: false,
  form: {
    player: 0,
    product: 0,
    number: '',
    size: 1,
    quantity: 1,
    discount: 1
  },
  order: {},
  searchOrders: []
}

export default handleActions(
  {
    [INITIALIZE]: state => {
      return produce(state, draft => {
        draft.error = ''
        draft.pending = false
        draft.form = {
          id: 0,
          player: 0,
          product: 0,
          number: '',
          size: 1,
          quantity: 1,
          discount: 1
        }
        draft.currentOrderId = 0
        draft.order = {}
        draft.searchOrders = []
      })
    },
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload
      return produce(state, draft => {
        draft.form[name] = value
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
      type: CREATE,
      onSuccess: (state, action) => {
        const { data } = action.payload
        return produce(state, draft => {
          draft.order = data
        })
      },
      onFailure: state => {
        return produce(state, draft => {
          draft.order = {}
          draft.error = 'Error Occurred'
        })
      }
    }),
    ...pender({
      type: GET,
      onSuccess: (state, action) => {
        const { data } = action.payload
        return produce(state, draft => {
          draft.order = data
        })
      },
      onFailure: state => {
        return produce(state, draft => {
          draft.order = {}
          draft.error = 'Error Occurred'
        })
      }
    }),
    ...pender({
      type: UPDATE,
      onSuccess: (state, action) => {
        const { data } = action.payload
        return produce(state, draft => {
          draft.order = data
        })
      },
      onFailure: state => {
        return produce(state, draft => {
          draft.order = {}
          draft.error = 'Error Occurred'
        })
      }
    }),
    ...pender({
      type: SEARCH,
      onSuccess: (state, action) => {
        const { data } = action.payload
        return produce(state, draft => {
          draft.searchOrders = data
        })
      },
      onFailure: state => {
        return produce(state, draft => {
          draft.searchOrders = []
          draft.error = 'Error Occurred'
        })
      }
    })
  },
  initialState
)
