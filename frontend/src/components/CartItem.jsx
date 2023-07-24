import React from 'react'
import { urlFor } from '../client'
import { useCart } from 'react-use-cart'

const CartItem = ({ data }) => {
  // console.log(data)
  
  const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
    } = useCart();

  return (
    <div className='cart-item' >
      <div className="cart-item-left">
        <img src={urlFor(data.image[0].asset._ref)} alt={data.name} />
      </div>
      <div className="cart-item-right">
        <div className="cart-item-info">
          <h6>{data.name}</h6> 
          <p>{data.quantity}</p>
        </div>
        <div className="cart-actions">
          <div className="cart-actions-left">
            <button
              onClick={() => updateItemQuantity(data.id, data.quantity - 1)}
            >
              -
            </button>
            <button
              onClick={() => updateItemQuantity(data.id, data.quantity + 1)}
            >
              +
            </button>
          </div>
          <div className="cart-actions-right">
            <button 
              onClick={() => removeItem(data.id)}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem