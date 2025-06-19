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
    const savedName = localStorage.getItem("playlist_name");
    const savedTracks = localStorage.getItem("playlist_tracks");

    if (savedName && savedTracks) {
      setPlaylistName(savedName);

      try {
        const parsedTracks = JSON.parse(savedTracks);
        setPlaylistTracks(parsedTracks);
      } catch (e) {
          console.error("Erreur de parsing des tracks sauvegardés :", e);
      }
    }

      // 2. Si on a un token dans l'URL, lance la sauvegarde automatiquement
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    if (accessTokenMatch) {
      // Le token vient d'arriver : appelle savePlaylist avec la playlist stockée
      const saveStoredPlaylist = async () => {
        if (!savedName || !savedTracks) return;
        try {
          const parsedTracks = JSON.parse(savedTracks);
          const trackUris = parsedTracks.map(track => track.uri);
          await Spotify.savePlaylist(savedName, trackUris);
          localStorage.removeItem("playlist_name");
          localStorage.removeItem("playlist_tracks");
          setPlaylistName('');
          setPlaylistTracks([]);
          // Nettoie l'URL pour enlever le token
          window.history.replaceState(null, null, '/');
        } catch (e) {
          console.error("Erreur lors de la sauvegarde automatique :", e);
        }
      }
      saveStoredPlaylist();
    }

  }, [])


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
