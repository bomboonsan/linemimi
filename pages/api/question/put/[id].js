import axios from 'axios';

export default async function handler(req, res) {
    try {
      
      if (req.method === 'PUT') {
        try {
          // Get the data you want to send to the external API from the request body
          const { id } = req.query; // Extract the dynamic parameter from the request query
          const dataToSend = req.body;
    
          // Make the POST request to the external API
          const response = await axios.put(`http://192.168.1.99:5000/api/question/id/${id}`, dataToSend);
    
          // Return the response from the external API to the client
          res.status(response.status).json(response.data);
        } catch (error) {
          // If there's an error with the external API request, handle it here
          console.error('Error making external API request:', error);
          res.status(error.response?.status || 500).json({ error: 'Something went wrong' });
        }
      } else {
        // Return an error for any other HTTP method
        res.status(405).json({ error: 'Method not allowed' });
      }
  
      // Extract the data from the response
      const data = response.data;
  
      // Return the data as the API response
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching external API:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}