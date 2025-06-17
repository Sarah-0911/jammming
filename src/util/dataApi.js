import axios from "axios";
import Spotify from "./Spotify";

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    Authorization: `Bearer ${Spotify.getAccessToken()}`
  }
})

const dataApi = {
  fetchQuery: async (query) => {
    const response = await apiClient.get(`search?type=track&q=${query}`)
    return response.data;
  }
}

export default dataApi;
