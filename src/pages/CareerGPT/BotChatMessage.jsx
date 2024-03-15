import React from 'react'

const parseMessage = (message) => {
    const formattedMessage = message
      .replace(/\r?\n/g, '<br>')  // Replace line breaks with `<br>`
      .replace(/^\s*-\s+/gm, '<li>'); // Replace bullet points with `<li>` (multiline)
    return formattedMessage;
};

const BotChatMessage = ({message}) => {
    const formattedMessage = parseMessage(message);

    let customClassName = ""
    if(formattedMessage === "Loading..."){
        customClassName = "loading-message"
    } else if(formattedMessage === "Error in Generating Response"){
        customClassName = "error-message"
    } else {
        customClassName = "custom-bot-message"
    }

    return (
        <div className={customClassName}>
            <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />  
        </div>
    )
};

export default BotChatMessage;