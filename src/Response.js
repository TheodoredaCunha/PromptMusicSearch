import React from 'react';
import Player from './Player.js';

const Response = ({ messages }) => {

    if (!messages || typeof messages !== 'object') {
      return <div>No valid message data</div>;
    }
  
    return (
      <div className="mb-4 p-2 bg-white rounded-lg shadow">
        {Object.entries(messages).map(([key, value]) => (
          <div key={key} className="mb-2">
            {
              Array.isArray(value)
                ? value.map((item, index) => (
                    <Player key={index} filepath={item} />
                  ))
                : typeof value === 'object'
                  ? JSON.stringify(value)
                  : value
            }
          </div>
        ))}
      </div>
    );
  };
  
  export default Response;