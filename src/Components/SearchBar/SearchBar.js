import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = props => {
  const [term, setTerm] = useState("");

  const handleTermChange = event => {
    setTerm(event.target.value);
  }

  const search = () => {
    props.onSearch(term);
  }

  const handleKeyDown = event => {
    event.key === 'Enter' && search();
  }

  return (
    <div className={styles.SearchBarContainer}>
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles.SearchButton}
        onClick={search}>
        SEARCH
      </button>
    </div>
  )
}

export default SearchBar;
