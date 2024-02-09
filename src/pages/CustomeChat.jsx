import React, { useEffect, useState } from 'react';
import SBConversation from '@sendbird/uikit-react/Channel';
import SBChannelList from '@sendbird/uikit-react/ChannelList';
import SBChannelSettings from '@sendbird/uikit-react/ChannelSettings';

export default function CustomizedApp(props) {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');

  useEffect(() => {
    // Update currentChannelUrl when props.channelUrl changes
    if (currentChannelUrl !== props.channel_url) {
      setCurrentChannelUrl(props.channel_url);
    }
  }, [props.channel_url, currentChannelUrl]);
  
  const handleChannelSelect = (channelUrl) => {
    event.preventDefault();
    // Check if the channelUrl is different before updating
    if (currentChannelUrl !== channelUrl) {
      window.location.href = `/chat?channelUrl=${channelUrl}`;
      setCurrentChannelUrl(channelUrl);
    }
  };
  

  const handleChatHeaderActionClick = () => {
    setShowSettings(true);
  };

  const handleSettingsCloseClick = () => {
    setShowSettings(false);
  };

  return (
    <div className="customized-app" style={{ height: '100vh', width: '100vw' }}>
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList 
          onSearchClick={true}
          onChannelSelect={(channel) => {
            
            if (channel && channel.url) {
              handleChannelSelect(channel.url)
            }
          }} 
          activeChannelUrl={currentChannelUrl}
          renderHeader={() => { return <><h2>Messages</h2> <hr/></>}}
        
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={handleChatHeaderActionClick}
          />
        </div>
      </div>
      {showSettings && (
        <div className="sendbird-app__settingspanel-wrap">
          <SBChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={handleSettingsCloseClick}
          />
        </div>
      )}
    </div>
  );
}
