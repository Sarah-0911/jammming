import fetch from 'node-fetch'; // ✅ obligatoire pour Node

export async function handler() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // Encodage en base64 du couple id:secret pour l'auth HTTP Basic
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // Appel à l'API Spotify pour récupérer un token client credentials
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

  const data = await response.json();

  // On renvoie le token côté client via l'API Netlify
  return {
    statusCode: 200,
    body: JSON.stringify(data), // { access_token: "...", expires_in: 3600, token_type: "Bearer" }
  };
}
