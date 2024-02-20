import React, { useContext, useState, createContext, useEffect } from 'react';
import dataApi from './dataApi';

const TracksData = createContext({
  loading: true,
  tracks: [],
  playlistTrack: [],
  onSubmitSearch: () => {},
  addTrack: () => {},
  removeTrack: () => {}
})

const useTracksData = () => {
  return useContext(TracksData);
}

const TracksDataProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playlistTracks, setPlaylistTracks] = useState(tracks.filter((track) => track.isRemoval));

  const onSubmitSearch = async (term) => {
    setLoading(true)
    const results = await dataApi.fetchQuery(term);
    const rawResults = results.tracks.items.map((track) => ({...track, isRemoval: false}))
    setTracks(rawResults);
    setLoading(false)
  };

  const addTrack = (track) => {
    const tracksInPlaylist = playlistTracks.find(
      playlistTrack => playlistTrack.id === track.id);

    if (tracksInPlaylist) {
      return;
    }
    track.isRemoval = true;
    const updatedPlaylist = [...playlistTracks, track];
    setPlaylistTracks(updatedPlaylist);
  };

  const removeTrack = (track) => {
    const updatedPlaylist = playlistTracks.filter(
    currentTrack => currentTrack.id !== track.id);
    track.isRemoval = false;
    setPlaylistTracks(updatedPlaylist);
  };

  return(
    <TracksData.Provider value={{ tracks, loading, playlistTracks, onSubmitSearch, addTrack, removeTrack }}>
      {children}
    </TracksData.Provider>
  )
}

export { useTracksData, TracksDataProvider };
