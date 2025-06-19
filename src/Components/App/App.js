import React, { useState, useEffect, useRef } from 'react';
import styles from './App.module.css';

import Header from '../Header/Header';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';
import { searchTracks } from '../../util/searchTracks';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [playlistTracks, setPlaylistTracks] = useState([]);

  const playlistRef = useRef(null);

  useEffect(() => {
  // Appel direct au démarrage de l'app pour stocker le token depuis l'URL
  Spotify.getAccessToken();
  }, []);

  const handleSearch = async (term) => {
    setLoading(true);

    try {
      const results = await searchTracks(term);
      setSearchResults(results);
      setTimeout(() => {
        playlistRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 1);
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

      <div className={styles.mainContainer} ref={playlistRef}>
        {loading && <p>Loading...</p> }
        <div className={styles.appSections}>
        {searchResults.length > 0 && (
          <>
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
          </>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
