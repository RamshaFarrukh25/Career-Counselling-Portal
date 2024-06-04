import React, { useState, } from 'react'
import {useDispatch,useSelector } from 'react-redux';
import Pusher from "pusher-js"
import SBConversation from '@sendbird/uikit-react/Channel'
import SBChannelList from '@sendbird/uikit-react/ChannelList'
import SBChannelSettings from '@sendbird/uikit-react/ChannelSettings'
import {setNotificationData} from "../../features/dashboards/counsellor/counsellorSlice"

export default function CustomizedApp() {
  const {user_id} = useSelector((store)=>store.authentication)
  const {notificationData} = useSelector((store) => store.counsellor)
  const dispatch= useDispatch()
  
  const [showSettings, setShowSettings] = useState(false)
  const [currentChannelUrl, setCurrentChannelUrl] = useState('')
  const pusher = new Pusher('66a0704e45889e2fdd5a', {
    cluster: 'ap1'
  });
 
    const channel = pusher.subscribe('Career_Counselling_portal-development');
          
    channel.bind('demo', function(data) {
        // console.log("bind", data.message)
        const filteredMessages = data.message.filter((e) => user_id == e.receiver_id);
        // console.log("Filer", filteredMessages)

        // Sort notifications based on the timestamp in descending order
        const sortedNotifications = filteredMessages.sort((a, b) => new Date(b.last_message_created_at) - new Date(a.last_message_created_at));

        if (sortedNotifications.length > 0) {
            // Update notification count
            dispatch(setNotificationData({ data: sortedNotifications }));
        } else {
            dispatch(setNotificationData({ data: [] }));
        }
    });
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
                          //console.log("copy data", updatedNotificationData)
                            updatedNotificationData[0] = {
                                ...updatedNotificationData[0], // Copying the object
                                total_unread_message_count: data.unread_count // Updating the value
                            };
                            //console.log("Updated Notification in custmozed", updatedNotificationData);
                            dispatch(setNotificationData({ data: updatedNotificationData }));
                            //console.log('Unread channel count:', data.unread_count);
                           
                            //console.log('Unread channel count in customized chat:', data.unread_count);
                        })
                        
                
                .catch(error => {
                    console.error('Error fetching unread channel count:', error);
                });
  }

  return (
    <div className="customized-app" style={{ height: '80vh', width: '80vw' }}>
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