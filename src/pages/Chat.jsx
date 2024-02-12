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
      <SBProvider appId='6B4D6846-3537-4014-ABF9-056DF077E4F1' userId= {`${user_id}`}>
        <CustomizedApp channel_url={channel_url} />
      </SBProvider>
    </div>
  );
};
