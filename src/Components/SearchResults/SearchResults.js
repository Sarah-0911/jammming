import React from 'react';
import styles from './SearchResults.module.css';

import TrackList from '../TrackList/TrackList';

const SearchResults = props => {
  return (
    <div className={styles.SearchResults}>
      <h2 className={styles.title}>Results</h2>
      <TrackList
        tracks={props.searchResults}
        onAdd={props.onAdd}
        isRemoval={false}
      />
    </div>
  )
}

export default SearchResults;
