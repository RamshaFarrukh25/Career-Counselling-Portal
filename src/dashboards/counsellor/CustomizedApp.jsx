import React, { useState } from 'react'

import SBConversation from '@sendbird/uikit-react/Channel'
import SBChannelList from '@sendbird/uikit-react/ChannelList'
import SBChannelSettings from '@sendbird/uikit-react/ChannelSettings'

export default function CustomizedApp() {
  // useState
  const [showSettings, setShowSettings] = useState(false)
  const [currentChannelUrl, setCurrentChannelUrl] = useState('')

  return (
    <div className="customized-app" style={{ height: '100vh', width: '85vw' }}>
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url)
              }

            }  }
            renderHeader={() => { return <><h3 style={{margin : "15px"}}><i>Messages</i></h3> <hr/></>}}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true)
            }}
          />
        </div>
      </div>
      {showSettings && (
        <div className="sendbird-app__settingspanel-wrap">
          <SBChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false)
            }}
          />
        </div>
      )}
    </div>
  )
}