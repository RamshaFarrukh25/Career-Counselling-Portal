import config from './config.jsx'
import MessageParser from './MessageParser.jsx'
import ActionProvider from './ActionProvider.jsx'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import './styles/CareerGPT.css'
import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const CareerGPT = () => {
  const {user_id} = useSelector((store) => store.login)
  console.log("User_ID", user_id)

  // const saveMessages = async (messages, HTMLString) => {
  //   console.log("Original Save Messages", messages)
  //   try{
  //     const response = await axios.post("http://127.0.0.1:8000/storeCareerGPTHistory", 
  //       {'id': user_id, 'messages': messages})
  //     return response.data
  //   }
  //   catch(error){
  //     console.log("Error is saving history")
  //   }
  // }

  // const loadMessages = async () => {
  //   try{
  //     const response = await axios.post("http://127.0.0.1:8000/loadCareerGPTHistory",
  //       {'id': user_id})
  //     const messages =  response.data.history
  //     console.log("Loading history", messages)
  //     console.log("Loading Messages", messages[0])
  //     return messages
  //   } catch(error){
  //     console.log("Error in loading history")
  //   }
  // }


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