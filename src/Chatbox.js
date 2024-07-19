import React, { useState } from 'react';

const Chatbox = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 w-full px-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 border border-[#6700D4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#6700D4]"
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-[#383838] text-white rounded-md hover:bg-[#6700D4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
      >
        	&#x21b2;
      </button>
    </form>
  );
};

export default Chatbox;
