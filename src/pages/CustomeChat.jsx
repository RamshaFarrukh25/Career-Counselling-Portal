import React, { useEffect, useState } from 'react';
import SBConversation from '@sendbird/uikit-react/Channel';
import SBChannelList from '@sendbird/uikit-react/ChannelList';
import SBChannelSettings from '@sendbird/uikit-react/ChannelSettings';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector } from 'react-redux';
import { setNotificationData } from "../features/header/headerSlice"

export default function CustomizedApp(props) {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');
  const {user_id} = useSelector((store)=>store.authentication)
  const {notificationData} = useSelector((store) => store.header)
  const navigate = useNavigate();
  const dispatch= useDispatch()

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
      navigate(`/chat?channelUrl=${channelUrl}`);
      setCurrentChannelUrl(channelUrl);
    }
  };
  

  const handleChatHeaderActionClick = () => {
    setShowSettings(true);
  };

  const handleSettingsCloseClick = () => {
    setShowSettings(false);
  };
  if(currentChannelUrl)
  {
    const applicationId = '70C4C4CC-A6BE-45C2-9263-21D45ECAFFE0';
        
        const apiToken = 'a3b8b5d1ea55c1e6c7b174b5a4e3d09435344791';

        const url = `https://api-${applicationId}.sendbird.com/v3/users/${user_id}/unread_channel_count`;

                        fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Api-Token': apiToken
                        }
                        })
                        .then(response => response.json())
                        .then(data => {
                          const updatedNotificationData = [...notificationData]; // Copying the array
                          console.log("copy data", updatedNotificationData)
                            updatedNotificationData[0] = {
                                ...updatedNotificationData[0], // Copying the object
                                total_unread_message_count: data.unread_count // Updating the value
                            };
                            console.log("Updated Notification in user side", updatedNotificationData);
                            dispatch(setNotificationData({ data: updatedNotificationData }));
                            //console.log('Unread channel count:', data.unread_count);
                           
                            //console.log('Unread channel count in customized chat:', data.unread_count);
                        })
                        
                
                .catch(error => {
                    console.error('Error fetching unread channel count:', error);
                });
  }

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
          renderHeader={() => { return <><h3 style={{margin : "15px"}}><i>Messages</i></h3> <hr/></>}}
        
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