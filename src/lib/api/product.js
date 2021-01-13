import axios from './defaultClient'

export const getAll = () => axios.get('/product')
