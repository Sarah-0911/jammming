import React, { useState } from 'react';
import styles from './Playlist.module.css';
import TrackList from '../TrackList/TrackList';
import Spotify from '../../util/Spotify';

const Playlist = props => {

  const [saved, setSaved] = useState(false);

  const handleNameChange = event => {
    const newName = event.target.value;
    props.onNameChange(newName);
  }

  const handleSave = async () => {
  if (props.playlistTracks.length === 0) return;

    // 🔒 Vérifie si l’utilisateur est connecté (redirige sinon)
  const accessToken = await Spotify.getAccessToken();
  if (!accessToken) return;

  props.onSave();
  setSaved(true);
  setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className={styles.playlistContainer}>
      <div className={styles.playlistHeader}>
        <input
          placeholder='New playlist'
          value={props.playlistName}
          onChange={handleNameChange}
        />
      </div>

      <div className={styles.playlistScroll}>
        <TrackList
          tracks={props.playlistTracks}
          onRemove={props.onRemove}
          isRemoval={true}
        />
      </div>

      <div className={styles.playlistFooter}>
        <button className={styles.playlistSave} onClick={handleSave}>
          {saved ? "✔ SAVED !" : "SAVE TO SPOTIFY"}
        </button>
      </div>

    </div>
  )
}

export default Playlist;
