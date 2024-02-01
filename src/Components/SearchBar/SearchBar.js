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

  return (
    <div className={styles.SearchBar}>
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
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
