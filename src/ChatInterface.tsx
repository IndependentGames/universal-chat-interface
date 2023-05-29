import React, { useState, useEffect } from 'react';
import ChatMessage from './ProjectFiles/ChatMessage';
import ChatInput from './ProjectFiles/ChatInput';
import defaultUserIcon from './Icons/Profile/DefaultProfile_User.png';
import defaultBotIcon from './Icons/Profile/DefaultProfile_Bot.png';
import axios from 'axios';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [userIcon, setUserIcon] = useState<string>(defaultUserIcon);
  const [botIcon, setBotIcon] = useState<string>(defaultBotIcon);

  useEffect(() => {
    setUserIcon(defaultUserIcon);
    setBotIcon(defaultBotIcon);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const handleSend = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: input },
    ]);
    setInput('');
    setIsTyping(true);
  
    try {
      const response = await axios.post('http://192.168.1.81:3000/api/send-message', {
        messages: [
          { role: 'user', content: input },
        ],
      });
  
      // Extract the generated chat message from the API response
      const generatedMessage = response.data.response;
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: generatedMessage },
      ]);
    } catch (error) {
      console.error('Error:', error);
      console.log('Response:', (error as any).response);
      console.log('Error Data:', (error as any).response?.data);
      console.log('Error Status:', (error as any).response?.status);
      console.log('Error Status Text:', (error as any).response?.statusText);
      // Handle any error cases here
      // You can display an error message or handle the error as needed
    }
  
    setIsTyping(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>, sender: string): void => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 100;
        const MAX_HEIGHT = 100;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          if (sender === 'user') {
            setUserIcon(canvas.toDataURL());
          } else if (sender === 'bot') {
            setBotIcon(canvas.toDataURL());
          }
        }
      };

      if (event.target && event.target.result) {
        img.src = event.target.result.toString();
      }
    };

    if (event.target.files) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            handleIconUpload={handleIconUpload}
            userIcon={userIcon}
            botIcon={botIcon}
          />
        ))}
        {isTyping && <p><strong>Chatbot:</strong> typing...</p>}
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ChatInterface;