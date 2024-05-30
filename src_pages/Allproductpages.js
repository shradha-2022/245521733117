import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import FilterForm from '../components/FilterForm';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts(filters);
      setProducts(data);
    };

    fetchData();
  }, [filters]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <h1>All Products</h1>
      <FilterForm setFilters={setFilters} />
      {currentProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={setCurrentPage}
      />
    </div>
  );
}

export default AllProductsPage;
