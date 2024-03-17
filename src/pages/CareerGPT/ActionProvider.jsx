import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const getHistory = () => {
    const messageHistory = children.props.children.props.state.messages
    //console.log("Messages Array", messageHistory)
    let history = []
    if(messageHistory.length > 1){
      for(let i = 1; i < messageHistory.length - 1; i = i + 2){
        history.push([messageHistory[i].message, messageHistory[i+1].message])
      }
    }
    //console.log("History", history)
    return history
  }

  const loadingMessage = () => {
    const botMessage = createChatBotMessage("Loading...")
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const generateResponse = (response) => {
    const botMessage = createChatBotMessage(response)
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages.slice(0, -1), botMessage],
    }))
  }
  
  const errorMessage = () => {
    const botMessage = createChatBotMessage("Error in Generating Response")
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages.slice(0, -1), botMessage],
    }))
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            getHistory,
            generateResponse,
            loadingMessage,
            errorMessage,
            setState
          }
        });
      })}
    </div>
  );
};

export default ActionProvider