import config from './config';

const clientId = config.clientId;
const redirectUri = 'https://react-jammming-2a8c29957e39.herokuapp.com/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    //check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      localStorage.setItem("token", accessToken);
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
      window.location = accessUrl;
    }
  },

  async search (term) {
    const accessToken = this.getAccessToken();
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const response = await fetch(searchUrl, options);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    console.log('Search API response:', jsonResponse);
    if (!jsonResponse.tracks) {
      return [];
      }
      return jsonResponse.tracks.items.map(track => track = {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      });
  },

  async savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
      console.error('Invalid name or trackURIs.');
      return;
    }

    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    try {
      const response = await fetch('https://api.spotify.com/v1/me', { headers: headers });

      if (!response.ok) {
        throw new Error('Failed to fetch user information.');
      }

      const jsonResponse = await response.json();
      userId = jsonResponse.id;

      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ name: name })
        });

      if (!createPlaylistResponse.ok) {
        throw new Error('Failed to create playlist.');
      }

      const playlistJsonResponse = await createPlaylistResponse.json();
      const playlistID = playlistJsonResponse.id;

      const createTracksUriResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ uris: trackURIs })
      });

    } catch (error) {
      console.error('Error during playlist creation:', error.message);
    }
  }
}

export default Spotify;
