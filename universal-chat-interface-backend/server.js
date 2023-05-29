require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Choose a suitable port number

app.use(cors());
app.use(express.json());

app.post('/api/send-message', async (req, res) => {
  const { message } = req.body;
  console.log('Received request:', message);
  try {
    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
      {
        messages: [{ role: 'system', content: 'You are a user' }, { role: 'user', content: message }],
      },
      {
        headers: {
          // eslint-disable-next-line no-template-curly-in-string
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract the generated chat message from the API response
    const generatedMessage = response.data.choices[0].message.content;

    // Send the generated chat message back to the frontend
    res.json({ response: generatedMessage });
  } catch (error) {
    console.error('Error:', error);
    // Handle any error cases here
    // You can return an error message or handle the error as needed
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});