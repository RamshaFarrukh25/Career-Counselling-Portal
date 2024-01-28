import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const getHistory = () => {
    const history = children.props.children.props.state.history
    return history
  }

  const generateResponse = (response) => {
    const botMessage = createChatBotMessage(response)

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }
  
  

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            getHistory,
            generateResponse,
            setState
          }
        });
      })}
    </div>
  );
};

export default ActionProvider