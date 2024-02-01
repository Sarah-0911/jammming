import React, { useState } from 'react';
import styles from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState('My Playlist');
    const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    const tracksInPlaylist = playlistTracks.find(
      playlistTrack => playlistTrack.id === track.id);

    if (tracksInPlaylist) {
      return;
    }
    const updatedPlaylist = [...playlistTracks, track];
    setPlaylistTracks(updatedPlaylist);
  };

  const removeTrack = (track) => {
    const updatedPlaylist = playlistTracks.filter(
      currentTrack => currentTrack.id !== track.id);
    setPlaylistTracks(updatedPlaylist);
  };

  const updatePlaylistName =(name) => {
    setPlaylistName(name)
  };

  const savePlaylist = async () => {
    const trackUris = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackUris);
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  };

  const search = async (term) => {
    const results = await Spotify.search(term);
    console.log(results);
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
      <div className={styles.App}>
        <SearchBar onSearch={search} />
        <div className={styles.AppPlaylist}>
        <SearchResults
          searchResults={searchResults}
          onAdd={addTrack}
        />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
        </div>
      </div>
    </div>
  );
}

export default App;
