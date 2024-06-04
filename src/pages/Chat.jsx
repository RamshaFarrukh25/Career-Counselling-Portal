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
      <SBProvider appId='70C4C4CC-A6BE-45C2-9263-21D45ECAFFE0' userId= {`${user_id}`}>
        <CustomizedApp channel_url={channel_url} />
      </SBProvider>
    </div>
  );
};
// // Update Chat.js
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Loader from './Loader/Loader';
// import SBProvider from '@sendbird/uikit-react/SendbirdProvider';
// import 'sendbird-uikit/dist/index.css';
// import { useLocation } from 'react-router-dom';
// import { authenticate } from "../features/authentication/authenticationSlice";
// import CustomizedApp from './CustomeChat';

// const Chat = () => {
//   const { user_id } = useSelector((store) => store.authentication);
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const channel_url = params.get('channelUrl');
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true); // Start loading
//         await dispatch(authenticate()); // Fetch data and perform actions here
//         setLoading(false); // Set loading to false once authentication is done
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false); // Ensure loading is set to false even in case of an error
//       }
//     }

//     fetchData();
//   }, [dispatch]); // Ensure useEffect dependency array includes all dependencies

//   return (
//     <div className="chat-container" style={{ height: "80vh", width: "80vw" }}>
//       {loading ? (
//         <Loader /> // Show loader component while loading
//       ) : (
//         <SBProvider appId='YOUR_SEND_BIRD_APP_ID' userId={`${user_id}`}>
//           <CustomizedApp channel_url={channel_url} />
//         </SBProvider>
//       )}
//     </div>
//   );
// };

// export default Chat;
