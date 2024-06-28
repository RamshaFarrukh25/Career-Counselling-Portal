import React from 'react'
import axios from 'axios'

const MessageParser = ({ children, actions }) => {

  const loadHistory = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/getHistory')
      const fetchedMessages = response.data.history.map(msg => {
        if (msg.type === "bot") {
            return {
                delay: undefined,
                id: msg.msgId,
                message: msg.message,
                loading: false,
                type: "bot"
            }
        } else {
            return {
                id: msg.msgId,
                message: msg.message,
                type: "user"
            }
        }
      }) 

      if(fetchedMessages.length >= 1){
        //console.log("Messages Fetched", fetchedMessages)
        actions.setState((prev) => ({
          ...prev,
          messages: fetchedMessages
        }))
      }
      
      return fetchedMessages
    } catch(error){
      console.log("Error in getting history")
    } 
  }

  React.useEffect(() => {
    loadHistory()
  }, [])


  const parse = async (message) => {
    const responseHistory = actions.getHistory()

    const jsonData = {
      user_query: message,
      history: responseHistory
    }

    try {
      actions.loadingMessage()
      
      const resp = await axios({
        method: 'post',
        url: 'https://cors-anywhere.herokuapp.com/https://c1e9-104-196-251-156.ngrok-free.app/query',
        data: JSON.stringify(jsonData),
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log("Chatbot: ", resp.data.response)

      actions.setState((prev) => ({
        ...prev,
        response: resp.data.response,
        userQuery: message,
      }))

      actions.generateResponse(resp.data.response)
    } catch (error) {
      console.log("Something went wrong")
      actions.errorMessage()
    }
  }  


  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {}
        })
      })}
    </div>
  )
}

export default MessageParser;