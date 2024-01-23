import React from 'react';
import styles from './TrackList.module.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    const tracks = this.props.tracks || [];

    const trackElements = tracks.map(track => {
      return (
      <li key={track.id}>
        <Track track={track} onAdd={this.props.onAdd}/>
      </li>)
    })

    return (
      <div className={styles.TrackList}>
        <ul>
          {trackElements}
        </ul>
      </div>
    )
  }
}

export default TrackList;
