import React from "react";
import styles from './Track.module.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isRemoval: true };
    this.addTrack = this.addTrack.bind(this);
  }

  renderAction() {
    return this.state.isRemoval ? "-" : "+";
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  render() {
    return (
      <div className={styles.Track}>
        <div className={styles.TrackInformation}>
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <button
          className={styles.TrackAction} onClick={this.addTrack}>
          {this.renderAction()}
        </button>
      </div>
    )
  }
}

export default Track;
