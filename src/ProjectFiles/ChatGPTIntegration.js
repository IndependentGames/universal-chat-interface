// Import necessary dependencies
import axios from 'axios';

// Define the ChatGPT API endpoint and API key
const apiEndpoint = 'http://localhost:3000/api/send-message';
const apiKey = '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';

// Function to send user input to the ChatGPT API
export async function sendMessageToAPI(message) {
  try {
    const response = await axios.post(apiEndpoint, {
      message: message,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract the generated chat message from the API response
    const generatedMessage = response.data.choices[0].message.content;

    // Return the generated chat message
    return generatedMessage;
  } catch (error) {
    console.error('Error:', error);
    // Handle any error cases here
    // You can return an error message or handle the error as needed
  }
}
