import axios from 'axios';

export default async function handler(req, res) {
    try {
        
      // Make a request to the external API using the dynamic parameter
      const response = await axios.get(`https://ktambackend.bomboonsan.com/api/question/`);
  
      // Extract the data from the response
      const data = response.data;
  
      // Return the data as the API response
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching external API:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}