import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'
import { pender } from 'redux-pender'
import * as ProductAPI from 'lib/api/product'

// action types
const INITIALIZE = 'product/INITIALIZE'
const GET_ALL = 'product/GET_ALL'
const SET_ERROR = 'product/SET_ERROR'
const SET_PENDING = 'product/SET_PENDING'

// actions
export const actionCreators = {
  initialize: createAction(INITIALIZE),
  getAll: createAction(GET_ALL, ProductAPI.getAll),
  setError: createAction(SET_ERROR),
  setPending: createAction(SET_PENDING)
}

// initial state
const initialState = {
  products: [],
  error: '',
  pending: false
}

export default handleActions(
  {
    [INITIALIZE]: state => {
      return produce(state, draft => {
        draft.products = []
        draft.error = ''
        draft.pending = false
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
          draft.products = data
        })
      },
      onFailure: state => {
        return produce(state, draft => {
          draft.products = []
          draft.error = 'Error Occurred'
        })
      }
    })
  },
  initialState
)
