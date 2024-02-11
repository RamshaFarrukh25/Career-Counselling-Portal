import config from './config.jsx'
import MessageParser from './MessageParser.jsx'
import ActionProvider from './ActionProvider.jsx'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import './styles/CareerGPT.css'
import React from 'react'

const CareerGPT = () => {
  const saveMessages = (messages, HTMLString) => {
    console.log("Original Save Messages", messages)
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    console.log("load messages", messages)
    return messages;
  };

  return (
    <>
      <div className="careerGPTContainer">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          messageHistory={loadMessages()}
          saveMessages={saveMessages}
          actionProvider={ActionProvider}
        />
      </div>
    </>
  );
};

export default CareerGPT;