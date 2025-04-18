import React, { useState } from 'react';
import './heroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery('');
  };

  return (
    <div>
      <div className='hero'>
        <h1>Find the best courses for you</h1>
        <p>Unlock Limitless Learning, Anytime, Anywhere!</p>

        <form onSubmit={searchHandler} className='inputSection'>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="Search courses"
          />
          <button type="submit" className="btnn">Search</button>
        </form>

        <button onClick={() => navigate(`/course/search?query=${searchQuery}`)} className="btnn1">
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

