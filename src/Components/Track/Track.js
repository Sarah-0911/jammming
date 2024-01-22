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
          <h3>track name will go here</h3>
          <p>track artist will go here | track album will go here</p>
        </div>
        <button className={styles.TrackAction}>
          {this.renderAction()}
        </button>
      </div>
    )
  }
}

export default Track;
