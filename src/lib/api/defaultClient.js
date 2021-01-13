import axios from 'axios'
import settings from 'lib/settings'
import storage from 'lib/storage'

const baseURL = (() => {
  console.log(process.env.NODE_ENV, 'v1.0.6')
  return process.env.NODE_ENV === 'production' ? settings.APP_API : '/prod'
})()

const defaultClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Authorization: storage.get(settings.APP_TOKEN_KEY)
  }
})

export default defaultClient
