import axios from 'axios'
import settings from 'lib/settings'
import storage from 'lib/storage'

const getBaseURL = (product = false) => {
  if (process.env.NODE_ENV === 'production') {
    return product ? settings.APP_API_PRODUCT : settings.APP_API_ORDER
  } else {
    return '/prod'
  }
}

const defaultClient = (product = false) =>
  axios.create({
    baseURL: getBaseURL(product),
    withCredentials: true,
    headers: {
      Authorization: storage.get(settings.APP_TOKEN_KEY)
    }
  })

export default defaultClient
