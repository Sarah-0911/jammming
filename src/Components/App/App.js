import React from 'react';
import styles from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My playlist",
      playlistTracks: []
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
    const updatedPlaylist = [...this.state.playlistTracks, track];
    this.setState({ playlistTracks: updatedPlaylist });
  }

  removeTrack(track) {
    const updatedPlaylist = this.state.playlistTracks.filter(
      currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: updatedPlaylist });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  async savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }


  async search(term) {
    const searchResults = await Spotify.search(term);
    console.log(searchResults);
    this.setState({ searchResults: searchResults });
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
