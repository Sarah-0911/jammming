import React from 'react';
import styles from './TrackList.module.css';
import Track from '../Track/Track';

const TrackList = props => {
  const tracks = props.tracks || [];

  if(!Array.isArray(tracks)) {
    return null;
  }

  const trackElements = tracks.map(track => {
    return (
    <li key={track.id}>
      <Track
        track={track}
        onAdd={props.onAdd}
        onRemove={props.onRemove}
        isRemoval={props.isRemoval}
      />
    </li>)
  })

  return (
    <div className={styles.trackList}>
      <ul>
        {trackElements}
      </ul>
    </div>
  )
}

export default TrackList;
