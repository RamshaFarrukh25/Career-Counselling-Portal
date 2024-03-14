import { useSelector,useDispatch } from "react-redux";
import React from 'react';
import SBProvider from '@sendbird/uikit-react/SendbirdProvider';
import 'sendbird-uikit/dist/index.css';
import { useLocation } from 'react-router-dom'; // Import useNavigate
import { authenticate } from "../features/authentication/authenticationSlice"
import CustomizedApp from './CustomeChat'; // Assuming a correct file name

export default function Chat() {
  const {user_id} = useSelector((store) => store.authentication)
  console.log("Chat Component", user_id)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const channel_url = params.get('channelUrl');
  const dispatch = useDispatch()

  React.useEffect(() => {
    async function fetchAuthentication() {
        await dispatch(authenticate())
    }
    fetchAuthentication()
  }, [])

  return (
    <div className="chat-container" style={{ height: "80vh", width: "80vw" }}>
      <SBProvider appId='1C58D52A-D0E4-4BB8-93D2-3786F691A2C9' userId= {`${user_id}`}>
        <CustomizedApp channel_url={channel_url} />
      </SBProvider>
    </div>
  );
};
