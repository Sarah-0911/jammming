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
          name: "playlistName",
          artist: "playlistArtist",
          album: "playlistAlbum"
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    const tracksInPlaylist = this.state.playlistTracks.find(
      playlistTrack => playlistTrack.id === track.id);

    if (tracksInPlaylist) {
      return;
    }
    tracksInPlaylist.push(track);
    this.setState({ playlistTracks: tracksInPlaylist });
  }

  removeTrack(track) {
    const updatedPlaylist = this.state.playlistTracks.filter(
      currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: updatedPlaylist });
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
        onRemove={this.removeTrack}
      />
      </div>
    </div>
  </div>
    );
  }
}

export default App;
