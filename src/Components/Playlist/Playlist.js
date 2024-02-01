import React from 'react';
import styles from './Playlist.module.css';
import TrackList from '../TrackList/TrackList';

const Playlist = props => {

  const handleNameChange = event => {
    const newName = event.target.value;
    props.onNameChange(newName);
  }

  return (
    <div className={styles.Playlist}>
      <input defaultValue="New Playlist" onChange={handleNameChange}/>
      <TrackList
        tracks={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className={styles.PlaylistSave} onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  )
}

export default Playlist;
