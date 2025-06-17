import config from './config';

const clientId = config.clientId;
const redirectUri = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/'
  : 'https://react-jammming-2a8c29957e39.herokuapp.com/';

let accessToken;

const Spotify = {
  getAccessToken() {
    return new Promise((resolve, reject) => {
      if (accessToken) {
        resolve(accessToken);
        return;
      }

      // Cherche le token dans l'URL
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);

        const expiryAt = Date.now() + expiresIn * 1000;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("tokenExpiry", expiryAt.toString());

        window.setTimeout(() => {
          accessToken = '';
          localStorage.removeItem("token");
        }, expiresIn * 1000);

        window.history.replaceState(null, null, '/'); // Nettoie l'URL
        resolve(accessToken);
        return;
      }

      // Sinon, regarde dans localStorage
      const storedToken = localStorage.getItem("token");
      const expiryTime = localStorage.getItem("tokenExpiry");

      if (storedToken && expiryTime && Date.now() < Number(expiryTime)) {
        accessToken = storedToken;
        resolve(accessToken);
        return;
      }

      // Pas de token : redirige vers Spotify
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
      // On ne résout jamais la promesse ici car on quitte la page
    });
  },

  async search (term) {
    const accessToken = await this.getAccessToken();

    if (!accessToken) {
      return [];
    }

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
        uri: track.uri,
        thumbnail: track.album.images[2].url,
      });
  },

  async savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
      console.error('Invalid name or trackURIs.');
      return;
    }

    const accessToken = await this.getAccessToken();
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
