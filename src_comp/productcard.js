import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
      {/* Add additional details as needed */}
      <Link to={`/product/${product.id}`}>View Details</Link>
    </div>
  );
}

export default ProductCard;
