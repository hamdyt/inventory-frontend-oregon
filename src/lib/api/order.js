import axios from './defaultClient'

export const create = ({ player, product, number, size, quantity, discount }) =>
  axios.post('/order', {
    player_id: player,
    product_id: product,
    number,
    size,
    quantity,
    discount
  })

export const get = id => axios.get('/order/' + id)

export const update = ({
  id,
  detail_id,
  player,
  product,
  number,
  size,
  quantity,
  discount
}) =>
  axios.put('/order', {
    id,
    detail_id,
    player_id: player,
    product_id: product,
    number,
    size,
    quantity,
    discount
  })

export const search = number => axios.get('/order?number=' + number)
