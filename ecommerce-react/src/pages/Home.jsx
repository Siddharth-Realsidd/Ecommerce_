import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MyShop</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="cta-button">Shop Now</Link>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over ₹500</p>
        </div>
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h3>Fast Delivery</h3>
          <p>Get your order in 2-3 days</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔄</div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
      </div>
      
      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories">
          <div className="category">
            <div className="category-image electronics"></div>
            <h3>Electronics</h3>
            <Link to="/products?category=electronics" className="category-link">View All</Link>
          </div>
          <div className="category">
            <div className="category-image fashion"></div>
            <h3>Fashion</h3>
            <Link to="/products?category=fashion" className="category-link">View All</Link>
          </div>
          <div className="category">
            <div className="category-image home"></div>
            <h3>Home & Living</h3>
            <Link to="/products?category=home" className="category-link">View All</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
