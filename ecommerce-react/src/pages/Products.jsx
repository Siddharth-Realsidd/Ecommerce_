import React, { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import productData from "../data/products.json";
import { CartContext } from "../context/CartContext";


function ProductItem({ product }) {
  const [showPopup, setShowPopup] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };
  
  return (
    <>
      <div className="product-card">
        {product.discount && (
          <span className="product-badge">{product.discount}% OFF</span>
        )}
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-price">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="discount-percent">{product.discount}% off</span>
            )}
          </div>
          <div className="product-actions">
            <button onClick={handleAddToCart}className="btn" onClick={() => setShowPopup(true)}>Quick View</button>
            <button 
              className="btn btn-primary" 
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Popup */}
      <div className={`product-popup-overlay ${showPopup ? 'active' : ''}`} onClick={() => setShowPopup(false)}>
        <div className="product-popup" onClick={e => e.stopPropagation()}>
          <div className="popup-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="popup-content">
            <h2>{product.name}</h2>
            <div className="product-price">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
            </div>
            <p className="product-description">{product.description || "No description available."}</p>
            {orderSuccess && (
              <div className="success-popup">
                Order placed successfully!
              </div>
            )}
            <button 
              className="btn btn-primary add-to-cart-btn" 
              onClick={() => {
                addToCart(product);
                setShowPopup(false); // Close popup after adding to cart
              }}
            >
              Add to Cart
            </button>
          </div>
          <div className="popup-close" onClick={() => setShowPopup(false)}>×</div>
        </div>
      </div>
    </>
  );
}

// Main Products component
function Products() {
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');

  // Extract unique categories from products
  useEffect(() => {
    const uniqueCategories = ['all'];
    productData.forEach(product => {
      if (product.category && !uniqueCategories.includes(product.category)) {
        uniqueCategories.push(product.category);
      }
    });
    setCategories(uniqueCategories);
    
    // Get category from URL query parameter
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && uniqueCategories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setFilteredProducts(productData); // Set initial products
    }
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let result = [...productData];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOption]);

  return (
    <div className="products-container">
      <div className="filters">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.filter(cat => cat !== 'all').map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
          className="filter-select"
        >
          <option value="default">Default Sorting</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name-a-z">Name: A to Z</option>
          <option value="name-z-a">Name: Z to A</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
