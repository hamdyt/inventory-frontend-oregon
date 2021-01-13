import { Auth } from 'aws-amplify'

import storage from './storage'
import settings from './settings'

const setToken = async () => {
  const token = (await Auth.currentSession()).idToken.jwtToken

  // store token
  storage.set(settings.APP_TOKEN_KEY, token)
}

export { setToken }
