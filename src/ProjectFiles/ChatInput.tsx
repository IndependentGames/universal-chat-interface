import React from 'react';
import paperClipIcon from '../Icons/App/paper-clip.png';
import smileIcon from '../Icons/App/smile.png';
import microphoneIcon from '../Icons/App/microphone.png';

interface ChatInputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, handleInputChange, handleKeyDown }) => {
  return (
    <div className="input-icons">
      <img src={paperClipIcon} alt="paperclip" />
      <input
        className="chat-input"
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message and press Enter..."
      />
      <img src={smileIcon} alt="emoji" />
      <img src={microphoneIcon} alt="microphone" />
    </div>
  );
};

export default ChatInput;