import React from 'react';
import { Search } from '@material-ui/icons';

const SearchBar = ({value, onChangeFun, placeholder}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <div>
      <Search id="search" />
      <input 
        style={BarStyling}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChangeFun(e.target.value)}
      />
    </div>
  );
}

export default SearchBar