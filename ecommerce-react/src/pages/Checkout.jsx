import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, total, setCartItems } = useContext(CartContext);
  const [formData, setFormData] = useState({ 
    name: "", 
    address: "", 
    phone: "", 
    email: "", 
    paymentMethod: "cod"  
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const { name, address, phone, email } = formData;

    if (!name || !address || !phone || !email) {
      setError("Please fill in all required fields.");
      setIsProcessing(false);
      return;
    }

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCartItems([]); 
      setFormData({ name: "", address: "", phone: "", email: "", paymentMethod: "cod" });
      setError("");
      setSubmitted(true);
      setIsProcessing(false);
      
      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "order-success-popup";
      successMessage.innerHTML = `
        <div class="success-content">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you for your purchase!</p>
        </div>
      `;
      document.body.appendChild(successMessage);
      
      // Remove success message after 3 seconds
      setTimeout(() => {
        document.body.removeChild(successMessage);
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("❌ Order submission failed:", err);
      setError("Order submission failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && !submitted) {
    return (
      <div className="empty-checkout">
        <div className="empty-checkout-icon">🛍️</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart before proceeding to checkout.</p>
        <Link to="/products" className="continue-shopping">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>{submitted ? "Order Confirmation" : "Checkout"}</h1>
        {!submitted && <p>Complete your purchase by providing your details below</p>}
      </div>

      {submitted ? (
        <div className="order-success">
          <div className="success-icon">✅</div>
          <h2>Thank you for your order!</h2>
          <p>Your order has been placed successfully.</p>
          <p>You will be redirected to the home page shortly...</p>
        </div>
      ) : (
        <div className="checkout-content">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2>Contact Information</h2>
                <div className="form-group">
                  <label htmlFor="name">Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-group">
                  <label htmlFor="address">Full Address*</label>
                  <textarea
                    id="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <h2>Payment Method</h2>
                <div className="payment-methods">
                  <div 
                    className="payment-method disabled"
                    title="Not available at this time"
                  >
                    <div className="payment-icon">💳</div>
                    <div>
                      Credit/Debit Card
                      <p className="payment-unavailable">Not available at this time</p>
                    </div>
                  </div>
                  <div 
                    className="payment-method disabled"
                    title="Not available at this time"
                  >
                    <div className="payment-icon">📱</div>
                    <div>
                      UPI Payment
                      <p className="payment-unavailable">Not available at this time</p>
                    </div>
                  </div>
                  <div 
                    className={`payment-method ${formData.paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  >
                    <div className="payment-icon">💰</div>
                    <div>Cash on Delivery</div>
                  </div>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-actions">
                <Link to="/cart" className="back-to-cart">Back to Cart</Link>
                <button type="submit" className="place-order-btn" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <span className="spinner-small"></span>
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-image">
                    <img src={item.image} alt={item.name} />
                    <span className="item-quantity">{item.quantity}</span>
                  </div>
                  <div className="summary-item-details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price} × {item.quantity}</p>
                  </div>
                  <div className="summary-item-price">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="price-details">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>{total > 500 ? 'Free' : '₹50'}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>₹{total > 500 ? total : total + 50}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
