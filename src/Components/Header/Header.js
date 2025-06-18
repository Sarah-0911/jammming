import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleTermChange = event => {
    setTerm(event.target.value);
  }

  const search = () => {
    onSearch(term);
  }

  const handleKeyDown = event => {
    event.key === 'Enter' && search();
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>jammming</h1>
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={handleTermChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className={styles.searchButton}
          onClick={search}>
          SEARCH
        </button>
      </div>
    </div>
  )
}

export default Header;
