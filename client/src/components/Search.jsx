import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
// State & Axios requests
// Request list of 10 options from API to show User
const [ searchResults, setSearchResults] = useState([]);
// Other request
// Request to API through the Route


  return (
    <div>
      <form>
        <input id='search' type='text'></input>
        <button>Search</button>
      </form>
    </div>
  );
};

export default Search;