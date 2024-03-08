import React from 'react'
import axios from 'axios'

const MessageParser = ({ children, actions }) => {
  const parse = async (message) => {

    const responseHistory = actions.getHistory()

    const jsonData = {
      user_query: message,
      history: responseHistory
    }

    try {
      const resp = await axios({
        method: 'post',
        url: 'https://cors-anywhere.herokuapp.com/https://c5fe-34-147-18-105.ngrok-free.app/query',
        data: JSON.stringify(jsonData),
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log("Chatbot: ", resp.data.response)

      
      actions.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, resp.data.response],
        response: resp.data.response,
        userQuery: message,
        history: [...prev.history, [message, resp.data.response]]
      }))

      actions.generateResponse(resp.data.response)

    } catch (error) {
      console.log("Something went wrong")
    }
  }  

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        })
      })}
    </div>
  )
}

export default MessageParser;