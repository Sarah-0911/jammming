import React from "react";
import styles from './Track.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
const Track = props => {
  const addTrack = () => {
    props.onAdd(props.track);
  }

  const removeTrack = () => {
    props.onRemove(props.track);
  }

  const renderAction = () => {
    if(props.isRemoval) {
      return (
        <button
          className={styles.TrackAction}
          onClick={removeTrack}>
          <FontAwesomeIcon icon={faCircleMinus} />
        </button>
      )
    } else {
      return (
        <button
          className={styles.TrackAction}
          onClick={addTrack}>
          <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      )
    }
  }

  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3>{props.track.name}</h3>
        <p className={styles.artist}>{props.track.artist} | {props.track.album}</p>
      </div>
        {renderAction()}
    </div>
  )
}

export default Track;
