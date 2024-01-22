import React from 'react';
import styles from './SearchResults.module.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render() {
    return (
      <div className={styles.SearchResults}>
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} />
      </div>
    )
  }
}

export default SearchResults;
