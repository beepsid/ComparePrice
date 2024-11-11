import React from 'react';
import './CartPage.css';

function CartPage({ cartItems, removeFromCart, viewProductSource }) {
    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <img src={item.image} alt={item.name} className="cart-item-img" />
                            <div className="cart-item-info">
                                <p className="cart-item-name">{item.name}</p>
                                <p className="cart-item-price">{item.price}</p>
                                <div className="cart-item-actions">
                                    <button onClick={() => viewProductSource(item)}>View Product Source</button>
                                    <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CartPage;
