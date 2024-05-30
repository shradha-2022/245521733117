import React, { useState } from 'react';

function FilterForm({ setFilters }) {
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({ category, company });
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
      {}
      <button type="submit">Apply Filters</button>
    </form>
  );
}

export default FilterForm;
