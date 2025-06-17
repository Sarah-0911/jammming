import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

import Header from '../Header/Header';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [tokenReady, setTokenReady] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState('My Playlist');
    const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await Spotify.getAccessToken();
        if (token){
          setTokenReady(true);
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, []);

  const handleSearch = async (term) => {
    if (!tokenReady) {
      return;
    }

    setLoading(true);

    try {
      const results = await Spotify.search(term);
      // console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div>
      <Header onSearch={handleSearch} />

      <div className={styles.AppPlaylist}>
        {loading && <p>Chargement...</p> }
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
  );
}

export default App;
