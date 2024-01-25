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
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    return trackURIs;
  }

  search(term) {
    console.log(term);
  }

  render() {
    return (
  <div>
    <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
    <div className={styles.App}>
      <SearchBar onSearch={this.search} />
      <div className={styles.AppPlaylist}>
      <SearchResults
        searchResults={this.state.searchResults}
        onAdd={this.addTrack}
      />
      <Playlist
        playlistName={this.state.playlistName}
        playlistTracks={this.state.playlistTracks}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}
        onSave={this.savePlaylist}
      />
      </div>
    </div>
  </div>
    );
  }
}

export default App;
