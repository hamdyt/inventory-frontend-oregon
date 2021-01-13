import axios from './defaultClient'

export const getAll = () => axios.get('/player')

export const getOrders = id => axios.get('/player/' + id + '/order')
