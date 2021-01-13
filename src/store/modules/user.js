import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'

// action types;
const SET_USER_TOKEN = 'user/SET_USER_TOKEN'

export const actionCreators = {
  setUserToken: createAction(SET_USER_TOKEN)
}

// initial state
const initialState = {
  token: null,
  email: null
}

// reducer
export default handleActions(
  {
    [SET_USER_TOKEN]: (state, action) => {
      return produce(state, draft => {
        draft.token = action.payload
      })
    }
  },
  initialState
)
