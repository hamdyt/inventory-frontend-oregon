import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import s from './Content.module.scss'

import settings from 'lib/settings'

const Content = ({ orders, error, pending, onSearch }) => {
  const [number, setNumber] = useState('')

  const disabled = pending

  const orderElements = orders.map((o, i) => (
    <tr key={i}>
      <td>{o.number}</td>
      <td>{new Date(o.ordered_at).toISOString().split('T')[0]}</td>
      <td>{o.first_name + ' ' + o.last_name}</td>
      <td>{o.name}</td>
      <td>{o.supplier}</td>
      <td>{o.size}</td>
      <td>{o.discount}</td>
      <td>{o.quantity}</td>
      <td>
        <Link to={`${settings.PAGE_EDIT_ORDER}/${o.id}`}>&rarr;</Link>
      </td>
    </tr>
  ))

  return (
    <div className={s.root}>
      <div className={s.form}>
        <label>Order Number</label>
        <br />
        <input
          className={s.number}
          name="number"
          min="0"
          value={number}
          disabled={disabled}
          onChange={e => setNumber(e.target.value)}
        />
        <br />
        <br />
        <span className={s.error}>{error}</span>
        <br />
        <br />
        <button
          className={s.submit}
          disabled={disabled || !number}
          onClick={() => onSearch(number)}
        >
          Search Order
        </button>
      </div>
      <br />
      <div className={s.table}>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Date</th>
              <th>Player</th>
              <th>Product</th>
              <th>Supplier</th>
              <th>Size</th>
              <th>Discount</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{orderElements}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Content
