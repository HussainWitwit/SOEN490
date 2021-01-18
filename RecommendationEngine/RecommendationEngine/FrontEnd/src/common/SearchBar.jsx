import React from 'react';
import { Search } from '@material-ui/icons';
import './SearchBar.css';

const SearchBar = ({value, onSearchUpdate, placeholder}) => {
  return (
    <div>
      <Search id="search" />
      <input 
        id="searchBar"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onSearchUpdate(e.target.value)}
      />
    </div>
  );
}

export default SearchBar