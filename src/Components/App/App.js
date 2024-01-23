import React from 'react';
import styles from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: "id",
          name: "name",
          artist: "artist",
          album: "album"
        }
      ],
      playlistName: "playlistName",
      playlistTracks: [
        {
          id: "id",
          name: "name",
          artist: "artist",
          album: "album"
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    const isTrackInPlaylist = this.state.playlistTracks.find(
      playlistTrack => playlistTrack.id === track.id);

    if (isTrackInPlaylist) {
      return;
    } else {
      const newPlaylistTracks = [...this.state.playlistTracks, track];
      this.setState({ playlistTracks: newPlaylistTracks });
    }
  }

  render() {
    return (
  <div>
    <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
    <div className={styles.App}>
      <SearchBar />
      <div className={styles.AppPlaylist}>
      <SearchResults
        searchResults={this.state.searchResults}
        onAdd={this.addTrack}
      />
      <Playlist
        playlistName={this.state.playlistName}
        playlistTracks={this.state.playlistTracks}
      />
      </div>
    </div>
  </div>
    );
  }
}

export default App;
