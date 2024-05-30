const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const products = [
  { id: 1, name: 'Laptop 10', company: 'Company A', category: 'Electronics', price: 4101, rating: 2.67, discount: 37, availability: 'out-of-stock' },
  { id: 2, name: 'Product 2', company: 'Company B', category: 'Category B', price: 20.99, rating: 4.0, discount: 5, availability: 'in-stock' },
  // Add more sample products as needed
];

app.get('/api/products', (req, res) => {
  let { category, company, rating, minPrice, maxPrice, availability, sortBy, page, limit } = req.query;

  let filteredProducts = products;

  if (category) filteredProducts = filteredProducts.filter(p => p.category === category);
  if (company) filteredProducts = filteredProducts.filter(p => p.company === company);
  if (rating) filteredProducts = filteredProducts.filter(p => p.rating >= parseFloat(rating));
  if (minPrice) filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  if (availability) filteredProducts = filteredProducts.filter(p => p.availability === availability);

  if (sortBy) {
    if (sortBy === 'price') filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    if (sortBy === 'rating') filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'discount') filteredProducts = filteredProducts.sort((a, b) => b.discount - a.discount);
  }

  const limitNumber = parseInt(limit) || 10;
  const pageNumber = parseInt(page) || 1;
  const start = (pageNumber - 1) * limitNumber;
  const end = start + limitNumber;
  const paginatedProducts = filteredProducts.slice(start, end);

  res.json({
    total: filteredProducts.length,
    page: pageNumber,
    limit: limitNumber,
    products: paginatedProducts
  });
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(product => product.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
