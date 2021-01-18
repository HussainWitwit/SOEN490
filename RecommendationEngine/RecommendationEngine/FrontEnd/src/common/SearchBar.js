import React from 'react';
import { Search } from '@material-ui/icons';
import './SearchBar.css';

const SearchBar = ({value, onChangeFun, placeholder}) => {
  return (
    <div>
      <Search id="search" />
      <input 
        id="searchBar"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChangeFun(e.target.value)}
      />
    </div>
  );
}

export default SearchBar