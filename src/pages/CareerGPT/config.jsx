import { createChatBotMessage } from 'react-chatbot-kit'
import CareerGPTAvatar from './CareerGPTAvatar'
import UserAvatar from './UserAvatar'

const config = {
  botName: 'CareerGPT',
  initialMessages: [createChatBotMessage(`Hello World`)],
  state: {
    userQuery: "",
    response: "",
    history: []
  },
  customComponents: {
    botAvatar: (props) => <CareerGPTAvatar {...props} />,
    userAvatar: (props) => <UserAvatar {...props} />,
  }
};

export default config;