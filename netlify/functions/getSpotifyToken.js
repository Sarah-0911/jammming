const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // Encodage en base64 du couple id:secret pour l'auth HTTP Basic
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // Appel à l'API Spotify pour récupérer un token client credentials
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    body: new URLSearchParams({
      grant_type: 'client_credentials', // flow client credentials (pas besoin d'utilisateur)
    }),
  });

    if (!response.ok) {
    throw new Error(`Spotify token request failed: ${response.statusText}`);
  }

  const data = await response.json();

  // On renvoie le token côté client via l'API Netlify
 return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Token error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de la récupération du token' }),
    };
  }
};
