import axios from 'axios';

export default axios.create({
  baseURL: `https://client.elevenscore.com/`,
  headers: {
    'X-Api-Key' : 'e5642ed2-7938-49f6-9cd0-049c117b0204'
  }
});