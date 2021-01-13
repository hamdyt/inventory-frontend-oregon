import React from 'react'

import s from './Content.module.scss'

const Content = ({
  players,
  playerPending,
  products,
  productPending,
  form,
  orderError,
  orderPending,
  onChangeInput,
  onChangeSize,
  onUpdate
}) => {
  const { player, product, number, size, quantity, discount } = form
  const disabled = playerPending || productPending || orderPending

  const playerElements = players.map((p, i) => (
    <option key={i} value={p.id}>
      {p.first_name} {p.last_name}
    </option>
  ))

  const productElements = products.map((p, i) => (
    <option key={i} value={p.id}>
      {p.name} by {p.supplier}
    </option>
  ))

  return (
    <div className={s.root}>
      <label>Select Player</label>
      <div className={s.select}>
        <select
          className={s.dropdown}
          disabled={disabled}
          name="player"
          value={player}
          onChange={onChangeInput}
        >
          {playerElements}
        </select>
      </div>
      <br />
      <label>Select Product</label>
      <div className={s.select}>
        <select
          className={s.dropdown}
          disabled={disabled}
          name="product"
          value={product}
          onChange={onChangeInput}
        >
          {productElements}
        </select>
      </div>
      <br />
      <label>Order Number</label>
      <br />
      <input
        className={s.number}
        name="number"
        min="0"
        value={number}
        disabled={disabled}
        onChange={onChangeInput}
      />
      <br />
      <br />
      <label>Select Size</label>
      <br />
      <div className={s.radioGroup}>
        <div className={s.component}>
          <input
            className={s.radio}
            type="radio"
            name="size"
            id="size1"
            checked={size === 1}
            disabled={disabled}
            onChange={() => onChangeSize(1)}
          />
          <label className={s.label} htmlFor="size1">
            S
          </label>
        </div>
        <div className={s.component}>
          <input
            className={s.radio}
            type="radio"
            name="size"
            id="size2"
            checked={size === 2}
            disabled={disabled}
            onChange={() => onChangeSize(2)}
          />
          <label className={s.label} htmlFor="size2">
            M
          </label>
        </div>
        <div className={s.component}>
          <input
            className={s.radio}
            type="radio"
            name="size"
            id="size3"
            checked={size === 3}
            disabled={disabled}
            onChange={() => onChangeSize(3)}
          />
          <label className={s.label} htmlFor="size3">
            L
          </label>
        </div>
        <div className={s.component}>
          <input
            className={s.radio}
            type="radio"
            name="size"
            id="size4"
            checked={size === 4}
            disabled={disabled}
            onChange={() => onChangeSize(4)}
          />
          <label className={s.label} htmlFor="size4">
            XL
          </label>
        </div>
        <div className={s.component}>
          <input
            className={s.radio}
            type="radio"
            name="size"
            id="size5"
            checked={size === 5}
            disabled={disabled}
            onChange={() => onChangeSize(5)}
          />
          <label className={s.label} htmlFor="size5">
            XXL
          </label>
        </div>
      </div>
      <br />
      <label>Select Quantity</label>
      <br />
      <input
        className={s.number}
        type="number"
        name="quantity"
        min="0"
        value={quantity}
        disabled={disabled}
        onChange={onChangeInput}
      />
      <br />
      <br />
      <label>Select Discount</label>
      <br />
      <input
        className={s.number}
        type="number"
        name="discount"
        min="0"
        value={discount}
        disabled={disabled}
        onChange={onChangeInput}
      />
      <br />
      <br />
      <span className={s.error}>{orderError}</span>
      <br />
      <br />
      <button
        className={s.submit}
        disabled={disabled || !number}
        onClick={() => onUpdate()}
      >
        Update Order
      </button>
    </div>
  )
}

export default Content
