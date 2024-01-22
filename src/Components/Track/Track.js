import React from "react";
import styles from './Track.module.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isRemoval: true };
  }

  renderAction() {
    return this.state.isRemoval ? "-" : "+";
  }

  render() {
    return (
      <div className={styles.Track}>
        <div className={styles.TrackInformation}>
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <button className={styles.TrackAction}>
          {this.renderAction()}
        </button>
      </div>
    )
  }
}

export default Track;
