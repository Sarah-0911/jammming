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
    <div className={styles.HeaderContainer}>
      <h1>Jammming</h1>
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

export default Header;
