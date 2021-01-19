import axios from './defaultClient'

export const getAll = () => axios(true).get('/product')
