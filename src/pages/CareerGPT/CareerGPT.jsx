import config from './config.jsx'
import MessageParser from './MessageParser.jsx'
import ActionProvider from './ActionProvider.jsx'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import './styles/CareerGPT.css'
import React from 'react'

const CareerGPT = () => {
  return (
    <>
      <div className="careerGPTContainer">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </>
  );
};

export default CareerGPT;