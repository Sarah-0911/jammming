import React from 'react';
import styles from './Playlist.module.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  render() {
    return (
      <div className={styles.Playlist}>
        <input value="New Playlist"/>
        <TrackList />
        <button className={styles.PlaylistSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    )
  }
}

export default Playlist;
