import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get the token from the request header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      // Make a request to the external API to check the token
      const response = await axios.post('https://ktambackend.bomboonsan.com/api/check-token', { token });

      // Assuming the external API responds with a status property to indicate token validity
      if (response.data && response.data.status === 'valid') {
        return res.status(200).json({ message: 'Token is valid' });
      } else {
        return res.status(401).json({ error: 'Invalid token' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}