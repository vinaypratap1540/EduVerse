import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, FormControlLabel } from '@mui/material';

const Filter = ({ handleFilterChange }) => {
  const [price, setPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState('');

  const categories = [
    { id: 'next js Development', label: 'Next JS' },
    { id: 'Data Science', label: 'Data Science' },
    { id: 'frontend development', label: 'Frontend Development' },
    { id: 'Web Development', label: 'Fullstack Development' },
    { id: 'mern stack development', label: 'MERN Stack Development' },
    { id: 'Back End Development', label: 'Backend Development' },
    { id: 'javascript', label: 'Javascript' },
    { id: 'Cyber Security', label: 'Cyber Security Full Course in Hindi' },
    { id: 'Machine Learning', label: 'Machine Learning Hacks' },
    { id: 'Docker', label: 'Docker Mastery' },
  ];

  // Handles price sorting selection
  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setPrice(selectedValue);
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  // Handles category selection changes
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategories((prevCategories) => {
      let newCategories;
      if (prevCategories.includes(categoryId)) {
        newCategories = prevCategories.filter((id) => id !== categoryId);
      } else {
        newCategories = [...prevCategories, categoryId];
      }
      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h4>Filter Option</h4>
        </div>
        <div>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="sort-by-price-label">Sort by price</InputLabel>
              <Select
                labelId="sort-by-price-label"
                id="sort-by-price"
                value={price}
                onChange={handleSortChange}
              >
                <MenuItem value="low">Low to high</MenuItem>
                <MenuItem value="high">High to low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div>
        <h5>Category</h5>
        {categories.map((category) => (
          <div key={category.id}>
            <FormControlLabel
              control={
                <Checkbox
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={handleCategoryChange}
                />
              }
              label={category.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
