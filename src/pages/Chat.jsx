import { useSelector } from "react-redux";
import React from 'react';
import SBProvider from '@sendbird/uikit-react/SendbirdProvider';
import 'sendbird-uikit/dist/index.css';
import { useLocation } from 'react-router-dom'; // Import useNavigate

import CustomizedApp from './CustomeChat'; // Assuming a correct file name

export default function Chat() {
  const user_id = localStorage.getItem('user_id');
  const isLogin = localStorage.getItem('isLogin') === 'true';

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const channel_url = params.get('channelUrl');
  return (
    <div className="chat-container" style={{ height: "100vh", width: "250vh" }}>
      <SBProvider appId='6B4D6846-3537-4014-ABF9-056DF077E4F1' userId= {user_id}>
        <CustomizedApp channel_url={channel_url} />
      </SBProvider>
    </div>
  );
};
