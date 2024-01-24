import React from 'react';
import styles from './Playlist.module.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const newName = event.target.value;
    this.props.onNameChange(newName);
  }

  render() {
    return (
      <div className={styles.Playlist}>
        <input defaultValue="New Playlist" onChange={this.handleNameChange}/>
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button className={styles.PlaylistSave} onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    )
  }
}

export default Playlist;
