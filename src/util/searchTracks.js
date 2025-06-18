// Cette fonction appelle ma serverless Netlify pour obtenir un token client credentials

let cachedToken = null;
let tokenExpiry = 0;

async function getClientToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await fetch('/.netlify/functions/getSpotifyToken');
  if (!response.ok) throw new Error('Impossible de récupérer le token client');
  const data = await response.json();

  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
  return cachedToken;
}

export async function searchTracks(term) {
  if (!term) return [];

  const accessToken = await getClientToken();

  const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}&limit=20`;

    const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const response = await fetch(searchUrl, options);
  if (!response.ok) throw new Error(`Erreur lors de la recherche : ${response.statusText}`);

  const jsonResponse = await response.json();

  if (!jsonResponse.tracks) return [];

  // Formatage simple des résultats
  return jsonResponse.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.uri,
    thumbnail: track.album.images[2]?.url || ''
  }));
}
