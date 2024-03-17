import { createChatBotMessage } from 'react-chatbot-kit'
import CareerGPTAvatar from './CareerGPTAvatar'
import UserAvatar from './UserAvatar'
import CareerGPTHeader from './CareerGPTHeader'
import BotChatMessage from './BotChatMessage'

const config = {
  botName: 'CareerGPT',
  initialMessages: [createChatBotMessage(`🚀 Welcome to CareerGPT! Unlock your academic journey with personalized guidance. Discover the bachelor's degree based on your interests. Let's shape your future together! 🌟`)],
  state: {
    userQuery: "",
    response: ""
  },
  customComponents: {
    header: () => <div style={{ padding: "5px", borderRadius: "3px" }}><CareerGPTHeader /></div>,
    botAvatar: (props) => <CareerGPTAvatar {...props} />,
    userAvatar: (props) => <UserAvatar {...props} />,
    botChatMessage: (props) => <BotChatMessage {...props} />
  }
};

export default config;