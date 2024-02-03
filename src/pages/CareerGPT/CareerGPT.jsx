import config from './config.jsx'
import MessageParser from './MessageParser.jsx'
import ActionProvider from './ActionProvider.jsx'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import './styles/CareerGPT.css'
import React from 'react'
import {storeHistory} from "../../features/careerGPT/careerGPTSlice.jsx"
import { useDispatch } from 'react-redux'

const CareerGPT = () => {
  const dispatch = useDispatch()
  
  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages))
    dispatch(storeHistory(JSON.stringify(messages)))
    console.log("save messages", messages)
  }

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'))
    console.log("load messages", messages)
    return messages
  }

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