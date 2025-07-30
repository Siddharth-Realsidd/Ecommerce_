import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, total } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-items-header">
              <span className="header-product">Product</span>
              <span className="header-price">Price</span>
              <span className="header-quantity">Quantity</span>
              <span className="header-total">Total</span>
              <span className="header-action"></span>
            </div>
            
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="item-product">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-id">Product ID: {item.id}</p>
                  </div>
                </div>
                <div className="item-price">₹{item.price}</div>
                <div className="item-quantity">{item.quantity}</div>
                <div className="item-total">₹{item.price * item.quantity}</div>
                <div className="item-action">
                  <button 
                    className="remove-button" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <span className="remove-icon">×</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{total > 500 ? 'Free' : '₹50'}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total > 500 ? total : total + 50}</span>
            </div>
            <button 
              className="checkout-button" 
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
            <Link to="/products" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
