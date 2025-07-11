import React from "react";
import styles from './Track.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const Track = props => {


  const handleAddTrack = () => {
    props.onAdd(props.track);
  }

  const handleRemoveTrack = () => {
    props.onRemove(props.track);
  }

  const renderAction = () => {
    if(props.isRemoval) {
      return (
        <button
          className={styles.trackAction}
          onClick={handleRemoveTrack}>
          <FontAwesomeIcon icon={faCircleMinus} />
        </button>
      )
    } else {
      return (
        <button
          className={styles.trackAction}
          onClick={handleAddTrack}>
          <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      )
    }
  }

  return (
    <div className={styles.track}>
        <div className={styles.trackInfos}>
          <img src={props.track.thumbnail} alt="album thumbnail" />
          <div>
            <h3>{props.track.name}</h3>
            <p className={styles.artist}>{props.track.artist} | {props.track.album}</p>
          </div>
        </div>
        {renderAction()}
    </div>
  )
}

export default Track;
