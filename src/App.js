import React, { useState, useEffect } from 'react';
import './App.css';
import Chatbox from './Chatbox.js';
import Response from './Response.js';
import axios from 'axios';

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/load')
      .then(response => {
        setMessages(prevMessages => [...prevMessages, response.data]);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);


  const handleSendMessage = async (message) => {
    try {
        const response = await axios.post('http://localhost:5001/api/process-data', { inputData: message });
        setMessages(prevMessages => [...prevMessages, response.data]);
        
    } catch (error) {
        console.error('There was an error sending data!', error);
    }
  };

  return (

    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          {
            messages.map((message, groupIndex) => (
              <Response key={groupIndex} messages={message} />
            ))

          }
          
        </div>
        <div className="h-[10vh]" /> {/* Spacer */}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[10vh] bg-gray-100">
        <div className="items-center">
          <Chatbox onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
