import React, { useState, useEffect } from 'react';
import ChatMessage from './ProjectFiles/ChatMessage';
import ChatInput from './ProjectFiles/ChatInput';
import defaultUserIcon from './Icons/Profile/DefaultProfile_User.png';
import defaultBotIcon from './Icons/Profile/DefaultProfile_Bot.png';

interface ChatState {
  messages: Array<{ text: string; sender: string }>;
  input: string;
  isTyping: boolean;
  userIcon: string;
  botIcon: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [userIcon, setUserIcon] = useState<string>('./Icons/Profile/DefaultProfile_User.png');
  const [botIcon, setBotIcon] = useState<string>('./Icons/Profile/DefaultProfile_Bot.png');

  useEffect(() => {
    setUserIcon(defaultUserIcon);
    setBotIcon(defaultBotIcon);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const handleSend = (): void => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Hello, I am your Chatbot.', sender: 'bot' },
      ]);
      setIsTyping(false);
    }, 1000);
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