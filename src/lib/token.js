import { Auth } from 'aws-amplify'

import storage from './storage'
import settings from './settings'

const setToken = async () => {
  const session = await Auth.currentSession()
  const token = session.getIdToken().getJwtToken() //.idToken.jwtToken

  // store token
  storage.set(settings.APP_TOKEN_KEY, token)
}

export { setToken }
