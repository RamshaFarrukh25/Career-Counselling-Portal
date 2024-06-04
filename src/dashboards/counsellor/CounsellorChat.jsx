import SBProvider from '@sendbird/uikit-react/SendbirdProvider';
import '@sendbird/uikit-react/dist/index.css'
import CustomizedApp from './CustomizedApp'
import { useSelector } from 'react-redux';
const myColorSet = {
  '--sendbird-light-primary-100' :'#dbd1ff',
  '--sendbird-light-primary-200' : '#c2a9fa',
  '--sendbird-dark-primary-100'  : ' #dbd1ff'
};

function CounsellorChat() {
  const {user_id} = useSelector((store)=>store.authentication)
 
  return (
    
    <SBProvider appId="70C4C4CC-A6BE-45C2-9263-21D45ECAFFE0" userId={`${user_id}`} colorSet={myColorSet}>
      <div className="chat-container" style={{ height: "100vh", width: "150vh" }}>
      <CustomizedApp />
      </div>
    </SBProvider>
  )
}

export default CounsellorChat;
