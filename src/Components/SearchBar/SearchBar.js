import React from 'react';
import styles from './SearchBar.module.css';

class SearchBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = "";
  // }

  render() {
    return (
      <div className={styles.SearchBar}>
        <input placeholder="Enter A Song, Album, or Artist" />
        <button className={styles.SearchButton}>SEARCH</button>
      </div>
    )
  }
}

export default SearchBar;
