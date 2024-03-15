import config from './config.jsx'
import MessageParser from './MessageParser.jsx'
import ActionProvider from './ActionProvider.jsx'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import './styles/CareerGPT.css'
import React from 'react'
import axios from 'axios'

const CareerGPT = () => {

  const saveMessages = async (messages, HTMLString) => {
    //console.log("Original Save Messages", messages)
    try {
      const response = await axios.post('http://127.0.0.1:8000/saveHistory', JSON.stringify(messages))
    } catch (error) {
      console.log("Error in Saving History")
    }
  }

  
  return (
    <>
      <div className="careerGPTContainer">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          saveMessages={saveMessages}
          actionProvider={ActionProvider}
        />
      </div>
    </>
  );
};

export default CareerGPT;