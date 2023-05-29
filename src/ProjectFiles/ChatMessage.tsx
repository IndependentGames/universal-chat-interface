import React from 'react';

interface ChatMessageProps {
  message: { text: string; sender: string };
  handleIconUpload: (event: any, sender: any) => void;
  userIcon: string;
  botIcon: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  handleIconUpload,
  userIcon,
  botIcon,
}) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`chat-message ${isUser ? 'user' : ''}`}>
      <div className={`chat-message-content ${isUser ? 'user' : ''}`}>
        <input
          type='file'
          style={{ display: 'none' }}
          id={message.sender + 'IconUpload'}
          onChange={(event) => handleIconUpload(event, message.sender)}
        />
        <label htmlFor={message.sender + 'IconUpload'}>
          <img
            src={isUser ? userIcon : botIcon}
            alt='Profile'
            className='profile-image'
          />
        </label>
        <div className={`chat-message-bubble ${isUser ? 'user' : ''}`}>
          <strong>{message.sender}:</strong> {message.text}
          <div className={`chat-message-arrow ${isUser ? 'user' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;