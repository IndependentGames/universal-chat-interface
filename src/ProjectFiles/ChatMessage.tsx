import React from 'react';

interface ChatMessageProps {
  message: { role: string; content: string };
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
  const isUser = message.role === 'user';

return (
  <div className={`chat-message ${isUser ? 'user' : ''}`}>
    <div className={`chat-message-content ${isUser ? 'user' : ''}`}>
      <input
        type='file'
        id={message.role + 'IconUpload'}
        onChange={(event) => handleIconUpload(event, message.role)}
        className='input-file-hidden'
      />
      <label className="label-container" htmlFor={message.role + 'IconUpload'}>
        <div className='username'>
          {Array.from(message.role).map((letter, index) => (
            <span className="username-letter" style={{ '--index': index } as React.CSSProperties} key={index}>
              {letter}
            </span>
          ))}
        </div>
        <img
          src={isUser ? userIcon : botIcon}
          alt='Profile'
          className='profile-image'
        />
      </label>
      <div className={`chat-message-bubble ${isUser ? 'user' : ''}`}>
        {message.content}
        <div className={`chat-message-arrow ${isUser ? 'user' : ''}`}></div>
      </div>
    </div>
  </div>
  );
};

export default ChatMessage;